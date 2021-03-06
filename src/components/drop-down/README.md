# Drop-Down

## Template Configuration

Drop down menus require data in the following format:

### `id`

> *optional*

> *string*

> *default: null*

Optional id attribute for the component.

### `class`

> *optional*

> *string*

> *default: null*

Optional class attribute for the component.

### `build`

> *optional*

> *boolean*

> *default: false*

Set to true for server-side pre-building of components.

### `select`

> *optional - must use select or menu*

> *object*

> *default: null*

Object containing information regarding a select on top of which the drop-down
component is based. `select` data is as follows:

#### `selectId`

> *required*

> *string*

The id attribute of the select.

#### `selectName`

> *required*

> *string*

The name attribute of the select.

#### `hideCurrent`

> *optional*

> *boolean*

> *default: false*

Set to true to prevent the currently selected option from appearing in the
drop-down menu.

#### `menuItems`

> *required*

> *array of objects*

Array representing each option in the select. `menuItem` objects each contain
the following:

##### `text`

> *required*

> *string*

Text label for the option.

##### `value`

> *required*

> *string*

The value attribute of the option.

##### `isCurrent`

> *optional - should only be set for one option*

> *boolean*

> *default: false*

Adds the selected attribute to the option.

### `flushDirection`

> *optional - ignored by `select`*

> *string: 'left', 'right', or 'both'*

> *default: 'both'*

Specifies whether the menu and button's left, right, or both edges will be flush.

### `triggerText`

> *required for `menu` - ignored by `select`*

> *string*

The text for the trigger that shows the menu.

### `triggerId`

> *optional - ignored by `select`*

> *string*

> *default: ''*

Optional id attribute for the trigger.

### `menu`

> *optional - must use select or menu*

> *object*

> *default: null*

Object containing information regarding an unordered list on top of which the
drop-down component is based. `menu` data is as follows:

#### `menuItems`

> *required*

> *array of objects*

Array representing each option in the select. `menuItem` objects each contain
the following:

##### `menuItemId`

> *optional*

> *string*

Optional id attribute for the menu item.

##### `text`

> *required*

> *string*

Text for the menu item.

##### `link`

> *optional*

> *string*

> *default: 'javascript:;'*

The href attribute of the menu item.

## Broadcast Events

When component state changes, events will be emitted on the outermost component element. These may be listened for and acted upon.

Most events are paired with a "will" event that occurs just before state changes and a "did" event that occurs just after state changes.

To listen for a broadcast event, use the following pattern:

```js
component.addEventListener('eventName', function (e) {
  // access e.target and e.details here
});
```

`eventName` corresponds to a valid broadcast event.

### `dropDownWillBuild`

emitted when the component is about to be built

### `dropDownDidBuild`

emitted when the component is built

### `dropDownWillDestroy`

emitted when the component is about to be destroyed

### `dropDownDidDestroy`

emitted when the component is destroyed

### `dropDownWillEnhance`

emitted when the component is about to be enhanced

### `dropDownDidEnhance`

emitted when the component is enhanced

### `dropDownWillShow`

emitted when the component's menu is about to be shown

### `dropDownDidShow`

emitted when the component's menu is shown

### `dropDownWillHide`

emitted when the component's menu is about to be hidden

### `dropDownDidHide`

emitted when the component's menu is hidden

### `dropDownWillSelect`

`event.detail.selected` - the component's menu item element that was selected

emitted when one of the component's menu items is about to be selected

### `dropDownDidSelect`

`event.detail.selected` - the component's menu item element that was selected

emitted when one of the component's menu items is selected

#### `event.detail`

## API Events

To trigger UI behaviors in the drop-down component, dispatch one of these custom events on the component itself.

To create and dispatch a custom event, use the following pattern:

```js
var apiEvent = new window.CustomEvent(
  'eventName',
  {
    'detail': eventData
  }
);
component.dispatchEvent(apiEvent);
```

`eventName` corresponds to a valid API event.

`eventData` is an object containing data relevent to the event.

The second argument to CustomEvent may be omitted entirely in cases where no additional information is needed beyond the API directive.

### `dropDownShow`

Tells the drop-down to show its menu if it isn't already shown.

```js
var dropDownShowEvent = new window.CustomEvent('dropDownShow');
component.dispatchEvent(dropDownShowEvent);
```

### `dropDownHide`

Tells the drop-down to hide its menu if it isn't already hidden.

```js
var dropDownHideEvent = new window.CustomEvent('dropDownHide');
component.dispatchEvent(dropDownHideEvent);
```

### `dropDownSelect`

Tells the drop-down to select the specified option. Works even if the drop=down's menu is hidden.

```js
var dropDownSelectEvent = new window.CustomEvent(
  'dropDownSelect',
  {
    'detail': {
      'select': 'Text Of Option'
    }
  }
);
component.dispatchEvent(dropDownSelectEvent);
```
