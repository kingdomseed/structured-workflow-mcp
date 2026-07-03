#!/bin/bash

# Git Worktree Manager for creating, listing, switching, and cleaning up Git worktrees

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Get repo root
GIT_ROOT=$(git rev-parse --show-toplevel)
WORKTREE_DIR="$GIT_ROOT/worktrees"
SCRIPT_NAME=$(basename "$0")

# Ensure worktrees is in .gitignore
add_to_gitignore() {
  if ! grep -Fxq -e "worktrees" -e "worktrees/" "$GIT_ROOT/.gitignore" 2>/dev/null; then
    echo "worktrees" >> "$GIT_ROOT/.gitignore"
  fi
}

# Copy .env files from main repo to worktree (recursively)
copy_env_files() {
  local wt_path="$1"

  echo -e "${BLUE}Copying .env files...${NC}"

  # Find all .env* files recursively (excluding .env.example which should be in git)
  local env_files=()
  while IFS= read -r -d '' file; do
    local basename=$(basename "$file")
    # Skip .env.example (that's typically committed to git)
    if [[ "$basename" != ".env.example" ]]; then
      # Store relative path from GIT_ROOT
      local rel_path="${file#$GIT_ROOT/}"
      env_files+=("$rel_path")
    fi
  done < <(find "$GIT_ROOT" -name ".env*" -type f -not -path "$WORKTREE_DIR/*" -print0)

  if [[ ${#env_files[@]} -eq 0 ]]; then
    echo -e "  ${YELLOW}ℹ️  No .env files found in main repository${NC}"
    return
  fi

  local copied=0
  for env_file in "${env_files[@]}"; do
    local source="$GIT_ROOT/$env_file"
    local dest="$wt_path/$env_file"
    local dest_dir=$(dirname "$dest")

    # Create destination directory if needed
    if [[ ! -d "$dest_dir" ]]; then
      mkdir -p "$dest_dir"
    fi

    if [[ -f "$dest" ]]; then
      echo -e "  ${YELLOW}⚠️  $env_file already exists, backing up to ${env_file}.backup${NC}"
      cp "$dest" "${dest}.backup"
    fi

    cp "$source" "$dest"
    echo -e "  ${GREEN}✓ Copied $env_file${NC}"
    copied=$((copied + 1))
  done

  echo -e "  ${GREEN}✓ Copied $copied environment file(s)${NC}"
}

# Symlink local agent instruction files only when they are intentionally gitignored
link_gitignored_agent_files() {
  local wt_path="$1"
  local agent_files=("CLAUDE.md" "AGENTS.md")
  local linked=0

  echo -e "${BLUE}Linking gitignored agent files...${NC}"

  for agent_file in "${agent_files[@]}"; do
    local source="$GIT_ROOT/$agent_file"
    local dest="$wt_path/$agent_file"

    if [[ ! -f "$source" ]]; then
      continue
    fi

    if ! git -C "$GIT_ROOT" check-ignore -q -- "$agent_file"; then
      continue
    fi

    if [[ -e "$dest" || -L "$dest" ]]; then
      echo -e "  ${YELLOW}⚠️  $agent_file already exists, backing up to ${agent_file}.backup${NC}"
      mv "$dest" "${dest}.backup"
    fi

    ln -s "$source" "$dest"
    echo -e "  ${GREEN}✓ Linked $agent_file${NC}"
    linked=$((linked + 1))
  done

  if [[ $linked -eq 0 ]]; then
    echo -e "  ${YELLOW}ℹ️  No gitignored agent files found${NC}"
    return
  fi

  echo -e "  ${GREEN}✓ Linked $linked agent file(s)${NC}"
}

# Create a new worktree
create_worktree() {
  local branch_name="$1"
  local current_branch=$(git branch --show-current)
  local from_branch="${2:-$current_branch}"

  if [[ -z "$branch_name" ]]; then
    echo -e "${RED}Branch name required${NC}"
    exit 1
  fi

  local wt_path="$WORKTREE_DIR/$branch_name"

  # Check if worktree already exists
  if [[ -d "$wt_path" ]]; then
    echo -e "${YELLOW}Worktree already exists at: $wt_path${NC}"
    echo -e "Switch to it instead? (y/n)"
    read -r response
    if [[ "$response" == "y" ]]; then
      switch_worktree "$branch_name"
    fi
    return
  fi

  echo -e "${BLUE}Creating worktree: $branch_name${NC}"
  echo "  From: $from_branch"
  echo "  Path: $wt_path"
  echo ""
  echo "Continue? [y/N]"
  read -r response

  if [[ "$response" != "y" ]]; then
    echo -e "${YELLOW}Aborted${NC}"
    return
  fi

  # Update from branch
  echo -e "${BLUE}Updating $from_branch...${NC}"
  git checkout "$from_branch"
  git pull origin "$from_branch" || true

  # Create worktree
  mkdir -p "$WORKTREE_DIR"
  add_to_gitignore

  echo -e "${BLUE}Creating worktree...${NC}"
  git worktree add -b "$branch_name" "$wt_path" "$from_branch"

  # Copy environment files
  copy_env_files "$wt_path"
  link_gitignored_agent_files "$wt_path"

  echo -e "${GREEN}✓ Worktree setup complete!${NC}"
  echo ""
  echo "To switch to this worktree:"
  echo -e "${BLUE}cd $wt_path${NC}"
  echo ""
}

# Rename an existing worktree
rename_worktree() {
  local old_name="$1"
  local new_name="$2"

  if [[ -z "$old_name" || -z "$new_name" ]]; then
    echo -e "${RED}Error: Both old and new branch names required${NC}"
    echo "Usage: $SCRIPT_NAME rename <from-branch> <to-branch>"
    exit 1
  fi

  local old_path="$WORKTREE_DIR/$old_name"
  local new_path="$WORKTREE_DIR/$new_name"

  # Check if source worktree exists
  if [[ ! -d "$old_path" ]]; then
    echo -e "${RED}Worktree does not exist: $old_name${NC}"
    list_worktrees
    exit 1
  fi

  # Check if destination already exists
  if [[ -d "$new_path" ]]; then
    echo -e "${RED}Error: Worktree already exists: $new_name${NC}"
    exit 1
  fi

  # Check if branch with new name already exists
  if git show-ref --verify --quiet "refs/heads/$new_name"; then
    echo -e "${RED}Error: Branch already exists: $new_name${NC}"
    exit 1
  fi

  echo -e "${BLUE}Renaming worktree:${NC}"
  echo "  From: $old_name"
  echo "  To:   $new_name"
  echo ""
  echo "Continue? [y/N]"
  read -r response

  if [[ "$response" != "y" ]]; then
    echo -e "${YELLOW}Aborted${NC}"
    return
  fi

  # Move the worktree directory
  echo -e "${BLUE}Moving worktree...${NC}"
  if ! git worktree move "$old_path" "$new_path"; then
    echo -e "${RED}Error: Failed to move worktree${NC}"
    exit 1
  fi

  # Rename the branch
  echo -e "${BLUE}Renaming branch...${NC}"
  if ! git branch -m "$old_name" "$new_name"; then
    echo -e "${RED}Error: Failed to rename branch${NC}"
    echo -e "${YELLOW}Worktree was moved but branch rename failed. Manual cleanup may be needed.${NC}"
    exit 1
  fi

  echo -e "${GREEN}✓ Worktree renamed successfully!${NC}"
  echo ""
  echo "To switch to this worktree:"
  echo -e "${BLUE}cd $new_path${NC}"
  echo ""
}

# Delete a worktree
delete_worktree() {
  local wt_name="$1"
  local delete_branch="${2:-}"

  if [[ -z "$wt_name" ]]; then
    echo -e "${RED}Error: Worktree name required${NC}"
    echo "Usage: $SCRIPT_NAME delete <name> [--branch]"
    exit 1
  fi

  local wt_path="$WORKTREE_DIR/$wt_name"

  # Check if worktree exists
  if [[ ! -d "$wt_path" ]]; then
    echo -e "${RED}Worktree does not exist: $wt_name${NC}"
    list_worktrees
    exit 1
  fi

  # Check if we're currently in this worktree
  if [[ "$PWD" == "$wt_path" || "$PWD" == "$wt_path"/* ]]; then
    echo -e "${RED}Error: Cannot delete the current worktree${NC}"
    echo "Please switch to the main repository or another worktree first."
    exit 1
  fi

  echo -e "${BLUE}Deleting worktree: $wt_name${NC}"
  echo "  Path: $wt_path"
  if [[ "$delete_branch" == "--branch" ]]; then
    echo -e "  ${YELLOW}Branch will also be deleted${NC}"
  fi
  echo ""
  echo "Continue? [y/N]"
  read -r response

  if [[ "$response" != "y" ]]; then
    echo -e "${YELLOW}Aborted${NC}"
    return
  fi

  # Remove the worktree
  echo -e "${BLUE}Removing worktree...${NC}"
  if ! git worktree remove "$wt_path" --force; then
    echo -e "${RED}Error: Failed to remove worktree${NC}"
    exit 1
  fi

  # Optionally delete the branch
  if [[ "$delete_branch" == "--branch" ]]; then
    echo -e "${BLUE}Deleting branch...${NC}"
    if git branch -d "$wt_name" 2>/dev/null; then
      echo -e "${GREEN}✓ Branch deleted${NC}"
    elif git branch -D "$wt_name" 2>/dev/null; then
      echo -e "${YELLOW}✓ Branch force-deleted (was not fully merged)${NC}"
    else
      echo -e "${YELLOW}Branch '$wt_name' not found or already deleted${NC}"
    fi
  fi

  # Clean up empty directory if nothing left
  if [[ -z "$(ls -A "$WORKTREE_DIR" 2>/dev/null)" ]]; then
    rmdir "$WORKTREE_DIR" 2>/dev/null || true
  fi

  echo -e "${GREEN}✓ Worktree deleted successfully!${NC}"
}

# List all worktrees
list_worktrees() {
  echo -e "${BLUE}Available worktrees:${NC}"
  echo ""

  if [[ ! -d "$WORKTREE_DIR" ]]; then
    echo -e "${YELLOW}No worktrees found${NC}"
    return
  fi

  local count=0
  for wt_path in "$WORKTREE_DIR"/*; do
    if [[ -d "$wt_path" && -e "$wt_path/.git" ]]; then
      count=$((count + 1))
      local wt_name=$(basename "$wt_path")
      local branch=$(git -C "$wt_path" rev-parse --abbrev-ref HEAD 2>/dev/null || echo "unknown")

      if [[ "$PWD" == "$wt_path" ]]; then
        echo -e "${GREEN}✓ $wt_name${NC} (current) → branch: $branch"
      else
        echo -e "  $wt_name → branch: $branch"
      fi
    fi
  done

  if [[ $count -eq 0 ]]; then
    echo -e "${YELLOW}No worktrees found${NC}"
  else
    echo ""
    echo -e "${BLUE}Total: $count worktree(s)${NC}"
  fi

  echo ""
  echo -e "${BLUE}Main repository:${NC}"
  local main_branch=$(git rev-parse --abbrev-ref HEAD 2>/dev/null || echo "unknown")
  echo "  Branch: $main_branch"
  echo "  Path: $GIT_ROOT"
}

# Switch to a worktree
switch_worktree() {
  local wt_name="$1"

  if [[ -z "$wt_name" ]]; then
    list_worktrees
    echo -e "${BLUE}Switch to which worktree? (enter name)${NC}"
    read -r wt_name
  fi

  local wt_path="$WORKTREE_DIR/$wt_name"

  if [[ ! -d "$wt_path" ]]; then
    echo -e "${RED}Worktree does not exist: $wt_name${NC}"
    echo ""
    list_worktrees
    exit 1
  fi

  echo -e "${GREEN}Switching to worktree: $wt_name${NC}"
  cd "$wt_path"
  echo -e "${BLUE}Now in: $(pwd)${NC}"
}

# Copy env files and link gitignored agent files to an existing worktree (or current directory if in a worktree)
copy_env_to_worktree() {
  local wt_name="$1"
  local wt_path

  if [[ -z "$wt_name" ]]; then
    # Check if we're currently in a worktree
    local current_dir=$(pwd)
    if [[ "$current_dir" == "$WORKTREE_DIR"/* ]]; then
      wt_path="$current_dir"
      wt_name=$(basename "$wt_path")
      echo -e "${BLUE}Detected current worktree: $wt_name${NC}"
    else
      echo -e "${YELLOW}Usage: $SCRIPT_NAME copy-env [worktree-name]${NC}"
      echo "Or run from within a worktree to copy to current directory"
      list_worktrees
      return 1
    fi
  else
    wt_path="$WORKTREE_DIR/$wt_name"

    if [[ ! -d "$wt_path" ]]; then
      echo -e "${RED}Worktree does not exist: $wt_name${NC}"
      list_worktrees
      return 1
    fi
  fi

  copy_env_files "$wt_path"
  link_gitignored_agent_files "$wt_path"
  echo ""
}

# Clean up completed worktrees
cleanup_worktrees() {
  if [[ ! -d "$WORKTREE_DIR" ]]; then
    echo -e "${YELLOW}No worktrees to clean up${NC}"
    return
  fi

  echo -e "${BLUE}Scanning for completed worktrees...${NC}"
  echo ""

  local found=0
  local to_remove=()

  for wt_path in "$WORKTREE_DIR"/*; do
    if [[ -d "$wt_path" && -e "$wt_path/.git" ]]; then
      local wt_name=$(basename "$wt_path")

      # Skip if current worktree
      if [[ "$PWD" == "$wt_path" ]]; then
        echo -e "${YELLOW}(skip) $wt_name - currently active${NC}"
        continue
      fi

      found=$((found + 1))
      to_remove+=("$wt_path")
      echo -e "${YELLOW}• $wt_name${NC}"
    fi
  done

  if [[ $found -eq 0 ]]; then
    echo -e "${GREEN}No inactive worktrees to clean up${NC}"
    return
  fi

  echo ""
  echo -e "Delete these $found worktree(s)? (y/n)"
  read -r response

  if [[ "$response" != "y" ]]; then
    echo -e "${YELLOW}Cleanup cancelled${NC}"
    return
  fi

  echo -e "${BLUE}Cleaning up worktrees...${NC}"
  for wt_path in "${to_remove[@]}"; do
    local wt_name=$(basename "$wt_path")
    git worktree remove "$wt_path" --force 2>/dev/null || true
    echo -e "${GREEN}✓ Removed: $wt_name${NC}"
  done

  # Clean up empty directory if nothing left
  if [[ -z "$(ls -A "$WORKTREE_DIR" 2>/dev/null)" ]]; then
    rmdir "$WORKTREE_DIR" 2>/dev/null || true
  fi

  echo -e "${GREEN}Cleanup completed!${NC}"
}

# Main command handler
main() {
  local command="${1:-list}"

  case "$command" in
    create)
      create_worktree "$2" "$3"
      ;;
    rename|move)
      rename_worktree "$2" "$3"
      ;;
    delete|rm)
      delete_worktree "$2" "$3"
      ;;
    list|ls)
      list_worktrees
      ;;
    switch|go)
      switch_worktree "$2"
      ;;
    copy-env|env)
      copy_env_to_worktree "$2"
      ;;
    cleanup|clean)
      cleanup_worktrees
      ;;
    help)
      show_help
      ;;
    *)
      echo -e "${RED}Unknown command: $command${NC}"
      echo ""
      show_help
      exit 1
      ;;
  esac
}

show_help() {
  cat << EOF
Git Worktree Manager

Usage: $SCRIPT_NAME <command> [options]

Commands:
  create <branch-name> [from-branch]  Create new worktree (sets up local files automatically)
                                      (from-branch defaults to current branch)
  rename | move <old> <new>           Rename worktree and corresponding branch
  delete | rm <name> [--branch]       Delete worktree (optionally delete branch too)
  list | ls                           List all worktrees
  switch | go [name]                  Switch to worktree
  copy-env | env [name]               Copy .env files and link gitignored agent files
                                      (if name omitted, uses current worktree)
  cleanup | clean                     Clean up inactive worktrees
  help                                Show this help message

Environment Files:
  - Recursively copies .env, .env.local, .env.test, etc. on create
  - Includes .env files in subdirectories (e.g., packages/api/.env)
  - Skips .env.example (should be in git)
  - Creates .backup files if destination already exists
  - Use 'copy-env' to refresh copied and linked local files after main repo changes

Agent Files:
  - Symlinks CLAUDE.md and AGENTS.md only when they are gitignored
  - Creates .backup files if destination already exists

Examples:
  $SCRIPT_NAME create feature-login
  $SCRIPT_NAME create feature-auth develop
  $SCRIPT_NAME move feature-login feature-auth
  $SCRIPT_NAME delete feature-login
  $SCRIPT_NAME delete feature-login --branch
  $SCRIPT_NAME switch feature-login
  $SCRIPT_NAME copy-env feature-login
  $SCRIPT_NAME copy-env                   # copies to current worktree
  $SCRIPT_NAME cleanup
  $SCRIPT_NAME list

EOF
}

# Run
main "$@"
