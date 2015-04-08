describe('ChopSuey Accordion.enhance', function () {

});

describe('ChopSuey Accordion', function () {

});

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

describe('DropDown', function () {
  var DropDown = ChopSuey.registeredComponents().dropDown;

  describe('component', function () {

    it('should be an object', function () {
      expect(DropDown).to.be.an('object');
    });

  });

  describe('property', function () {

    it('should have a componentType of "dropDown"', function () {
      expect(DropDown.componentType).to.equal('dropDown');
    });

    it('should have a componentClass of "drop-down"', function () {
      expect(DropDown.componentClass).to.equal('drop-down');
    });

  });

  describe('methods', function () {

    it('should have a build method', function () {
      expect(DropDown).to.respondTo('build');
      expect(DropDown.build).to.be.a('function');
    });

    it('should have an didBuild method', function () {
      expect(DropDown).to.respondTo('didBuild');
      expect(DropDown.didBuild).to.be.a('function');
    });

    it('should have a willBuild method', function () {
      expect(DropDown).to.respondTo('willBuild');
      expect(DropDown.willBuild).to.be.a('function');
    });

    it('should have a destroy method', function () {
      expect(DropDown).to.respondTo('destroy');
      expect(DropDown.destroy).to.be.a('function');
    });

    it('should have a didDestroy method', function () {
      expect(DropDown).to.respondTo('didDestroy');
      expect(DropDown.didDestroy).to.be.a('function');
    });

    it('should have a willDestroy method', function () {
      expect(DropDown).to.respondTo('willDestroy');
      expect(DropDown.willDestroy).to.be.a('function');
    });

    it('should have a enhance method', function () {
      expect(DropDown).to.respondTo('enhance');
      expect(DropDown.enhance).to.be.a('function');
    });

    it('should have a didEnhance method', function () {
      expect(DropDown).to.respondTo('didEnhance');
      expect(DropDown.didEnhance).to.be.a('function');
    });

    it('should have a willEnhance method', function () {
      expect(DropDown).to.respondTo('willEnhance');
      expect(DropDown.willEnhance).to.be.a('function');
    });

    it('should have an initialize method', function () {
      expect(DropDown).to.respondTo('initialize');
      expect(DropDown.initialize).to.be.a('function');
    });

  });

});

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

    it('should return false for any arrow keydown', function () {
      var
        downArrowEvent,
        upArrowEvent,
        leftArrowEvent,
        rightArrowEvent;

      downArrowEvent = new Event('keydown', {bubbles: true, keyCode: 40});
      downArrowEvent.keyCode = 40;
      expect(handleComponentKeydown(downArrowEvent)).to.equal(false);

      upArrowEvent = new Event('keydown', {bubbles: true, keyCode: 38});
      upArrowEvent.keyCode = 38;
      expect(handleComponentKeydown(upArrowEvent)).to.equal(false);

      rightArrowEvent = new Event('keydown', {bubbles: true, keyCode: 39});
      rightArrowEvent.keyCode = 39;
      expect(handleComponentKeydown(rightArrowEvent)).to.equal(false);

      leftArrowEvent = new Event('keydown', {bubbles: true, keyCode: 37});
      leftArrowEvent.keyCode = 37;
      expect(handleComponentKeydown(leftArrowEvent)).to.equal(false);
    });

    it('should return true for any other keydown', function () {
      var nonArrowEvent;

      nonArrowEvent = new Event('keydown', {bubbles: true, keyCode: 100});
      nonArrowEvent.keyCode = 100;
      expect(handleComponentKeydown(nonArrowEvent)).to.equal(true);

    });

  });

});

describe('DropDown.enhance (keyup:dropDown)', function () {
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

    describe('opening and closing the menu', function () {

      it('should convert up/down key events to dropDownShow/dropDownHide events', function (done) {
        var
          div = document.createElement('div'),
          dropDown,
          trigger,
          upArrowEvent,
          downArrowEvent;

        div.innerHTML = validDropDownHTML;

        dropDown = div.querySelectorAll('.drop-down')[0];
        trigger = dropDown.querySelectorAll('.drop-down__trigger')[0];

        document.body.appendChild(dropDown);
        DropDown.enhance(dropDown);

        dropDown.addEventListener('dropDownDidShow', function () {

          dropDown.addEventListener('dropDownDidHide', function () {
            expect(1).to.equal(1); // made it here
            dropDown.removeEventListener('dropDownDidShow');
            dropDown.removeEventListener('dropDownDidHide');
            DropDown.destroy(dropDown);
            done();
          }, false);

          upArrowEvent = new Event('keyup', {bubbles: true, keyCode: 38});
          upArrowEvent.keyCode = 38;
          trigger.dispatchEvent(upArrowEvent);

        }, false);

        downArrowEvent = new Event('keyup', {bubbles: true, keyCode: 40});
        downArrowEvent.keyCode = 40;
        trigger.dispatchEvent(downArrowEvent);
      });

      it('should convert left/right key events to dropDownShow/dropDownHide events', function (done) {
        var
          div = document.createElement('div'),
          dropDown,
          trigger,
          leftArrowEvent,
          rightArrowEvent;

        div.innerHTML = validDropDownHTML;

        dropDown = div.querySelectorAll('.drop-down')[0];
        trigger = dropDown.querySelectorAll('.drop-down__trigger')[0];

        document.body.appendChild(dropDown);
        DropDown.enhance(dropDown);

        dropDown.addEventListener('dropDownDidShow', function () {

          dropDown.addEventListener('dropDownDidHide', function () {
            expect(1).to.equal(1); // made it here
            dropDown.removeEventListener('dropDownDidShow');
            dropDown.removeEventListener('dropDownDidHide');
            DropDown.destroy(dropDown);
            done();
          }, false);

          leftArrowEvent = new Event('keyup', {bubbles: true, keyCode: 37});
          leftArrowEvent.keyCode = 37;
          trigger.dispatchEvent(leftArrowEvent);

        }, false);

        rightArrowEvent = new Event('keyup', {bubbles: true, keyCode: 39});
        rightArrowEvent.keyCode = 39;
        trigger.dispatchEvent(rightArrowEvent);
      });

    });

    describe('traversing the menu', function () {

      // there appears to be a bug with testing focus states using mocha in
      // actual browsers
      if (window.mochaPhantomJS) {

        it('should convert up/down key events to dropDownShow/dropDownHide events', function () {
          var
            div = document.createElement('div'),
            dropDown,
            trigger,
            firstLink,
            secondLink,
            downArrowEvent1,
            downArrowEvent2,
            downArrowEvent3,
            upArrowEvent1,
            upArrowEvent2,
            rightArrowEvent1,
            rightArrowEvent2,
            leftArrowEvent1,
            leftArrowEvent2;

          div.innerHTML = validDropDownHTML;

          dropDown = div.querySelectorAll('.drop-down')[0];
          trigger = dropDown.querySelectorAll('.drop-down__trigger')[0];
          firstLink = dropDown.querySelectorAll('a.drop-down__menu-option-trigger')[0];
          secondLink = dropDown.querySelectorAll('a.drop-down__menu-option-trigger')[1];

          document.body.appendChild(dropDown);
          DropDown.enhance(dropDown);

          trigger.focus();

          downArrowEvent1 = new Event('keyup', {bubbles: true, keyCode: 40});
          downArrowEvent1.keyCode = 40;
          trigger.dispatchEvent(downArrowEvent1);
          expect(document.activeElement).to.equal(trigger);

          downArrowEvent2 = new Event('keyup', {bubbles: true, keyCode: 40});
          downArrowEvent2.keyCode = 40;
          trigger.dispatchEvent(downArrowEvent2);
          expect(document.activeElement).to.equal(firstLink);

          downArrowEvent3 = new Event('keyup', {bubbles: true, keyCode: 40});
          downArrowEvent3.keyCode = 40;
          firstLink.dispatchEvent(downArrowEvent3);
          expect(document.activeElement).to.equal(secondLink);

          upArrowEvent1 = new Event('keyup', {bubbles: true, keyCode: 38});
          upArrowEvent1.keyCode = 38;
          secondLink.dispatchEvent(upArrowEvent1);
          expect(document.activeElement).to.equal(firstLink);

          upArrowEvent2 = new Event('keyup', {bubbles: true, keyCode: 38});
          upArrowEvent2.keyCode = 38;
          firstLink.dispatchEvent(upArrowEvent2);
          expect(document.activeElement).to.equal(trigger);

          rightArrowEvent1 = new Event('keyup', {bubbles: true, keyCode: 39});
          rightArrowEvent1.keyCode = 39;
          trigger.dispatchEvent(rightArrowEvent1);
          expect(document.activeElement).to.equal(firstLink);

          rightArrowEvent2 = new Event('keyup', {bubbles: true, keyCode: 39});
          rightArrowEvent2.keyCode = 39;
          firstLink.dispatchEvent(rightArrowEvent2);
          expect(document.activeElement).to.equal(secondLink);

          leftArrowEvent1 = new Event('keyup', {bubbles: true, keyCode: 37});
          leftArrowEvent1.keyCode = 37;
          secondLink.dispatchEvent(leftArrowEvent1);
          expect(document.activeElement).to.equal(firstLink);

          leftArrowEvent2 = new Event('keyup', {bubbles: true, keyCode: 37});
          leftArrowEvent2.keyCode = 37;
          firstLink.dispatchEvent(leftArrowEvent2);
          expect(document.activeElement).to.equal(trigger);

          DropDown.destroy(dropDown);
        });

      }

    });

    describe('selecting a menu item', function (done) {

      it('should convert space on a menu item to a dropDownSelect event', function (done) {
        var
          div = document.createElement('div'),
          dropDown,
          trigger,
          firstLink,
          clickEvent,
          spaceEvent;

        div.innerHTML = validDropDownHTML;

        dropDown = div.querySelectorAll('.drop-down')[0];
        trigger = dropDown.querySelectorAll('.drop-down__trigger')[0];
        firstLink = dropDown.querySelectorAll('a.drop-down__menu-option-trigger')[0];

        document.body.appendChild(dropDown);
        DropDown.enhance(dropDown);

        dropDown.addEventListener('dropDownDidShow', function () {

          dropDown.addEventListener('dropDownDidSelect', function () {
            expect(1).to.equal(1); // made it here
            dropDown.removeEventListener('dropDownDidShow');
            dropDown.removeEventListener('dropDownDidSelect');
            DropDown.destroy(dropDown);
            done();
          }, false);

          spaceEvent = new Event('keyup', {bubbles: true, keyCode: 32});
          spaceEvent.keyCode = 32;
          firstLink.dispatchEvent(spaceEvent);

        }, false);

        clickEvent = new Event('click', {bubbles: true});
        trigger.dispatchEvent(clickEvent);
      });

    });

  });

});

describe('DropDown.enhance (dropDownHide:dropDown)', function () {
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

    describe('hiding the menu', function () {

      describe('an open menu', function () {

        it('should start visible', function (done) {
          var
            div = document.createElement('div'),
            dropDown,
            trigger,
            menu,
            clickEvent;

          div.innerHTML = validDropDownHTML;

          dropDown = div.querySelectorAll('.drop-down')[0];
          menu = dropDown.querySelectorAll('.drop-down__menu')[0];
          trigger = dropDown.querySelectorAll('.drop-down__trigger')[0];

          document.body.appendChild(dropDown);
          DropDown.enhance(dropDown);

          trigger.addEventListener('click', function () {
            expect(window.getComputedStyle(menu, null)['visibility']).to.equal('visible');
            trigger.removeEventListener('click');
            DropDown.destroy(dropDown);
            done();
          }, false);

          clickEvent = new Event('click', { 'bubbles': true });
          trigger.dispatchEvent(clickEvent);
        });

        it('should be visible on dropDownWillHide', function (done) {
          var
            div = document.createElement('div'),
            dropDown,
            trigger,
            menu,
            clickEvent,
            dropDownHideEvent;

          div.innerHTML = validDropDownHTML;

          dropDown = div.querySelectorAll('.drop-down')[0];
          menu = dropDown.querySelectorAll('.drop-down__menu')[0];
          trigger = dropDown.querySelectorAll('.drop-down__trigger')[0];

          document.body.appendChild(dropDown);
          DropDown.enhance(dropDown);

          trigger.addEventListener('click', function () {
            expect(window.getComputedStyle(menu, null)['visibility']).to.equal('visible');

            dropDown.addEventListener('dropDownWillHide', function () {
              expect(window.getComputedStyle(menu, null)['visibility']).to.equal('visible');
              trigger.removeEventListener('click');
              dropDown.removeEventListener('dropDownWillHide');
              DropDown.destroy(dropDown);
              done();
            }, false);

            dropDownHideEvent = new CustomEvent(
              'dropDownHide',
              {
                'bubbles': true
              }
            );
            dropDown.dispatchEvent(dropDownHideEvent);
          }, false);

          clickEvent = new Event('click', { 'bubbles': true });
          trigger.dispatchEvent(clickEvent);
        });

        it('should be hidden on dropDownDidHide', function (done) {
          var
            div = document.createElement('div'),
            dropDown,
            trigger,
            menu,
            clickEvent,
            dropDownHideEvent;

          div.innerHTML = validDropDownHTML;

          dropDown = div.querySelectorAll('.drop-down')[0];
          menu = dropDown.querySelectorAll('.drop-down__menu')[0];
          trigger = dropDown.querySelectorAll('.drop-down__trigger')[0];

          document.body.appendChild(dropDown);
          DropDown.enhance(dropDown);

          trigger.addEventListener('click', function () {
            expect(window.getComputedStyle(menu, null)['visibility']).to.equal('visible');

            dropDown.addEventListener('dropDownDidHide', function () {
              expect(window.getComputedStyle(menu, null)['visibility']).to.equal('hidden');
              trigger.removeEventListener('click');
              dropDown.removeEventListener('dropDownDidHide');
              DropDown.destroy(dropDown);
              done();
            }, false);

            dropDownHideEvent = new CustomEvent(
              'dropDownHide',
              {
                'bubbles': true
              }
            );
            dropDown.dispatchEvent(dropDownHideEvent);
          }, false);

          clickEvent = new Event('click', { 'bubbles': true });
          trigger.dispatchEvent(clickEvent);
        });

      });

      describe('a closed menu', function () {

        it('should start hidden', function () {
          var
            div = document.createElement('div'),
            dropDown,
            menu;

          div.innerHTML = validDropDownHTML;

          dropDown = div.querySelectorAll('.drop-down')[0];
          menu = dropDown.querySelectorAll('.drop-down__menu')[0];

          document.body.appendChild(dropDown);
          DropDown.enhance(dropDown);

          expect(window.getComputedStyle(menu, null)['visibility']).to.equal('hidden');

          DropDown.destroy(dropDown);
        });

        it('should be hidden on dropDownWillHide', function (done) {
          var
            div = document.createElement('div'),
            dropDown,
            trigger,
            menu,
            dropDownHideEvent;

          div.innerHTML = validDropDownHTML;

          dropDown = div.querySelectorAll('.drop-down')[0];
          menu = dropDown.querySelectorAll('.drop-down__menu')[0];
          trigger = dropDown.querySelectorAll('.drop-down__trigger')[0];

          document.body.appendChild(dropDown);
          DropDown.enhance(dropDown);

          dropDown.addEventListener('dropDownWillHide', function () {
            expect(window.getComputedStyle(menu, null)['visibility']).to.equal('hidden');
            dropDown.removeEventListener('dropDownWillHide');
            DropDown.destroy(dropDown);
            done();
          }, false);

          dropDownHideEvent = new CustomEvent(
            'dropDownHide',
            {
              'bubbles': true
            }
          );
          dropDown.dispatchEvent(dropDownHideEvent);
        });

        it('should be hidden on dropDownDidHide', function (done) {
          var
            div = document.createElement('div'),
            dropDown,
            trigger,
            menu,
            dropDownHideEvent;

          div.innerHTML = validDropDownHTML;

          dropDown = div.querySelectorAll('.drop-down')[0];
          menu = dropDown.querySelectorAll('.drop-down__menu')[0];
          trigger = dropDown.querySelectorAll('.drop-down__trigger')[0];

          document.body.appendChild(dropDown);
          DropDown.enhance(dropDown);

          dropDown.addEventListener('dropDownDidHide', function () {
            expect(window.getComputedStyle(menu, null)['visibility']).to.equal('hidden');
            dropDown.removeEventListener('dropDownDidHide');
            DropDown.destroy(dropDown);
            done();
          }, false);

          dropDownHideEvent = new CustomEvent(
            'dropDownHide',
            {
              'bubbles': true
            }
          );
          dropDown.dispatchEvent(dropDownHideEvent);
        });

      });

    });

  });

  describe('unenhance', function () {

    it('should no longer respond to dropDownHide events', function () {
      var
        div = document.createElement('div'),
        dropDown,
        menuLink,
        hideEvent,
        hideCount = 0;

      div.innerHTML = validDropDownHTML;

      dropDown = div.querySelectorAll('.drop-down')[0];

      document.body.appendChild(dropDown);
      DropDown.enhance(dropDown);

      dropDown.addEventListener('dropDownDidHide', function () {
        hideCount++;
      }, false);

      hideEvent = new CustomEvent('dropDownHide', {bubbles: true});
      dropDown.dispatchEvent(hideEvent);

      DropDown.enhance(dropDown, 'unenhance');

      hideEvent = new CustomEvent('dropDownHide', {bubbles: true});
      dropDown.dispatchEvent(hideEvent);

      expect(hideCount).to.equal(1);

      dropDown.removeEventListener('dropDownDidHide');
      DropDown.destroy(dropDown);
    });

  });

});

describe('DropDown.enhance (dropDownSelect:dropDown)', function () {
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
    validDropDownHTMLFixed = ChopSuey.templates['drop-down'].render({
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
      triggerText: 'menu',
      fixedTrigger: true
    },
    {
      'drop-down-menu'   : ChopSuey.templates['drop-down-menu'],
      'drop-down-sizer'  : ChopSuey.templates['drop-down-sizer'],
      'drop-down-trigger': ChopSuey.templates['drop-down-trigger'],
    }),
    validDropDownHTMLSelect = ChopSuey.templates['drop-down'].render({
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
          isCurrent: true,
          value: '3',
          text: 3
        }
      ],
      build: true,
      selectId: 'select1',
      selectName: 'select1'
    },
    {
      'drop-down-menu'   : ChopSuey.templates['drop-down-menu'],
      'drop-down-sizer'  : ChopSuey.templates['drop-down-sizer'],
      'drop-down-trigger': ChopSuey.templates['drop-down-trigger'],
    }),
    validDropDownHTMLSelectHidden = ChopSuey.templates['drop-down'].render({
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
          isCurrent: true,
          value: '3',
          text: 3
        }
      ],
      build: true,
      selectId: 'select1',
      selectName: 'select1',
      hideCurrent: true
    },
    {
      'drop-down-menu'   : ChopSuey.templates['drop-down-menu'],
      'drop-down-sizer'  : ChopSuey.templates['drop-down-sizer'],
      'drop-down-trigger': ChopSuey.templates['drop-down-trigger'],
    });

  describe('validation', function () {

    describe('selecting an item', function () {

      describe('a non-fixed trigger', function () {

        it('should start with triggerText', function () {
          var
            div = document.createElement('div'),
            dropDown,
            trigger;

          div.innerHTML = validDropDownHTML;

          dropDown = div.querySelectorAll('.drop-down')[0];
          trigger = dropDown.querySelectorAll('.drop-down__trigger')[0];

          document.body.appendChild(dropDown);
          DropDown.enhance(dropDown);

          expect(trigger.innerText.replace(/^\s*/,'').replace(/\s*$/,'')).to.equal('MENU');
          DropDown.destroy(dropDown);
        });

        it('should be triggerText on dropDownWillSelect', function (done) {
          var
            div = document.createElement('div'),
            dropDown,
            trigger,
            menuLink,
            selectEvent;

          div.innerHTML = validDropDownHTML;

          dropDown = div.querySelectorAll('.drop-down')[0];
          menuLink = dropDown.querySelectorAll('.drop-down__menu a')[0];
          trigger = dropDown.querySelectorAll('.drop-down__trigger')[0];

          document.body.appendChild(dropDown);
          DropDown.enhance(dropDown);

          dropDown.addEventListener('dropDownWillSelect', function () {
            expect(trigger.innerText.replace(/^\s*/,'').replace(/\s*$/,'')).to.equal('MENU');
            dropDown.removeEventListener('dropDownWillSelect');
            DropDown.destroy(dropDown);
            done();
          }, false);

          selectEvent = new CustomEvent('dropDownSelect',
            {
              bubbles: true,
              detail: {
                select: menuLink
              }
            }
          );
          dropDown.dispatchEvent(selectEvent);
        });

        it('should be selected on dropDownDidSelect', function (done) {
          var
            div = document.createElement('div'),
            dropDown,
            trigger,
            menuLink,
            selectEvent,
            showEvent;

          div.innerHTML = validDropDownHTML;

          dropDown = div.querySelectorAll('.drop-down')[0];
          menuLink = dropDown.querySelectorAll('.drop-down__menu a')[0];
          trigger = dropDown.querySelectorAll('.drop-down__trigger')[0];

          document.body.appendChild(dropDown);
          DropDown.enhance(dropDown);

          dropDown.addEventListener('dropDownDidSelect', function () {

            dropDown.addEventListener('dropDownDidShow', function () {
              expect(trigger.innerText.replace(/^\s*/,'').replace(/\s*$/,'')).to.equal(menuLink.innerText.replace(/^\s*/,'').replace(/\s*$/,''));
              dropDown.removeEventListener('dropDownDidSelect');
              dropDown.removeEventListener('dropDownDidShow');
              DropDown.destroy(dropDown);
              done();
            }, false);

            showEvent = new CustomEvent('dropDownShow', { bubbles: true });
            dropDown.dispatchEvent(showEvent);
          }, false);

          selectEvent = new CustomEvent('dropDownSelect',
            {
              bubbles: true,
              detail: {
                select: menuLink
              }
            }
          );
          dropDown.dispatchEvent(selectEvent);
        });

      });

      describe('a fixed trigger', function () {

        it('should start with triggerText', function () {
          var
            div = document.createElement('div'),
            dropDown,
            trigger;

          div.innerHTML = validDropDownHTMLFixed;

          dropDown = div.querySelectorAll('.drop-down')[0];
          trigger = dropDown.querySelectorAll('.drop-down__trigger')[0];

          document.body.appendChild(dropDown);
          DropDown.enhance(dropDown);

          expect(trigger.innerText.replace(/^\s*/,'').replace(/\s*$/,'')).to.equal('MENU');
          DropDown.destroy(dropDown);
        });

        it('should be triggerText on dropDownWillSelect', function (done) {
          var
            div = document.createElement('div'),
            dropDown,
            trigger,
            menuLink,
            selectEvent;

          div.innerHTML = validDropDownHTMLFixed;

          dropDown = div.querySelectorAll('.drop-down')[0];
          menuLink = dropDown.querySelectorAll('.drop-down__menu a')[0];
          trigger = dropDown.querySelectorAll('.drop-down__trigger')[0];

          document.body.appendChild(dropDown);
          DropDown.enhance(dropDown);

          dropDown.addEventListener('dropDownWillSelect', function () {
            expect(trigger.innerText.replace(/^\s*/,'').replace(/\s*$/,'')).to.equal('MENU');
            dropDown.removeEventListener('dropDownWillSelect');
            DropDown.destroy(dropDown);
            done();
          }, false);

          selectEvent = new CustomEvent('dropDownSelect',
            {
              bubbles: true,
              detail: {
                select: menuLink
              }
            }
          );
          dropDown.dispatchEvent(selectEvent);
        });

        it('should be triggerText on dropDownDidSelect', function (done) {
          var
            div = document.createElement('div'),
            dropDown,
            trigger,
            menuLink,
            selectEvent,
            showEvent;

          div.innerHTML = validDropDownHTMLFixed;

          dropDown = div.querySelectorAll('.drop-down')[0];
          menuLink = dropDown.querySelectorAll('.drop-down__menu a')[0];
          trigger = dropDown.querySelectorAll('.drop-down__trigger')[0];

          document.body.appendChild(dropDown);
          DropDown.enhance(dropDown);

          dropDown.addEventListener('dropDownDidSelect', function () {

            dropDown.addEventListener('dropDownDidShow', function () {
              expect(trigger.innerText.replace(/^\s*/,'').replace(/\s*$/,'')).to.equal('MENU');
              dropDown.removeEventListener('dropDownDidSelect');
              dropDown.removeEventListener('dropDownDidShow');
              DropDown.destroy(dropDown);
              done();
            }, false);

            showEvent = new CustomEvent('dropDownShow', { bubbles: true });
            dropDown.dispatchEvent(showEvent);
          }, false);

          selectEvent = new CustomEvent('dropDownSelect',
            {
              bubbles: true,
              detail: {
                select: menuLink
              }
            }
          );
          dropDown.dispatchEvent(selectEvent);
        });

      });

      describe('a non-hide-selected trigger', function () {

        it('should start with initially selected', function () {
          var
            div = document.createElement('div'),
            dropDown,
            trigger;

          div.innerHTML = validDropDownHTMLSelect;

          dropDown = div.querySelectorAll('.drop-down')[0];

          document.body.appendChild(dropDown);
          DropDown.enhance(dropDown);

          trigger = dropDown.querySelectorAll('.drop-down__trigger')[0];

          expect(trigger.innerText.replace(/^\s*/,'').replace(/\s*$/,'')).to.equal('3');
          DropDown.destroy(dropDown);
        });

        it('should have the initially selected option visible', function () {
          var
            div = document.createElement('div'),
            dropDown,
            hiddenMenuItem;

          div.innerHTML = validDropDownHTMLSelect;

          dropDown = div.querySelectorAll('.drop-down')[0];

          document.body.appendChild(dropDown);
          DropDown.enhance(dropDown);

          hiddenMenuItem = dropDown.querySelectorAll('.drop-down__menu .drop-down__menu-option--hidden')[0];

          expect(hiddenMenuItem).to.equal(undefined);
          DropDown.destroy(dropDown);
        });

        it('should be initially selected on dropDownWillSelect', function (done) {
          var
            div = document.createElement('div'),
            dropDown,
            trigger,
            menuLink,
            selectEvent;

          div.innerHTML = validDropDownHTMLSelect;

          dropDown = div.querySelectorAll('.drop-down')[0];
          menuLink = dropDown.querySelectorAll('.drop-down__menu a')[0];

          document.body.appendChild(dropDown);
          DropDown.enhance(dropDown);

          trigger = dropDown.querySelectorAll('.drop-down__trigger')[0];

          dropDown.addEventListener('dropDownWillSelect', function () {
            expect(trigger.innerText.replace(/^\s*/,'').replace(/\s*$/,'')).to.equal('3');
            dropDown.removeEventListener('dropDownWillSelect');
            DropDown.destroy(dropDown);
            done();
          }, false);

          selectEvent = new CustomEvent('dropDownSelect',
            {
              bubbles: true,
              detail: {
                select: menuLink
              }
            }
          );
          dropDown.dispatchEvent(selectEvent);
        });

        it('should be selected on dropDownDidSelect', function (done) {
          var
            div = document.createElement('div'),
            dropDown,
            trigger,
            menuLink,
            selectEvent,
            showEvent;

          div.innerHTML = validDropDownHTMLSelect;

          dropDown = div.querySelectorAll('.drop-down')[0];
          menuLink = dropDown.querySelectorAll('.drop-down__menu a')[0];

          document.body.appendChild(dropDown);
          DropDown.enhance(dropDown);

          trigger = dropDown.querySelectorAll('.drop-down__trigger')[0];

          dropDown.addEventListener('dropDownDidSelect', function () {

            dropDown.addEventListener('dropDownDidShow', function () {
              expect(trigger.innerText.replace(/^\s*/,'').replace(/\s*$/,'')).to.equal(menuLink.innerText.replace(/^\s*/,'').replace(/\s*$/,''));
              dropDown.removeEventListener('dropDownDidSelect');
              dropDown.removeEventListener('dropDownDidShow');
              DropDown.destroy(dropDown);
              done();
            }, false);

            showEvent = new CustomEvent('dropDownShow', { bubbles: true });
            dropDown.dispatchEvent(showEvent);
          }, false);

          selectEvent = new CustomEvent('dropDownSelect',
            {
              bubbles: true,
              detail: {
                select: menuLink
              }
            }
          );
          dropDown.dispatchEvent(selectEvent);
        });

        it('should have the newly selected option visible', function (done) {
          var
            div = document.createElement('div'),
            dropDown,
            trigger,
            menuLink,
            selectEvent,
            showEvent,
            hiddenMenuItem;

          div.innerHTML = validDropDownHTML;

          dropDown = div.querySelectorAll('.drop-down')[0];
          menuLink = dropDown.querySelectorAll('.drop-down__menu a')[0];

          document.body.appendChild(dropDown);
          DropDown.enhance(dropDown);

          trigger = dropDown.querySelectorAll('.drop-down__trigger')[0];

          dropDown.addEventListener('dropDownDidSelect', function () {

            dropDown.addEventListener('dropDownDidShow', function () {
              hiddenMenuItem = dropDown.querySelectorAll('.drop-down__menu .drop-down__menu-option--hidden')[0];
              expect(hiddenMenuItem).to.equal(undefined);
              dropDown.removeEventListener('dropDownDidSelect');
              dropDown.removeEventListener('dropDownDidShow');
              DropDown.destroy(dropDown);
              done();
            }, false);

            showEvent = new CustomEvent('dropDownShow', { bubbles: true });
            dropDown.dispatchEvent(showEvent);
          }, false);

          selectEvent = new CustomEvent('dropDownSelect',
            {
              bubbles: true,
              detail: {
                select: menuLink
              }
            }
          );
          dropDown.dispatchEvent(selectEvent);
        });

      });

      describe('a hide-selected trigger', function () {

        it('should start with initially selected', function () {
          var
            div = document.createElement('div'),
            dropDown,
            trigger;

          div.innerHTML = validDropDownHTMLSelectHidden;

          dropDown = div.querySelectorAll('.drop-down')[0];

          document.body.appendChild(dropDown);
          DropDown.enhance(dropDown);

          trigger = dropDown.querySelectorAll('.drop-down__trigger')[0];

          expect(trigger.innerText.replace(/^\s*/,'').replace(/\s*$/,'')).to.equal('3');
          DropDown.destroy(dropDown);
        });

        it('should have the initially selected option hidden', function () {
          var
            div = document.createElement('div'),
            dropDown,
            hiddenMenuItem;

          div.innerHTML = validDropDownHTMLSelectHidden;

          dropDown = div.querySelectorAll('.drop-down')[0];

          document.body.appendChild(dropDown);
          DropDown.enhance(dropDown);

          hiddenMenuItem = dropDown.querySelectorAll('.drop-down__menu .drop-down__menu-option--hidden')[0];

          expect(hiddenMenuItem.innerText.replace(/^\s*/,'').replace(/\s*$/,'')).to.equal('3');
          DropDown.destroy(dropDown);
        });

        it('should be initially selected on dropDownWillSelect', function (done) {
          var
            div = document.createElement('div'),
            dropDown,
            trigger,
            menuLink,
            selectEvent;

          div.innerHTML = validDropDownHTMLSelectHidden;

          dropDown = div.querySelectorAll('.drop-down')[0];
          menuLink = dropDown.querySelectorAll('.drop-down__menu a')[0];

          document.body.appendChild(dropDown);
          DropDown.enhance(dropDown);

          trigger = dropDown.querySelectorAll('.drop-down__trigger')[0];

          dropDown.addEventListener('dropDownWillSelect', function () {
            expect(trigger.innerText.replace(/^\s*/,'').replace(/\s*$/,'')).to.equal('3');
            dropDown.removeEventListener('dropDownWillSelect');
            DropDown.destroy(dropDown);
            done();
          }, false);

          selectEvent = new CustomEvent('dropDownSelect',
            {
              bubbles: true,
              detail: {
                select: menuLink
              }
            }
          );
          dropDown.dispatchEvent(selectEvent);
        });

        it('should be selected on dropDownDidSelect', function (done) {
          var
            div = document.createElement('div'),
            dropDown,
            trigger,
            menuLink,
            selectEvent,
            showEvent;

          div.innerHTML = validDropDownHTMLSelectHidden;

          dropDown = div.querySelectorAll('.drop-down')[0];
          menuLink = dropDown.querySelectorAll('.drop-down__menu a')[0];

          document.body.appendChild(dropDown);
          DropDown.enhance(dropDown);

          trigger = dropDown.querySelectorAll('.drop-down__trigger')[0];

          dropDown.addEventListener('dropDownDidSelect', function () {

            dropDown.addEventListener('dropDownDidShow', function () {
              expect(trigger.innerText.replace(/^\s*/,'').replace(/\s*$/,'')).to.equal(menuLink.innerText.replace(/^\s*/,'').replace(/\s*$/,''));
              dropDown.removeEventListener('dropDownDidSelect');
              dropDown.removeEventListener('dropDownDidShow');
              DropDown.destroy(dropDown);
              done();
            }, false);

            showEvent = new CustomEvent('dropDownShow', { bubbles: true });
            dropDown.dispatchEvent(showEvent);
          }, false);

          selectEvent = new CustomEvent('dropDownSelect',
            {
              bubbles: true,
              detail: {
                select: menuLink
              }
            }
          );
          dropDown.dispatchEvent(selectEvent);
        });

        it('should have the newly selected option visible', function (done) {
          var
            div = document.createElement('div'),
            dropDown,
            trigger,
            menuLink,
            selectEvent,
            showEvent,
            hiddenMenuItem;

          div.innerHTML = validDropDownHTMLSelectHidden;

          dropDown = div.querySelectorAll('.drop-down')[0];
          menuLink = dropDown.querySelectorAll('.drop-down__menu a')[0];

          document.body.appendChild(dropDown);
          DropDown.enhance(dropDown);

          trigger = dropDown.querySelectorAll('.drop-down__trigger')[0];

          dropDown.addEventListener('dropDownDidSelect', function () {

            dropDown.addEventListener('dropDownDidShow', function () {
              hiddenMenuItem = dropDown.querySelectorAll('.drop-down__menu .drop-down__menu-option--hidden')[0];
              expect(hiddenMenuItem.innerText.replace(/^\s*/,'').replace(/\s*$/,'')).to.equal('1');
              dropDown.removeEventListener('dropDownDidSelect');
              dropDown.removeEventListener('dropDownDidShow');
              DropDown.destroy(dropDown);
              done();
            }, false);

            showEvent = new CustomEvent('dropDownShow', { bubbles: true });
            dropDown.dispatchEvent(showEvent);
          }, false);

          selectEvent = new CustomEvent('dropDownSelect',
            {
              bubbles: true,
              detail: {
                select: menuLink
              }
            }
          );
          dropDown.dispatchEvent(selectEvent);
        });

      });

    });

  });

  describe('unenhance', function () {

    it('should no longer respond to dropDownSelect events', function () {
      var
        div = document.createElement('div'),
        dropDown,
        menuLink,
        selectEvent,
        selectCount = 0;

      div.innerHTML = validDropDownHTML;

      dropDown = div.querySelectorAll('.drop-down')[0];

      document.body.appendChild(dropDown);
      DropDown.enhance(dropDown);

      menuLink = dropDown.querySelectorAll('.drop-down__menu a')[0];

      dropDown.addEventListener('dropDownDidSelect', function () {
        selectCount++;
      }, false);

      selectEvent = new CustomEvent('dropDownSelect',
        {
          bubbles: true,
          detail: {
            select: menuLink
          }
        }
      );
      dropDown.dispatchEvent(selectEvent);

      DropDown.enhance(dropDown, 'unenhance');

      selectEvent = new CustomEvent('dropDownSelect',
        {
          bubbles: true,
          detail: {
            selected: menuLink
          }
        }
        );
      dropDown.dispatchEvent(selectEvent);

      expect(selectCount).to.equal(1);

      dropDown.removeEventListener('dropDownDidSelect');
      DropDown.destroy(dropDown);
    });

  });

});

describe('DropDown.enhance (dropDownShow:dropDown)', function () {
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

    describe('showing the menu', function () {

      describe('an open menu', function () {

        it('should start visible', function (done) {
          var
            div = document.createElement('div'),
            dropDown,
            trigger,
            menu,
            clickEvent;

          div.innerHTML = validDropDownHTML;

          dropDown = div.querySelectorAll('.drop-down')[0];
          menu = dropDown.querySelectorAll('.drop-down__menu')[0];
          trigger = dropDown.querySelectorAll('.drop-down__trigger')[0];

          document.body.appendChild(dropDown);
          DropDown.enhance(dropDown);

          trigger.addEventListener('click', function () {
            expect(window.getComputedStyle(menu, null)['visibility']).to.equal('visible');
            trigger.removeEventListener('click');
            DropDown.destroy(dropDown);
            done();
          }, false);

          clickEvent = new Event('click', { 'bubbles': true });
          trigger.dispatchEvent(clickEvent);
        });

        it('should be visible on dropDownWillShow', function (done) {
          var
            div = document.createElement('div'),
            dropDown,
            trigger,
            menu,
            clickEvent,
            dropDownShowEvent;

          div.innerHTML = validDropDownHTML;

          dropDown = div.querySelectorAll('.drop-down')[0];
          menu = dropDown.querySelectorAll('.drop-down__menu')[0];
          trigger = dropDown.querySelectorAll('.drop-down__trigger')[0];

          document.body.appendChild(dropDown);
          DropDown.enhance(dropDown);

          trigger.addEventListener('click', function () {
            expect(window.getComputedStyle(menu, null)['visibility']).to.equal('visible');

            dropDown.addEventListener('dropDownWillShow', function () {
              expect(window.getComputedStyle(menu, null)['visibility']).to.equal('visible');
              trigger.removeEventListener('click');
              dropDown.removeEventListener('dropDownWillShow');
              DropDown.destroy(dropDown);
              done();
            }, false);

            dropDownShowEvent = new CustomEvent(
              'dropDownShow',
              {
                'bubbles': true
              }
            );
            dropDown.dispatchEvent(dropDownShowEvent);
          }, false);

          clickEvent = new Event('click', { 'bubbles': true });
          trigger.dispatchEvent(clickEvent);
        });

        it('should be visible on dropDownDidShow', function (done) {
          var
            div = document.createElement('div'),
            dropDown,
            trigger,
            menu,
            clickEvent,
            dropDownShowEvent;

          div.innerHTML = validDropDownHTML;

          dropDown = div.querySelectorAll('.drop-down')[0];
          menu = dropDown.querySelectorAll('.drop-down__menu')[0];
          trigger = dropDown.querySelectorAll('.drop-down__trigger')[0];

          document.body.appendChild(dropDown);
          DropDown.enhance(dropDown);

          trigger.addEventListener('click', function () {
            expect(window.getComputedStyle(menu, null)['visibility']).to.equal('visible');

            dropDown.addEventListener('dropDownDidShow', function () {
              expect(window.getComputedStyle(menu, null)['visibility']).to.equal('visible');
              trigger.removeEventListener('click');
              dropDown.removeEventListener('dropDownDidShow');
              DropDown.destroy(dropDown);
              done();
            }, false);

            dropDownShowEvent = new CustomEvent(
              'dropDownShow',
              {
                'bubbles': true
              }
            );
            dropDown.dispatchEvent(dropDownShowEvent);
          }, false);

          clickEvent = new Event('click', { 'bubbles': true });
          trigger.dispatchEvent(clickEvent);
        });

      });

      describe('a closed menu', function () {

        it('should start hidden', function () {
          var
            div = document.createElement('div'),
            dropDown,
            menu;

          div.innerHTML = validDropDownHTML;

          dropDown = div.querySelectorAll('.drop-down')[0];
          menu = dropDown.querySelectorAll('.drop-down__menu')[0];

          document.body.appendChild(dropDown);
          DropDown.enhance(dropDown);

          expect(window.getComputedStyle(menu, null)['visibility']).to.equal('hidden');

          DropDown.destroy(dropDown);
        });

        it('should be hidden on dropDownWillShow', function (done) {
          var
            div = document.createElement('div'),
            dropDown,
            trigger,
            menu,
            dropDownShowEvent;

          div.innerHTML = validDropDownHTML;

          dropDown = div.querySelectorAll('.drop-down')[0];
          menu = dropDown.querySelectorAll('.drop-down__menu')[0];
          trigger = dropDown.querySelectorAll('.drop-down__trigger')[0];

          document.body.appendChild(dropDown);
          DropDown.enhance(dropDown);

          dropDown.addEventListener('dropDownWillShow', function () {
            expect(window.getComputedStyle(menu, null)['visibility']).to.equal('hidden');
            dropDown.removeEventListener('dropDownWillShow');
            DropDown.destroy(dropDown);
            done();
          }, false);

          dropDownShowEvent = new CustomEvent(
            'dropDownShow',
            {
              'bubbles': true
            }
          );
          dropDown.dispatchEvent(dropDownShowEvent);
        });

        it('should be visible on dropDownDidShow', function (done) {
          var
            div = document.createElement('div'),
            dropDown,
            trigger,
            menu,
            dropDownShowEvent;

          div.innerHTML = validDropDownHTML;

          dropDown = div.querySelectorAll('.drop-down')[0];
          menu = dropDown.querySelectorAll('.drop-down__menu')[0];
          trigger = dropDown.querySelectorAll('.drop-down__trigger')[0];

          document.body.appendChild(dropDown);
          DropDown.enhance(dropDown);

          dropDown.addEventListener('dropDownDidShow', function () {
            expect(window.getComputedStyle(menu, null)['visibility']).to.equal('visible');
            dropDown.removeEventListener('dropDownDidShow');
            DropDown.destroy(dropDown);
            done();
          }, false);

          dropDownShowEvent = new CustomEvent(
            'dropDownShow',
            {
              'bubbles': true
            }
          );
          dropDown.dispatchEvent(dropDownShowEvent);
        });

      });

    });

  });

  describe('unenhance', function () {

    it('should no longer respond to dropDownShow events', function () {
      var
        div = document.createElement('div'),
        dropDown,
        menuLink,
        showEvent,
        showCount = 0;

      div.innerHTML = validDropDownHTML;

      dropDown = div.querySelectorAll('.drop-down')[0];

      document.body.appendChild(dropDown);
      DropDown.enhance(dropDown);

      dropDown.addEventListener('dropDownDidShow', function () {
        showCount++;
      }, false);

      showEvent = new CustomEvent('dropDownShow', {bubbles: true});
      dropDown.dispatchEvent(showEvent);

      DropDown.enhance(dropDown, 'unenhance');

      showEvent = new CustomEvent('dropDownShow', {bubbles: true});
      dropDown.dispatchEvent(showEvent);

      expect(showCount).to.equal(1);

      dropDown.removeEventListener('dropDownDidShow');
      DropDown.destroy(dropDown);
    });

  });

});

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

      dropDown.addEventListener('dropDownDidShow', function () {

        dropDown.addEventListener('dropDownDidHide', function () {

          expect(1).to.equal(1); // made it here
          dropDown.removeEventListener('dropDownDidShow');
          dropDown.removeEventListener('dropDownDidHide');
          DropDown.destroy(dropDown);
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

      dropDown.addEventListener('dropDownDidHide', function () {
        hideCount++;
      }, false);

      dropDown.addEventListener('dropDownDidShow', function () {
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

      dropDown.removeEventListener('dropDownDidShow');
      dropDown.removeEventListener('dropDownDidHide');
      DropDown.destroy(dropDown);
    });

  });

});
