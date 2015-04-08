describe('DropDown.enhance', function () {
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

    it('should return false with no component element', function () {
      expect(DropDown.enhance()).to.equal(false);
    });

    it('should return false with a bad component element', function () {
      expect(DropDown.enhance(false)).to.equal(false);
      expect(DropDown.enhance(true)).to.equal(false);
      expect(DropDown.enhance(1)).to.equal(false);
      expect(DropDown.enhance('a')).to.equal(false);
      expect(DropDown.enhance(document.body)).to.equal(false);
    });

    it('should return false if it can\'t locate the menu', function () {
      var
        div = document.createElement('div'),
        dropDown,
        dropDownMenu;

      div.innerHTML = validDropDownHTML;

      dropDown = div.querySelectorAll('.drop-down')[0];
      dropDownMenu = dropDown.querySelectorAll('.drop-down__menu')[0];
      dropDownMenu.parentElement.removeChild(dropDownMenu);

      document.body.appendChild(dropDown);
      expect(DropDown.enhance(dropDown)).to.equal(false);
      DropDown.destroy(dropDown);
    });

    it('should return false if it can\'t locate the trigger', function () {
      var
        div = document.createElement('div'),
        dropDown,
        dropDownTrigger;

      div.innerHTML = validDropDownHTML;

      dropDown = div.querySelectorAll('.drop-down')[0];
      dropDownTrigger = dropDown.querySelectorAll('.drop-down__trigger')[0];
      dropDownTrigger.parentElement.removeChild(dropDownTrigger);

      document.body.appendChild(dropDown);
      expect(DropDown.enhance(dropDown)).to.equal(false);
      DropDown.destroy(dropDown);
    });

    it('should return true if the dropDown is already enhanced', function (done) {
      var
        div = document.createElement('div'),
        dropDown;

      div.innerHTML = validDropDownHTML;

      dropDown = div.querySelectorAll('.drop-down')[0];

      document.body.appendChild(dropDown);
      expect(DropDown.enhance(dropDown)).to.equal(true);
      expect(DropDown.enhance(dropDown, 'unenhance')).to.equal(true);

      window.setTimeout(function () {
        expect(DropDown.enhance(dropDown)).to.equal(true);
        expect(DropDown.enhance(dropDown, 'unenhance')).to.equal(true);
        DropDown.destroy(dropDown);
        done();
      }, 150);
    });

    it('should return true if the dropDown is unenhanced', function (done) {
      var
        div = document.createElement('div'),
        dropDown;

      div.innerHTML = validDropDownHTML;

      dropDown = div.querySelectorAll('.drop-down')[0];

      document.body.appendChild(dropDown);
      expect(DropDown.enhance(dropDown)).to.equal(true);
      expect(DropDown.enhance(dropDown, 'unenhance')).to.equal(true);

      window.setTimeout(function () {
        expect(DropDown.enhance(dropDown)).to.equal(true);
        expect(DropDown.enhance(dropDown, 'unenhance')).to.equal(true);
        DropDown.destroy(dropDown);
        done();
      }, 150);
    });

    it('should return true if it has a good component element and markup', function () {
      var
        div = document.createElement('div'),
        dropDown;

      div.innerHTML = validDropDownHTML;

      dropDown = div.querySelectorAll('.drop-down')[0];

      document.body.appendChild(dropDown);
      expect(DropDown.enhance(dropDown)).to.equal(true);
      DropDown.destroy(dropDown);
    });

  });

  describe('unenhance', function () {

    it('should return false with no component element', function () {
      expect(DropDown.enhance(undefined, 'unenhance')).to.equal(false);
    });

    it('should return false with a bad component element', function () {
      expect(DropDown.enhance(false, 'unenhance')).to.equal(false);
      expect(DropDown.enhance(true, 'unenhance')).to.equal(false);
      expect(DropDown.enhance(1, 'unenhance')).to.equal(false);
      expect(DropDown.enhance('a', 'unenhance')).to.equal(false);
      expect(DropDown.enhance(document.body, 'unenhance')).to.equal(false);
    });

    it('should return false if it can\'t locate the menu', function () {
      var
        div = document.createElement('div'),
        dropDown,
        dropDownMenu;

      div.innerHTML = validDropDownHTML;

      dropDown = div.querySelectorAll('.drop-down')[0];
      dropDownMenu = dropDown.querySelectorAll('.drop-down__menu')[0];
      dropDownMenu.parentElement.removeChild(dropDownMenu);

      document.body.appendChild(dropDown);
      expect(DropDown.enhance(dropDown, 'unenhance')).to.equal(false);
      DropDown.destroy(dropDown);
    });

    it('should return false if it can\'t locate the trigger', function () {
      var
        div = document.createElement('div'),
        dropDown,
        dropDownTrigger;

      div.innerHTML = validDropDownHTML;

      dropDown = div.querySelectorAll('.drop-down')[0];
      dropDownTrigger = dropDown.querySelectorAll('.drop-down__trigger')[0];
      dropDownTrigger.parentElement.removeChild(dropDownTrigger);

      document.body.appendChild(dropDown);
      expect(DropDown.enhance(dropDown, 'unenhance')).to.equal(false);
      DropDown.destroy(dropDown);
    });

    it('should return true if it has a good component element and markup', function () {
      var
        div = document.createElement('div'),
        dropDown;

      div.innerHTML = validDropDownHTML;

      dropDown = div.querySelectorAll('.drop-down')[0];

      document.body.appendChild(dropDown);
      expect(DropDown.enhance(dropDown, 'unenhance')).to.equal(true);
      DropDown.destroy(dropDown);
    });

  });

});
