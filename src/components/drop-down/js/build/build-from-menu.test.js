describe('DropDown.build (from menu)', function () {
  var
    DropDown = ChopSuey.registeredComponents().dropDown,
    validDropDownHTMLFlushLeft = ChopSuey.templates['drop-down'].render({
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
      triggerText: 'menu',
      flushDirection: 'left'
    },
    {
      'drop-down-menu'   : ChopSuey.templates['drop-down-menu'],
      'drop-down-sizer'  : ChopSuey.templates['drop-down-sizer'],
      'drop-down-trigger': ChopSuey.templates['drop-down-trigger'],
    }),
    validDropDownHTMLFlushBoth = ChopSuey.templates['drop-down'].render({
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
      triggerText: 'menu',
      flushDirection: 'both'
    },
    {
      'drop-down-menu'   : ChopSuey.templates['drop-down-menu'],
      'drop-down-sizer'  : ChopSuey.templates['drop-down-sizer'],
      'drop-down-trigger': ChopSuey.templates['drop-down-trigger'],
    }),
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
      triggerText: 'menu'
    },
    {
      'drop-down-menu'   : ChopSuey.templates['drop-down-menu'],
      'drop-down-sizer'  : ChopSuey.templates['drop-down-sizer'],
      'drop-down-trigger': ChopSuey.templates['drop-down-trigger'],
    });

  describe('validation', function () {

    it('should have -1 tabindex applied to links', function () {
      var
        div = document.createElement('div'),
        dropDown,
        menuLinks,
        i;

      div.innerHTML = validDropDownHTML;

      dropDown = div.querySelectorAll('.drop-down')[0];

      document.body.appendChild(dropDown);
      DropDown.build(dropDown);

      menuLinks = dropDown.querySelectorAll('.drop-down__menu a');

      for (i = 0; i < menuLinks.length; i++) {
        expect(menuLinks[i].tabIndex).to.equal(-1);
      }

      DropDown.destroy(dropDown);
    });

    it('should have a sizer constructed from orignal links if flush both', function () {
      var
        div = document.createElement('div'),
        dropDown,
        menuSizer,
        i;

      div.innerHTML = validDropDownHTMLFlushBoth;

      dropDown = div.querySelectorAll('.drop-down')[0];

      document.body.appendChild(dropDown);
      DropDown.build(dropDown);

      menuSizer = dropDown.querySelectorAll('.drop-down__sizer');
      expect(menuSizer.length).to.equal(1);

      DropDown.destroy(dropDown);
    });

    it('should preserve intended flush direction', function () {
      var
        div = document.createElement('div'),
        dropDown,
        trigger,
        i;

      div.innerHTML = validDropDownHTMLFlushLeft;

      dropDown = div.querySelectorAll('.drop-down')[0];

      document.body.appendChild(dropDown);
      DropDown.build(dropDown);

      trigger = dropDown.querySelectorAll('.drop-down__trigger')[0];
      expect(/(^| )drop-down__trigger--left( |$)/.test(trigger.className)).to.equal(true);

      DropDown.destroy(dropDown);
    });

    it('should hide the menu', function () {
      var
        div = document.createElement('div'),
        dropDown,
        menu,
        i;

      div.innerHTML = validDropDownHTMLFlushLeft;

      dropDown = div.querySelectorAll('.drop-down')[0];

      document.body.appendChild(dropDown);
      DropDown.build(dropDown);

      menu = dropDown.querySelectorAll('.drop-down__menu')[0];
      expect(/(^| )drop-down__menu--hidden( |$)/.test(menu.className)).to.equal(true);

      DropDown.destroy(dropDown);
    });

    it('should create a trigger', function () {
      var
        div = document.createElement('div'),
        dropDown,
        trigger,
        i;

      div.innerHTML = validDropDownHTMLFlushLeft;

      dropDown = div.querySelectorAll('.drop-down')[0];

      document.body.appendChild(dropDown);
      DropDown.build(dropDown);

      trigger = dropDown.querySelectorAll('.drop-down__trigger');
      expect(trigger.length).to.equal(1);

      DropDown.destroy(dropDown);
    });

  });

});
