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

sed -i "s,myth/overflow.*,myth/overflow:$version," docker-compose.yml
sed -i "/^version = /s/.*/version = \"$version\"/" pyproject.toml
uv sync
git commit -am "chore: Prepare v${version}"
echo "Pinned docker-compose.yml to mythern/overflow:$version and updated version in pyproject.toml"
git tag -a -s -m "$comment" "v$version"
echo "Created signed tag: 'v$version' ('$comment')"

# Deployment
echo "Pushing overflow $(git describe)"
git push --follow-tags
echo "Follow deployment at https://github.com/myth/overflow/actions/"
