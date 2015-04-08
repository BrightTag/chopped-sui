describe('DropDown.build', function () {
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
    }),
    validDropDownHTMLUnbuilt = ChopSuey.templates['drop-down'].render({
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

    it('should return false with no component element', function () {
      expect(DropDown.build()).to.equal(false);
    });

    it('should return false with a bad component element', function () {
      expect(DropDown.build(false)).to.equal(false);
      expect(DropDown.build(true)).to.equal(false);
      expect(DropDown.build(1)).to.equal(false);
      expect(DropDown.build('a')).to.equal(false);
      expect(DropDown.build(document.body)).to.equal(false);
    });

    it('should return false if it can\'t locate the menu or the select', function () {
      var
        div = document.createElement('div'),
        dropDown,
        dropDownMenu,
        dropDownSelect;

      div.innerHTML = validDropDownHTMLUnbuilt;

      dropDown = div.querySelectorAll('.drop-down')[0];
      dropDownMenu = dropDown.querySelectorAll('.drop-down__menu')[0];
      dropDownMenu.parentElement.removeChild(dropDownMenu);

      document.body.appendChild(dropDown);
      expect(DropDown.build(dropDown)).to.equal(false);
      DropDown.destroy(dropDown);
    });

    it('should return true if the dropDown is already built', function () {
      var
        div = document.createElement('div'),
        dropDown;

      div.innerHTML = validDropDownHTML;

      dropDown = div.querySelectorAll('.drop-down')[0];

      document.body.appendChild(dropDown);
      expect(DropDown.build(dropDown)).to.equal(true);
      DropDown.destroy(dropDown);
    });

    it('should return true if it has a good component element and markup and is unbuilt', function () {
      var
        div = document.createElement('div'),
        dropDown;

      div.innerHTML = validDropDownHTML;

      dropDown = div.querySelectorAll('.drop-down')[0];

      document.body.appendChild(dropDown);
      expect(DropDown.build(dropDown)).to.equal(true);
      DropDown.destroy(dropDown);
    });

  });


});
