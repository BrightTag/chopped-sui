# SignalUI Component Library

## Installation

1. Clone this repo
2. Install node via package manager or [download](http://nodejs.org/download/)
3. `cd` to your local repo and run `npm install`
4. run `gem install bundler`
5. run `bundler install`

## Building

`cd` to the local repo and run `gulp`

## Demo

`cd` to the local repo and run `gulp local-demo` and follow the instructions

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

The `templates` argument should be formatted using text placeholders for the actual templates.

For `drop-down`, the templates argument looks like this:

```js
templates: {
  trigger: 'TEMPLATE:drop-down/templates/drop-down-trigger',
  menu:    'TEMPLATE:drop-down/templates/drop-down-menu'
},
```

The keyword 'TEMPLATE:' is followed by the directory (after `src/modules/`) and file name (without extention) of the sub-template. The build process will incorporate precompiled templates in the appropriate place.

**TODO**: better placeholders/system for integrating precompiled Jade templates?

### Templates

`templates` should contain zero or more templates  named `module-name-part.jade` containing sub templates for any HTML that needs to be added on enhancement, no matter how insignificant. For `drop-down` this is `drop-down-trigger.jade` and `drop-down-menu.jade`.

**TODO**: The template used in creating language-specific helpers should also live here, most likely

### Helpers

**TODO**: language-specific helpers are necessary to generate the initial markup using the Jade Templates listed above. They should probably be generated dynamically

### Tests

**TODO**: I'd like to do both unit and integration/behavior testing

## Library

The library is a single JavaScript file building helpers for initializing modules in the SignalUI namespace.

**TODO**: We should really be using browserify or requirejs to break this apart into smaller, testable parts.

**TODO**: Unit testing
