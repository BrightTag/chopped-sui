# SignalUI Component Library

## Installation

1. Clone this repo
2. Install node via package manager or [download](http://nodejs.org/download/)
3. `cd` to your local repo and run `npm install`
4. run `npm install gulp -g`
4. run `sudo gem install bundler`
5. run `bundler install`
6. run `gulp`

## Updating

1. On master branch `git pull origin master`
2. run `npm install`
3. run `gulp`

## Building

`cd` to the local repo and run `gulp`

## Demo

`cd` to the local repo and run `gulp start:demo` and follow the instructions

**TODO**: demo HTML shoud be built after helpers/templates are in place

## Components

Each component resides in a folder under `src/modules`.

For example, the `drop-down` component may be found under `src/modules/drop-down`.

Each component directory contains a folder for `css`, `js`, and `templates`.

**TODO**: "Component" library, "/modules" directory, "Widget" within the JS library. Should we formalize/standardize?

### CSS

`css` should contain a single SASS file named `module-name.scss` containing all the styles necessary to render all versions of the component. For `drop-down` this is `drop-down.scss`.

**TODO**: we may want to expand this to allow for multiple SASS files

SASS files for all modules will be converted to CSS and concatenated into `dist/modules/css/modules.css`.

**TODO**: there may come a time where ordering these CSS files becomes a requirement

### JS

`js` should contain a single JS file named `module-name.js` containing the SignalUI.registerWidget() call for this component. For `drop-down` this is `drop-down.scss`.

### Templates

`templates` should contain zero or more templates  named `module-name-part.mustache` containing sub templates for any HTML that needs to be added on enhancement, no matter how insignificant. For `drop-down` this is `drop-down-trigger.mustache` and `drop-down-menu.mustache`.

**TODO**: The template used in creating language-specific helpers should also live here, most likely

### Helpers

**TODO**: language-specific helpers are necessary to generate the initial markup using the Jade Templates listed above. They should probably be generated dynamically

### Tests

**TODO**: I'd like to do both unit and integration/behavior testing

## Library

The library is a single JavaScript file building helpers for initializing modules in the SignalUI namespace.

**TODO**: We should really be using browserify or requirejs to break this apart into smaller, testable parts.

**TODO**: Unit testing
