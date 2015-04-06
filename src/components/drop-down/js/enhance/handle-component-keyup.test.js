// describe('DropDown.enhance (keyup:dropDown)', function () {
//   var
//     DropDown = ChopSuey.registeredComponents().dropDown,
//     validDropDownHTML = ChopSuey.templates['drop-down'].render({
//       menu: true,
//       menuItems: [
//         {
//           link: '#1',
//           text: 1
//         },
//         {
//           link: '#1',
//           text: 2
//         },
//         {
//           link: '#1',
//           text: 3
//         }
//       ],
//       build: true,
//       triggerText: 'menu'
//     },
//     {
//       'drop-down-menu'   : ChopSuey.templates['drop-down-menu'],
//       'drop-down-sizer'  : ChopSuey.templates['drop-down-sizer'],
//       'drop-down-trigger': ChopSuey.templates['drop-down-trigger'],
//     });

//   describe('validation', function () {

//     describe('opening and closing the menu', function () {

//       it('should convert up/down key events to dropDownShow/dropDownHide events', function (done) {
//         var
//           div = document.createElement('div'),
//           dropDown,
//           trigger,
//           upArrowEvent,
//           downArrowEvent;

//         div.innerHTML = validDropDownHTML;

//         dropDown = div.querySelectorAll('.drop-down')[0];
//         trigger = dropDown.querySelectorAll('.drop-down__trigger')[0];

//         document.body.appendChild(dropDown);
//         DropDown.enhance(dropDown);

//         dropDown.addEventListener('dropDownShow', function () {

//           dropDown.addEventListener('dropDownHide', function () {
//             expect(1).to.equal(1); // made it here
//             document.body.removeChild(dropDown);
//             done();
//           }, false);

//           upArrowEvent = new Event('keyup', {bubbles: true, keyCode: 38});
//           upArrowEvent.keyCode = 38;
//           trigger.dispatchEvent(upArrowEvent);

//         }, false);

//         downArrowEvent = new Event('keyup', {bubbles: true, keyCode: 40});
//         downArrowEvent.keyCode = 40;
//         trigger.dispatchEvent(downArrowEvent);
//       });

//       it('should convert left/right key events to dropDownShow/dropDownHide events', function (done) {
//         var
//           div = document.createElement('div'),
//           dropDown,
//           trigger,
//           leftArrowEvent,
//           rightArrowEvent;

//         div.innerHTML = validDropDownHTML;

//         dropDown = div.querySelectorAll('.drop-down')[0];
//         trigger = dropDown.querySelectorAll('.drop-down__trigger')[0];

//         document.body.appendChild(dropDown);
//         DropDown.enhance(dropDown);

//         dropDown.addEventListener('dropDownShow', function () {

//           dropDown.addEventListener('dropDownHide', function () {
//             expect(1).to.equal(1); // made it here
//             document.body.removeChild(dropDown);
//             done();
//           }, false);

//           leftArrowEvent = new Event('keyup', {bubbles: true, keyCode: 37});
//           leftArrowEvent.keyCode = 37;
//           trigger.dispatchEvent(leftArrowEvent);

//         }, false);

//         rightArrowEvent = new Event('keyup', {bubbles: true, keyCode: 39});
//         rightArrowEvent.keyCode = 39;
//         trigger.dispatchEvent(rightArrowEvent);
//       });

//     });

//     describe('traversing the menu', function () {

//       // there appears to be a bug with testing focus states using mocha in
//       // actual browsers
//       if (window.mochaPhantomJS) {

//         it('should convert up/down key events to dropDownShow/dropDownHide events', function () {
//           var
//             div = document.createElement('div'),
//             dropDown,
//             trigger,
//             firstLink,
//             secondLink,
//             downArrowEvent1,
//             downArrowEvent2,
//             downArrowEvent3,
//             upArrowEvent1,
//             upArrowEvent2,
//             rightArrowEvent1,
//             rightArrowEvent2,
//             leftArrowEvent1,
//             leftArrowEvent2;

//           div.innerHTML = validDropDownHTML;

//           dropDown = div.querySelectorAll('.drop-down')[0];
//           trigger = dropDown.querySelectorAll('.drop-down__trigger')[0];
//           firstLink = dropDown.querySelectorAll('a.drop-down__menu-option-trigger')[0];
//           secondLink = dropDown.querySelectorAll('a.drop-down__menu-option-trigger')[1];

//           document.body.appendChild(dropDown);
//           DropDown.enhance(dropDown);

//           trigger.focus();

//           downArrowEvent1 = new Event('keyup', {bubbles: true, keyCode: 40});
//           downArrowEvent1.keyCode = 40;
//           trigger.dispatchEvent(downArrowEvent1);
//           expect(document.activeElement).to.equal(trigger);

//           downArrowEvent2 = new Event('keyup', {bubbles: true, keyCode: 40});
//           downArrowEvent2.keyCode = 40;
//           trigger.dispatchEvent(downArrowEvent2);
//           expect(document.activeElement).to.equal(firstLink);

//           downArrowEvent3 = new Event('keyup', {bubbles: true, keyCode: 40});
//           downArrowEvent3.keyCode = 40;
//           firstLink.dispatchEvent(downArrowEvent3);
//           expect(document.activeElement).to.equal(secondLink);

//           upArrowEvent1 = new Event('keyup', {bubbles: true, keyCode: 38});
//           upArrowEvent1.keyCode = 38;
//           secondLink.dispatchEvent(upArrowEvent1);
//           expect(document.activeElement).to.equal(firstLink);

//           upArrowEvent2 = new Event('keyup', {bubbles: true, keyCode: 38});
//           upArrowEvent2.keyCode = 38;
//           firstLink.dispatchEvent(upArrowEvent2);
//           expect(document.activeElement).to.equal(trigger);

//           rightArrowEvent1 = new Event('keyup', {bubbles: true, keyCode: 39});
//           rightArrowEvent1.keyCode = 39;
//           trigger.dispatchEvent(rightArrowEvent1);
//           expect(document.activeElement).to.equal(firstLink);

//           rightArrowEvent2 = new Event('keyup', {bubbles: true, keyCode: 39});
//           rightArrowEvent2.keyCode = 39;
//           firstLink.dispatchEvent(rightArrowEvent2);
//           expect(document.activeElement).to.equal(secondLink);

//           leftArrowEvent1 = new Event('keyup', {bubbles: true, keyCode: 37});
//           leftArrowEvent1.keyCode = 37;
//           secondLink.dispatchEvent(leftArrowEvent1);
//           expect(document.activeElement).to.equal(firstLink);

//           leftArrowEvent2 = new Event('keyup', {bubbles: true, keyCode: 37});
//           leftArrowEvent2.keyCode = 37;
//           firstLink.dispatchEvent(leftArrowEvent2);
//           expect(document.activeElement).to.equal(trigger);

//           document.body.removeChild(dropDown);
//         });

//       }

//     });

//     describe('selecting a menu item', function (done) {

//       it('should convert space on a menu item to a dropDownSelect event', function (done) {
//         var
//           div = document.createElement('div'),
//           dropDown,
//           trigger,
//           firstLink,
//           clickEvent,
//           spaceEvent;

//         div.innerHTML = validDropDownHTML;

//         dropDown = div.querySelectorAll('.drop-down')[0];
//         trigger = dropDown.querySelectorAll('.drop-down__trigger')[0];
//         firstLink = dropDown.querySelectorAll('a.drop-down__menu-option-trigger')[0];

//         document.body.appendChild(dropDown);
//         DropDown.enhance(dropDown);

//         dropDown.addEventListener('dropDownShow', function () {

//           dropDown.addEventListener('dropDownSelect', function () {
//             expect(1).to.equal(1); // made it here
//             document.body.removeChild(dropDown);
//             done();
//           }, false);

//           spaceEvent = new Event('keyup', {bubbles: true, keyCode: 32});
//           spaceEvent.keyCode = 32;
//           firstLink.dispatchEvent(spaceEvent);

//         }, false);

//         clickEvent = new Event('click', {bubbles: true});
//         trigger.dispatchEvent(clickEvent);
//       });

//     });

//   });

// });
