describe('DropDown.enhance (click:menu)', function () {
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

    it('should convert menu click events to dropDownSelect events', function (done) {
      var
        div = document.createElement('div'),
        dropDown,
        menuLink,
        clickMenuEvent;

      div.innerHTML = validDropDownHTML;

      dropDown = div.querySelectorAll('.drop-down')[0];
      menuLink = dropDown.querySelectorAll('.drop-down__menu a')[0];

      document.body.appendChild(dropDown);
      DropDown.enhance(dropDown);

      dropDown.addEventListener('dropDownDidSelect', function () {
        expect(1).to.equal(1); // made it here
        dropDown.removeEventListener('dropDownSelect');
        DropDown.destroy(dropDown);
        done();
      }, false);

      clickMenuEvent = new Event('click', {bubbles: true});
      menuLink.dispatchEvent(clickMenuEvent);
    });

  });

  describe('unenhance', function () {

    it('should no longer convert menu click events to dropDownSelect events', function () {
      var
        div = document.createElement('div'),
        dropDown,
        menuLink,
        clickMenuEvent,
        selectCount = 0;

      div.innerHTML = validDropDownHTML;

      dropDown = div.querySelectorAll('.drop-down')[0];
      menuLink = dropDown.querySelectorAll('.drop-down__menu a')[0];

      document.body.appendChild(dropDown);
      DropDown.enhance(dropDown);

      dropDown.addEventListener('dropDownDidSelect', function () {
        selectCount++;
      }, false);

      clickMenuEvent = new Event('click', {bubbles: true});
      menuLink.dispatchEvent(clickMenuEvent);

      DropDown.enhance(dropDown, 'unenhance');

      clickMenuEvent = new Event('click', {bubbles: true});
      menuLink.dispatchEvent(clickMenuEvent);

      expect(selectCount).to.equal(1);

      dropDown.removeEventListener('dropDownSelect');
      DropDown.destroy(dropDown);
    });

  });

});
