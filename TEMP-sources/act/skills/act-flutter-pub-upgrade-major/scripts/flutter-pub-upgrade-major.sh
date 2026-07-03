#!/bin/bash

# Flutter Pub Upgrade Major - Upgrade all dependencies to latest major versions

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if we're in a Flutter project
if [[ ! -f "pubspec.yaml" ]]; then
  echo -e "${RED}Error: No pubspec.yaml found in current directory${NC}"
  echo -e "  Please run this command from the root of a Flutter project."
  exit 1
fi

# Step 1: Upgrade dependencies
echo -e "${BLUE}Upgrading dependencies to latest major versions...${NC}"
if ! flutter pub upgrade --major-versions; then
  echo -e "${RED}Error: Failed to upgrade dependencies${NC}"
  exit 1
fi
echo -e "${GREEN}✓ Dependencies upgraded successfully${NC}"
echo ""

# Step 2: Run static analysis
echo -e "${BLUE}Running static analysis...${NC}"
if ! flutter analyze; then
  echo -e "${RED}Error: Static analysis found issues${NC}"
  echo -e "${YELLOW}Please fix the analysis errors before proceeding.${NC}"
  exit 1
fi
echo -e "${GREEN}✓ Static analysis passed${NC}"
echo ""

# Step 3: Run tests
echo -e "${BLUE}Running tests...${NC}"
if ! flutter test; then
  echo -e "${RED}Error: Tests failed${NC}"
  echo -e "${YELLOW}Please fix the failing tests before proceeding.${NC}"
  exit 1
fi
echo -e "${GREEN}✓ All tests passed${NC}"
echo ""

# Success summary
echo -e "${GREEN}✓ Dependency upgrade complete!${NC}"
echo ""
echo -e "${YELLOW}⚠️  Important: Manual testing required${NC}"
echo -e "  Please run the app on all supported platforms to ensure"
echo -e "  platform-specific functionality still works correctly:"
echo ""
echo -e "  ${BLUE}iOS:${NC}     flutter run -d ios"
echo -e "  ${BLUE}Android:${NC} flutter run -d android"
echo -e "  ${BLUE}Web:${NC}     flutter run -d chrome"
echo -e "  ${BLUE}macOS:${NC}   flutter run -d macos"
echo -e "  ${BLUE}Windows:${NC} flutter run -d windows"
echo -e "  ${BLUE}Linux:${NC}   flutter run -d linux"
echo ""
