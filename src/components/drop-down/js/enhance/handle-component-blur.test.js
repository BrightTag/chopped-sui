describe('DropDown.enhance (keydown:dropDown)', function () {
  var
    DropDown = ChopSuey.registeredComponents().dropDown,
    handleComponentKeydown = ChopSuey._private.Dropdown.handleComponentKeydown,
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

    it('should close an open menu when bluring', function (done) {
      var
        div = document.createElement('div'),
        dropDown,
        menu,
        trigger,
        showEvent,
        focusEvent,
        blurEvent;

      div.innerHTML = validDropDownHTML;

      dropDown = div.querySelectorAll('.drop-down')[0];
      trigger = dropDown.querySelectorAll('.drop-down__trigger')[0];
      menu = dropDown.querySelectorAll('.drop-down__menu')[0];

      document.body.appendChild(dropDown);
      DropDown.enhance(dropDown);

      dropDown.addEventListener('dropDownDidShow', function () {

        expect(/(^| )drop-down__menu--hidden( |$)/.test(menu.className)).to.equal(false);

        dropDown.addEventListener('blur', function () {

          window.setTimeout(function () {
            expect(/(^| )drop-down__menu--hidden( |$)/.test(menu.className)).to.equal(true);
            dropDown.removeEventListener('dropDownDidShow');
            dropDown.removeEventListener('blur');
            DropDown.destroy(dropDown);
            done();
          }, 100);

        }, true);

        trigger.focus();
        trigger.blur();

      }, false);

      clickEvent = new Event('click', {bubbles: true});
      trigger.dispatchEvent(clickEvent);

    });

  });

});
