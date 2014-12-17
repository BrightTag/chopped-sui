#!/bin/bash
#
if ! type brew >/dev/null 2>&1; then
  ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
else
  brew update
fi
if ! type npm >/dev/null 2>&1; then
  brew install node
fi
if ! type gulp >/dev/null 2>&1; then
  sudo npm install gulp -g
fi
if ! type bundler >/dev/null 2>&1; then
  sudo gem install bundler
fi
bundler install
gulp
