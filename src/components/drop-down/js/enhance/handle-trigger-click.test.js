describe('DropDown.enhance (click:trigger)', function () {
  var
    DropDown = ChopSuey.registeredComponents().dropDown,
    validDropDownHTML = ChopSuey.templates['drop-down'].render({
      menu: true,
      menuItems: [
        {
          link: '#1',
          text: 1
        },
        {
          link: '#1',
          text: 2
        },
        {
          link: '#1',
          text: 3
        }
      ],
      build: true,
      triggerText: 'menu'
    },
    {
      'drop-down-menu'   : ChopSuey.templates['drop-down-menu'],
      'drop-down-sizer'  : ChopSuey.templates['drop-down-sizer'],
      'drop-down-trigger': ChopSuey.templates['drop-down-trigger'],
    });

  describe('validation', function () {

    it('should convert trigger click events to dropDownShow/dropDownHide events', function (done) {
      var
        div = document.createElement('div'),
        dropDown,
        trigger,
        clickTriggerEvent;

      div.innerHTML = validDropDownHTML;

      dropDown = div.querySelectorAll('.drop-down')[0];
      trigger = dropDown.querySelectorAll('.drop-down__trigger')[0];

      document.body.appendChild(dropDown);
      DropDown.enhance(dropDown);

      dropDown.addEventListener('dropDownShow', function () {

        dropDown.addEventListener('dropDownHide', function () {

          expect(1).to.equal(1); // made it here
          document.body.removeChild(dropDown);
          done();
        }, false);

        clickTriggerEvent = new Event('click', {bubbles: true});
        trigger.dispatchEvent(clickTriggerEvent);

      }, false);

      clickTriggerEvent = new Event('click', {bubbles: true});
      trigger.dispatchEvent(clickTriggerEvent);
    });

  });

  describe('unenhance', function () {

    it('should no longer convert trigger click events to dropDownShow/dropDownHide events', function () {
      var
        div = document.createElement('div'),
        dropDown,
        trigger,
        clickTriggerEvent,
        hideCount = 0,
        showCount = 0;

      div.innerHTML = validDropDownHTML;

      dropDown = div.querySelectorAll('.drop-down')[0];
      trigger = dropDown.querySelectorAll('.drop-down__trigger')[0];

      document.body.appendChild(dropDown);
      DropDown.enhance(dropDown);

      dropDown.addEventListener('dropDownHide', function () {
        hideCount++;
      }, false);

      dropDown.addEventListener('dropDownShow', function () {
        showCount++;
      }, false);

      clickTriggerEvent = new Event('click', {bubbles: true});
      trigger.dispatchEvent(clickTriggerEvent);

      clickTriggerEvent = new Event('click', {bubbles: true});
      trigger.dispatchEvent(clickTriggerEvent);

      DropDown.enhance(dropDown, 'unenhance');

      clickTriggerEvent = new Event('click', {bubbles: true});
      trigger.dispatchEvent(clickTriggerEvent);

      clickTriggerEvent = new Event('click', {bubbles: true});
      trigger.dispatchEvent(clickTriggerEvent);

      expect(hideCount).to.equal(1);
      expect(showCount).to.equal(1);
      document.body.removeChild(dropDown);
    });

  });

});
