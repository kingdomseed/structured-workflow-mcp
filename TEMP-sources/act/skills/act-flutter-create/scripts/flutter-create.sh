#!/bin/bash

# Flutter Create - Create a new Flutter project with flutter_lints and preferred analysis options

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Parse arguments
PROJECT_NAME=""
ORG_NAME=""
PLATFORMS=""

# First argument is the project name (positional)
if [[ $# -gt 0 && ! "$1" =~ ^-- ]]; then
  PROJECT_NAME="$1"
  shift
fi

# Parse named arguments
while [[ $# -gt 0 ]]; do
  case "$1" in
    --org)
      ORG_NAME="$2"
      shift 2
      ;;
    --platforms)
      PLATFORMS="$2"
      shift 2
      ;;
    *)
      echo -e "${RED}Unknown argument: $1${NC}"
      exit 1
      ;;
  esac
done

# If no project name, pass through to flutter create to show its help/error
if [[ -z "$PROJECT_NAME" ]]; then
  flutter create
  exit $?
fi

# Check if current directory already has pubspec.yaml
if [[ -f "pubspec.yaml" ]]; then
  echo -e "${RED}Error: Current directory already contains a pubspec.yaml file${NC}"
  echo -e "  You are already inside a Flutter/Dart project."
  echo -e "  ${YELLOW}Please navigate to a different directory first.${NC}"
  exit 1
fi

# Build and run flutter create command
FLUTTER_CMD="flutter create -e $PROJECT_NAME"
if [[ -n "$ORG_NAME" ]]; then
  FLUTTER_CMD="$FLUTTER_CMD --org $ORG_NAME"
fi
if [[ -n "$PLATFORMS" ]]; then
  FLUTTER_CMD="$FLUTTER_CMD --platforms $PLATFORMS"
fi

if ! $FLUTTER_CMD; then
  exit $?
fi

echo ""

# Replace analysis_options.yaml
echo -e "${BLUE}Configuring analysis_options.yaml...${NC}"
cat > "$PROJECT_NAME/analysis_options.yaml" << 'EOF'
include: package:flutter_lints/flutter.yaml

# See formatter options: https://codewithandrea.com/articles/updated-formatter-dart-3-8/
formatter:
  trailing_commas: preserve

linter:
  rules:
EOF
echo -e "  ${GREEN}✓ Replaced analysis_options.yaml with flutter_lints config${NC}"

echo -e "${GREEN}✓ Project created successfully!${NC}"
echo ""
echo -e "To get started:"
echo -e "  ${BLUE}cd $PROJECT_NAME${NC}"
echo ""
