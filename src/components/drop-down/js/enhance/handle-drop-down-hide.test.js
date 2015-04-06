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
            document.body.removeChild(dropDown);
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
              document.body.removeChild(dropDown);
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
              document.body.removeChild(dropDown);
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

          document.body.removeChild(dropDown);
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
            document.body.removeChild(dropDown);
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
            document.body.removeChild(dropDown);
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
        clickTriggerEvent,
        hideCount = 0;

      div.innerHTML = validDropDownHTML;

      dropDown = div.querySelectorAll('.drop-down')[0];
      trigger = dropDown.querySelectorAll('.drop-down__trigger')[0];

      document.body.appendChild(dropDown);
      DropDown.enhance(dropDown);

      dropDown.addEventListener('dropDownHide', function () {
        hideCount++;
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
      document.body.removeChild(dropDown);
    });

  });

});
