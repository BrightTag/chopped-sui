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

          expect(trigger.innerHTML.replace(/^\s*/,'').replace(/\s*$/,'')).to.equal('menu');
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
            expect(trigger.innerHTML.replace(/^\s*/,'').replace(/\s*$/,'')).to.equal('menu');
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
              expect(trigger.innerHTML.replace(/^\s*/,'').replace(/\s*$/,'')).to.equal(menuLink.innerHTML.replace(/^\s*/,'').replace(/\s*$/,''));
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

          expect(trigger.innerHTML.replace(/^\s*/,'').replace(/\s*$/,'')).to.equal('menu');
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
            expect(trigger.innerHTML.replace(/^\s*/,'').replace(/\s*$/,'')).to.equal('menu');
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
              expect(trigger.innerHTML.replace(/^\s*/,'').replace(/\s*$/,'')).to.equal('menu');
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

          expect(trigger.innerHTML.replace(/^\s*/,'').replace(/\s*$/,'')).to.equal('3');
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

          hiddenMenuItem = dropDown.querySelectorAll('.drop-down__menu .drop-down__menu-option--hidden a')[0];

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
            expect(trigger.innerHTML.replace(/^\s*/,'').replace(/\s*$/,'')).to.equal('3');
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
              expect(trigger.innerHTML.replace(/^\s*/,'').replace(/\s*$/,'')).to.equal(menuLink.innerHTML.replace(/^\s*/,'').replace(/\s*$/,''));
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
              hiddenMenuItem = dropDown.querySelectorAll('.drop-down__menu .drop-down__menu-option--hidden a')[0];
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

          expect(trigger.innerHTML.replace(/^\s*/,'').replace(/\s*$/,'')).to.equal('3');
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

          hiddenMenuItem = dropDown.querySelectorAll('.drop-down__menu .drop-down__menu-option--hidden a')[0];

          expect(hiddenMenuItem.innerHTML.replace(/^\s*/,'').replace(/\s*$/,'')).to.equal('3');
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
            expect(trigger.innerHTML.replace(/^\s*/,'').replace(/\s*$/,'')).to.equal('3');
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
              expect(trigger.innerHTML.replace(/^\s*/,'').replace(/\s*$/,'')).to.equal(menuLink.innerHTML.replace(/^\s*/,'').replace(/\s*$/,''));
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
              hiddenMenuItem = dropDown.querySelectorAll('.drop-down__menu .drop-down__menu-option--hidden a')[0];
              expect(hiddenMenuItem.innerHTML.replace(/^\s*/,'').replace(/\s*$/,'')).to.equal('1');
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
