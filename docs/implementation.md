# Implementing the Component Library
	-allows components to be built and enhanced, but it knows nothing about what components are on the page. client side. signal-ui.js (like jquery). This is inlined because GO SPEED RACER GO.
	-Javascript and CSS that represents the modules themselves. These are components that are like the jquery plugins. These are implemented on a per component basis. You only end up with a "components.js" no matter how many components you're implementing. This is at the end of the body.
	-Components.css needs to be linked in the head.
	-to make a component show up on a page I put in the right helper server side so that it will output the right markup. There are helpers in most languages we use. ## We are doing this so that if the markup every changes people don't need to update their code, they just need to update the signal-ui.js library, components.js, and helpers, which should be located in one place within the repo. ##
