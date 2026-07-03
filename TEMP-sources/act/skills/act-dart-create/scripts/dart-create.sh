#!/bin/bash

# Dart Create - Create a new Dart CLI project with recommended lints and preferred analysis options

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

PROJECT_NAME="$1"

# If no arguments, pass through to dart create to show its help/error
if [[ -z "$PROJECT_NAME" ]]; then
  dart create
  exit $?
fi

# Check if current directory already has pubspec.yaml
if [[ -f "pubspec.yaml" ]]; then
  echo -e "${RED}Error: Current directory already contains a pubspec.yaml file${NC}"
  echo -e "  You are already inside a Dart project."
  echo -e "  ${YELLOW}Please navigate to a different directory first.${NC}"
  exit 1
fi

# Create the Dart CLI project
if ! dart create -t console "$PROJECT_NAME"; then
  exit $?
fi

echo ""

# Replace analysis_options.yaml
echo -e "${BLUE}Configuring analysis_options.yaml...${NC}"
cat > "$PROJECT_NAME/analysis_options.yaml" << 'EOF'
include: package:lints/recommended.yaml

# See formatter options: https://codewithandrea.com/articles/updated-formatter-dart-3-8/
formatter:
  trailing_commas: preserve

linter:
  rules:
EOF
echo -e "  ${GREEN}✓ Replaced analysis_options.yaml with recommended lints config${NC}"

echo -e "${GREEN}✓ Project created successfully!${NC}"
echo ""
echo -e "To get started:"
echo -e "  ${BLUE}cd $PROJECT_NAME${NC}"
echo ""
