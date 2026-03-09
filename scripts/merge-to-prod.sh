#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Get the current branch name
CURRENT_BRANCH=$(git branch --show-current)

if [ -z "$CURRENT_BRANCH" ]; then
  echo -e "${RED}❌ Error: Could not determine current branch${NC}"
  exit 1
fi

TARGET_BRANCH="deploy/prod"

echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}📋 Git Merge to ${TARGET_BRANCH}${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo -e "${YELLOW}📍 Current branch: ${CURRENT_BRANCH}${NC}"
echo -e "${YELLOW}🎯 Target branch: ${TARGET_BRANCH}${NC}"
echo ""

# Step 1: Checkout target branch
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}Step 1/5:${NC} Checking out ${TARGET_BRANCH}..."
if git checkout "$TARGET_BRANCH"; then
  echo -e "${GREEN}✅ Successfully checked out ${TARGET_BRANCH}${NC}"
else
  echo -e "${RED}❌ Failed to checkout ${TARGET_BRANCH}${NC}"
  exit 1
fi
echo ""

# Step 2: Pull latest changes
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}Step 2/5:${NC} Pulling latest changes from ${TARGET_BRANCH}..."
if git pull origin "$TARGET_BRANCH"; then
  echo -e "${GREEN}✅ Successfully pulled latest changes${NC}"
else
  echo -e "${RED}❌ Failed to pull changes${NC}"
  git checkout "$CURRENT_BRANCH"
  exit 1
fi
echo ""

# Step 3: Merge the original branch
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}Step 3/5:${NC} Merging ${CURRENT_BRANCH} into ${TARGET_BRANCH}..."
if git merge "$CURRENT_BRANCH" --no-edit; then
  echo -e "${GREEN}✅ Successfully merged ${CURRENT_BRANCH} into ${TARGET_BRANCH}${NC}"
else
  echo -e "${RED}❌ Merge failed. Please resolve conflicts manually.${NC}"
  echo -e "${YELLOW}💡 After resolving conflicts, run:${NC}"
  echo -e "   git add ."
  echo -e "   git commit"
  echo -e "   git push origin ${TARGET_BRANCH}"
  echo -e "   git checkout ${CURRENT_BRANCH}"
  exit 1
fi
echo ""

# Step 4: Push changes
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}Step 4/5:${NC} Pushing changes to ${TARGET_BRANCH}..."
if git push origin "$TARGET_BRANCH"; then
  echo -e "${GREEN}✅ Successfully pushed to ${TARGET_BRANCH}${NC}"
else
  echo -e "${RED}❌ Failed to push changes${NC}"
  git checkout "$CURRENT_BRANCH"
  exit 1
fi
echo ""

# Step 5: Checkout back to original branch
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}Step 5/5:${NC} Checking out back to ${CURRENT_BRANCH}..."
if git checkout "$CURRENT_BRANCH"; then
  echo -e "${GREEN}✅ Successfully checked out back to ${CURRENT_BRANCH}${NC}"
else
  echo -e "${RED}❌ Failed to checkout back to ${CURRENT_BRANCH}${NC}"
  exit 1
fi
echo ""

echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}🎉 All done! Successfully merged ${CURRENT_BRANCH} into ${TARGET_BRANCH}${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"

