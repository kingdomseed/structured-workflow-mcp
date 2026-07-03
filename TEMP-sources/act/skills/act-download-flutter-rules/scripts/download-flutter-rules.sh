#!/bin/bash

# Download Flutter rules from the official repository
# and save to skills/act-flutter-development/references/flutter-rules-official.md

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Determine the output directory relative to this script's location
# This works regardless of where the skill is installed (project, user, or plugin scope)
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
SKILLS_DIR="$(dirname "$(dirname "$SCRIPT_DIR")")"
OUTPUT_DIR="$SKILLS_DIR/act-flutter-development/references"

OUTPUT_FILE="$OUTPUT_DIR/flutter-rules-official.md"

# URL of the Flutter rules file
URL="https://raw.githubusercontent.com/flutter/flutter/refs/heads/main/docs/rules/rules.md"

echo -e "${BLUE}Downloading Flutter rules...${NC}"

# Create output directory if it doesn't exist
mkdir -p "$OUTPUT_DIR"

# Download to temp file first
TEMP_FILE=$(mktemp)
trap "rm -f $TEMP_FILE" EXIT

if curl -f -s -o "$TEMP_FILE" "$URL"; then
    # Compare with existing file
    if [ -f "$OUTPUT_FILE" ] && cmp -s "$TEMP_FILE" "$OUTPUT_FILE"; then
        echo -e "  ${GREEN}✓${NC} $OUTPUT_FILE is already up to date"
    else
        mv "$TEMP_FILE" "$OUTPUT_FILE"
        echo -e "  ${GREEN}✓${NC} Downloaded to $OUTPUT_FILE"
    fi
    exit 0
else
    echo -e "  ${RED}✗${NC} Failed to download Flutter rules"
    exit 1
fi
