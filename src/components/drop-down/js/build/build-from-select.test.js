describe('DropDown.build (from select)', function () {
  var
    DropDown = ChopSuey.registeredComponents().dropDown,
    validDropDownHTML = ChopSuey.templates['drop-down'].render({
      select: true,
      menuItems: [
        {
          value: '1',
          text: 1
        },
        {
          value: '2',
          text: 2
        },
        {
          isSelected: true,
          value: '3',
          text: 3
        }
      ]
    },
    {
      'drop-down-menu'   : ChopSuey.templates['drop-down-menu'],
      'drop-down-sizer'  : ChopSuey.templates['drop-down-sizer'],
      'drop-down-trigger': ChopSuey.templates['drop-down-trigger'],
    });

  describe('validation', function () {

    it('should have a sizer constructed from options', function () {
      var
        div = document.createElement('div'),
        dropDown,
        menuSizer,
        i;

      div.innerHTML = validDropDownHTML;

      dropDown = div.querySelectorAll('.drop-down')[0];

      document.body.appendChild(dropDown);
      DropDown.build(dropDown);

      menuSizer = dropDown.querySelectorAll('.drop-down__sizer');
      expect(menuSizer.length).to.equal(1);

      DropDown.destroy(dropDown);
    });

    it('should have a menu constructed from options', function () {
      var
        div = document.createElement('div'),
        dropDown,
        menu,
        i;

      div.innerHTML = validDropDownHTML;

      dropDown = div.querySelectorAll('.drop-down')[0];

      document.body.appendChild(dropDown);
      DropDown.build(dropDown);

      menu = dropDown.querySelectorAll('.drop-down__menu');
      expect(menu.length).to.equal(1);

      DropDown.destroy(dropDown);
    });

    it('should hide the original select', function () {
      var
        div = document.createElement('div'),
        dropDown,
        select,
        i;

      div.innerHTML = validDropDownHTML;

      dropDown = div.querySelectorAll('.drop-down')[0];

      document.body.appendChild(dropDown);
      DropDown.build(dropDown);

      select = dropDown.querySelectorAll('select')[0];
      expect(/(^| )drop-down__select--hidden( |$)/.test(select.className)).to.equal(true);

      DropDown.destroy(dropDown);
    });

    it('should hide the menu', function () {
      var
        div = document.createElement('div'),
        dropDown,
        menu,
        i;

      div.innerHTML = validDropDownHTML;

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

      div.innerHTML = validDropDownHTML;

      dropDown = div.querySelectorAll('.drop-down')[0];

      document.body.appendChild(dropDown);
      DropDown.build(dropDown);

      trigger = dropDown.querySelectorAll('.drop-down__trigger');
      expect(trigger.length).to.equal(1);

      DropDown.destroy(dropDown);
    });

  });

});
