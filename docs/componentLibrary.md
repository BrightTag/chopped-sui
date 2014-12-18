# Drop-Down

## Configuration

TODO

## Broadcast Events

When component state changes, events will be emitted on the outermost component element. These may be listened for and acted upon.

Most events are paired with a "will" event that occurs just before state changes and a "did" event that occurs just after state changes.

To listen for a broadcast event, use the following pattern:

```js
component.addEventListener('eventName', function (e) {
  // access e.details here
});
```

`eventName` corresponds to a valid broadcast event.

`e.details` is an object that contains `component` (the outermost element of the component that fired the event) and potentially other data relevant to the state change.

### dropDownWillBuild

#### event.detail

**component** - the outermost element of the component that will be built

#### info

emitted when the component is about to be built

### dropDownDidBuild

#### event.detail

**component** - the outermost element of the component that was built

#### info

emitted when the component is built

### dropDownWillEnhance

#### event.detail

**component** - the outermost element of the component that will be enhanced

#### info

emitted when the component is about to be enhanced

### dropDownDidEnhance

#### event.detail

**component** - the outermost element of the component that was enhanced

#### info

emitted when the component is enhanced

### dropDownWillShow

#### event.detail

**component** - the outermost element of the component whose menu will be shown

#### info

emitted when the component's menu is about to be shown

### dropDownDidShow

#### event.detail

**component** - the outermost element of the component whose menu was shown

#### info

emitted when the component's menu is shown

### dropDownWillHide

#### event.detail

**component** - the outermost element of the component whose menu will be hidden

#### info

emitted when the component's menu is about to be hidden

### dropDownDidHide

#### event.detail

**component** - the outermost element of the component whose menu was hidden

#### info

emitted when the component's menu is hidden

### dropDownDidSelect

#### event.detail

**component** - the outermost element of the component whose menu was hidden

**selected** - the component's menu item element that was selected

#### info

emitted when one of the component's menu items is selected

#### event.detail

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

### dropDownShow

Tells the drop-down to show its menu if it isn't already shown.

```js
var dropDownShowEvent = new window.CustomEvent('dropDownShow');
component.dispatchEvent(dropDownShowEvent);
```

### dropDownHide

Tells the drop-down to hide its menu if it isn't already hidden.

```js
var dropDownHideEvent = new window.CustomEvent('dropDownHide');
component.dispatchEvent(dropDownHideEvent);
```

### dropDownSelect

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