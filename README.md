# SignalUI Component Library

## Installation

1. Clone this repo
2. `cd` to your local repo and run `./install.sh`

## Updating

1. On master branch `git pull origin master`
2. run `./update.sh`

## Building

`cd` to the local repo and run `gulp`

## Demo

`cd` to the local repo and run `gulp start:demo` and follow the instructions

**TODO**: demo HTML shoud be built after helpers/templates are in place

## Components

Each component resides in a folder under `src/components`.

For example, the `drop-down` component may be found under `src/components/drop-down`.

Each component directory contains a folder for `css`, `js`, and `templates`.

**TODO**: "Component" library, "/components" directory, "Component" within the JS library. Should we formalize/standardize?

### CSS

`css` should contain a single SASS file named `component-name.scss` containing all the styles necessary to render all versions of the component. For `drop-down` this is `drop-down.scss`.

**TODO**: we may want to expand this to allow for multiple SASS files

SASS files for all components will be converted to CSS and concatenated into `dist/components/css/components.css`.

**TODO**: there may come a time where ordering these CSS files becomes a requirement

### JS

`js` should contain a single JS file named `component-name.js` containing the SignalUI.registerComponent() call for this component. For `drop-down` this is `drop-down.scss`.

### Templates

`templates` should contain zero or more templates  named `component-name-part.mustache` containing sub templates for any HTML that needs to be added on enhancement, no matter how insignificant. For `drop-down` this is `drop-down-trigger.mustache` and `drop-down-menu.mustache`.

**TODO**: The template used in creating language-specific helpers should also live here, most likely

### Helpers

**TODO**: language-specific helpers are necessary to generate the initial markup using the Jade Templates listed above. They should probably be generated dynamically

### Tests

**TODO**: I'd like to do both unit and integration/behavior testing

## Library

The library is a single JavaScript file building helpers for initializing components in the SignalUI namespace.

**TODO**: We should really be using browserify or requirejs to break this apart into smaller, testable parts.

**TODO**: Unit testing
