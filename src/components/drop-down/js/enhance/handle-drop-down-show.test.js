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
