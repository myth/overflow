#!/bin/bash

set -euo pipefail

# Validations
dirty=$(git status -s)
if [ "$dirty" ]; then
    git status -s
    echo "You have a dirty staging area, clean up first!"
    exit 1
fi


# Prepare release
latest=$(git tag | sort -V | tail -1)
read -p "Enter a version for this release (current is $latest): v" version
read -p 'Enter a comment for this release: ' comment

git tag -a -s -m "$comment" "v$version"
echo "Created signed tag: 'v$version' ('$comment')"

# Deployment
echo "Pushing overflow $(git describe)"
git push --follow-tags
echo "Follow deployment at https://ci.ulv.io/myth/overflow"
