# The Component Library

The component library gives a set of pre-built and styled components for our UIs. The intention is to give enough flexibility and power so that these components can, eventually, make up the majority of what our clients interact with.

Right now the component library only contains drop-down menus, but more components are coming soon.

## Why are we doing this?

The component library will allow for easy calls to create components on a page

## Implementation

1. Clone into signal-ui-component-library. Right now it is on Github, soon (probably) it will be moving to Gitlab.
2. Inline signal-ui.js in the head of the page in question.
3. Link components.css in the head of the page.
4. At the end of the body tag link to components.js
5. For each component or instance of a component, use the provided helper script to generate markup. These scripts have plenty of conifguration options to suit *your* needs! (Applause)

## Benefits
- Only need to implement a component once and can be utilized across UIs.
- Can be tested independently of the UI it is integrated in.
- Can be versioned for stability.
- However, it can also easily be upgraded to newer versions for new components and functionality.
- As the library grows, development will get faster and easier.
- Through using the component library and stylesheet our future UIs will slowly move towards a unified look and feel.
- UI development can be parallelized thanks to components being independent of a specific page's markup.
