#!/bin/bash

# Flutter Screenshot - Capture screenshots from running Flutter apps

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Parse arguments
OUTPUT_PATH=""
DEVICE_ID=""

# Parse arguments
while [[ $# -gt 0 ]]; do
  case "$1" in
    --device|-d)
      DEVICE_ID="$2"
      shift 2
      ;;
    --help|-h)
      echo "Usage: flutter-screenshot.sh [output_path] [--device <device_id>]"
      echo ""
      echo "Arguments:"
      echo "  output_path         Where to save the screenshot (default: /tmp/flutter-screenshots/YYYYMMDD-HHMMSS-screenshot.png)"
      echo "  --device, -d        Target device ID or name prefix"
      echo "  --list-devices, -ld List available device identifiers"
      echo ""
      echo "Examples:"
      echo "  flutter-screenshot.sh"
      echo "  flutter-screenshot.sh ./screenshots/home.png"
      echo "  flutter-screenshot.sh --device iPhone"
      echo "  flutter-screenshot.sh ./test.png --device emulator"
      exit 0
      ;;
    --list-devices|-ld)
      echo -e "${BLUE}Available devices:${NC}"
      echo ""
      printf "  ${YELLOW}%-45s${NC} %s\n" "NAME" "DEVICE ID"
      printf "  %-45s %s\n" "----" "---------"
      flutter devices 2>&1 | grep "•" | while IFS='•' read -r name id rest; do
        name=$(echo "$name" | xargs)
        id=$(echo "$id" | xargs)
        if [[ -n "$id" ]]; then
          printf "  %-45s ${GREEN}%s${NC}\n" "$name" "$id"
        fi
      done
      exit 0
      ;;
    -*)
      echo -e "${RED}Unknown option: $1${NC}"
      exit 1
      ;;
    *)
      # Positional argument (output path)
      if [[ -z "$OUTPUT_PATH" ]]; then
        OUTPUT_PATH="$1"
      else
        echo -e "${RED}Unexpected argument: $1${NC}"
        exit 1
      fi
      shift
      ;;
  esac
done

# Default output path (use temp directory to avoid git pollution)
if [[ -z "$OUTPUT_PATH" ]]; then
  TIMESTAMP=$(date +"%Y%m%d-%H%M%S")
  OUTPUT_PATH="/tmp/flutter-screenshots/${TIMESTAMP}-screenshot.png"
fi

# Ensure output directory exists
OUTPUT_DIR=$(dirname "$OUTPUT_PATH")
if [[ ! -d "$OUTPUT_DIR" ]]; then
  mkdir -p "$OUTPUT_DIR"
  echo -e "${BLUE}Created directory: $OUTPUT_DIR${NC}"
fi

# Check for connected devices
echo -e "${BLUE}Checking for connected devices...${NC}"
DEVICES=$(flutter devices 2>&1)

if echo "$DEVICES" | grep -q "No devices detected"; then
  echo -e "${RED}Error: No connected devices found${NC}"
  echo -e "${YELLOW}Tip: Start a simulator/emulator or connect a physical device${NC}"
  echo ""
  echo "To list available emulators:"
  echo "  flutter emulators"
  echo ""
  echo "To launch an emulator:"
  echo "  flutter emulators --launch <emulator_name>"
  exit 1
fi

# Build flutter screenshot command
FLUTTER_CMD="flutter screenshot -o \"$OUTPUT_PATH\""

if [[ -n "$DEVICE_ID" ]]; then
  FLUTTER_CMD="$FLUTTER_CMD -d \"$DEVICE_ID\""
fi

# Take screenshot
echo -e "${BLUE}Capturing screenshot...${NC}"
if eval $FLUTTER_CMD; then
  # Get absolute path for output
  ABS_PATH=$(cd "$(dirname "$OUTPUT_PATH")" && pwd)/$(basename "$OUTPUT_PATH")

  echo ""
  echo -e "${GREEN}Screenshot saved to: $ABS_PATH${NC}"
  echo ""
  echo -e "${BLUE}To analyze this screenshot, use the Read tool:${NC}"
  echo "  Read: $ABS_PATH"
else
  echo -e "${RED}Failed to capture screenshot${NC}"
  exit 1
fi
