# ChopSuey - Signal Component Library

ChopSuey is a small JavaScript library that enables common UI Components (HTML, CSS, and interactions) to be shared across projects built with disparate technologies. Components are designed with minimal styling so that they can be tailored to match the applications they are used in. Markup for ChopSuey components can be generated client or server side depending on the architectural requirements of your application.

## Available Components

- [Drop Down Menu](docs/componentLibrary.md)
- Accordian


## Usage

`js` should contain a single JS file named `main.js` along with supporting browserify managed modules. 

JavaScript files for the library will be converted and concatenated into `dist/components/js/chop-suey.js` and `dist/components/js/chop-suey.min.js`.


## Component Event API

Components will broadcast various state changes through events. We can listen to, and respond to, these events just as we would a click event. All components will broadcast:

- `componentNameWillBuild`: Fired before HTML is added
- `componentNameDidBuild`: Fired after HTML is added
- `componentNameWillEnhance`: Fired before behavior is added
- `componentNameDidEnhance`: Fired after behavior is added
- `componentNameWillDestroy`: Fired before HTML and behavior are removed
- `componentNameDidEnhance`: Fired after HTML and behavior are removed

Additionally, some components will broadcast additional events when state changes occur.  For example:

- `dropDownWillShow`: Fired before a drop-down menu shows
- `accordionDidHide`: Fired after a section of an accordion is hidden

In all cases, the context of the current component is passed in as `this` and as `event.target`. For some components, additional information will be attached to the event such as which accordion section was actually hidden. See the [component docs](docs/componentLibrary.md) for more information in these cases.


## Development

### Installation

1. Clone this repo
2. `cd` to your local repo and run `./install.sh`

### Updating

1. On master branch `git pull origin master`
2. run `./update.sh`

### Building

`cd` to the local repo and run `gulp`

### Demo

`cd` to the local repo and run `gulp start:demo` and follow the instructions


## Component Definition

Each component resides in a folder under [src/components](src/components). For example, the `drop-down` component may be found under [src/components/drop-down](src/components/drop-down). Each component directory contains a folder for `css`, `js`, and `templates`.

### CSS

The `css` directory should contain a single SASS file named `main.scss` containing all the styles necessary to render all versions of the component.

SASS files for all components will be converted to CSS and concatenated into `dist/components/css/components.css` and `dist/components/css/components.min.css`.

### JS

The `js` directory should contain a single JS file named `main.js` containing the ChopSuey.registerComponent() call for this component along with potential `build.js` and/or `enhance.js` with supporting browserify managed modules. 

JavaScript files for all components will be converted and concatenated into `dist/components/js/components.js` and `dist/components/js/components.min.js`.

### Templates

The `templates` directory should contain one or more templates  named `component-name.mustache` for rendering the entire component, or `component-name-part.mustache` containing sub templates for any HTML that needs to be added on enhancement, no matter how insignificant.

For example, the `drop-down` contains a main template called `drop-down.mustache` and three sub-templates called `drop-down-menu.mustache`, `drop-down-sizer.mustache`, and `drop-down-trigger.mustache`.

### Tests

Testing files live along side the source files. Testing is written using Mocha/Chai. We test everything from expected returns of small functions given good and bad arguments, to whether or not HTML is being added to the page, events are being thrown, and events are being listened for. 


## Component Helpers

Helper functions provide native wrappers for generating ChopSuey component markup in various backend languages.

Currently, helper templates are located in [gulp/resources](gulp/resources) such as `php-helper.mustache`. These templates use the directory structure of the templates to generate method names for use in a particular language.

Helpers get generated in [dist/helpers](dist/helpers) in language specific folders.

ChopSuey currently supports:
* `php`
