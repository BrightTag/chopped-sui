(function (SignalUI) {

  'use strict';

  SignalUI.registerWidget({
    widgetType: 'dropDown',
    widgetClass: 'drop-down',
    templates: {
      trigger: 'TEMPLATE:drop-down/templates/drop-down-trigger',
      menu:    'TEMPLATE:drop-down/templates/drop-down-menu'
    },
    build: function (widget, widgetType) {
      var
        select = widget.querySelectorAll('.drop-down__select')[0],
        menu = widget.querySelectorAll('.drop-down__menu')[0],
        i = 0,
        len,
        option,
        options,
        menuData = { menuItems: [] },
        triggerData = {},
        template = '',
        selected,
        currentIsHidden,
        flushRight,
        div,
        elements,
        registeredWidget = SignalUI.registeredWidgets[widgetType];

      if (select) {
        currentIsHidden = /(^| )drop-down__select--hide-current( |$)/g.test(select.className);
        flushRight = /(^| )drop-down__select--flush-right( |$)/g.test(select.className);

        menuData.currentIsHidden = currentIsHidden;
        menuData.flushRight = flushRight;

        select.className += ' drop-down__select--hidden';
        options = select.children;
        for (i = 0, len = options.length; i < len; i += 1) {
          option = options[i];
          menuData.menuItems.push({
            text: option.innerHTML,
            isCurrent: option.selected
          });
          if (option.selected) {
            selected = option.innerHTML;
          }
        }

        triggerData.triggerText = selected;

        template += registeredWidget.templates.trigger(triggerData);
        template += registeredWidget.templates.menu(menuData);
      } else if (menu) {
        options = menu.children;
        for (i = 0, len = options.length; i < len; i += 1) {
          options[i].children[0].tabIndex = -1;
        }
        menu.className += ' drop-down__menu--hidden';

        triggerData.triggerText = 'Menu';

        template += registeredWidget.templates.trigger(triggerData);
      }

      div = document.createElement('div');
      div.innerHTML = template;
      elements = div.children;
      if (select) {
        while (elements.length) {
          widget.appendChild(elements[0]);
        }
      } else if (menu) {
        while (elements.length) {
          widget.insertBefore(elements[0], menu);
        }
      }
    },
    enhance: function (widget) {
      var
        trigger = widget.querySelectorAll('.drop-down__trigger')[0],
        menu = widget.querySelectorAll('.drop-down__menu')[0],

        menuHidden = /(^| )drop-down__menu--hidden( |$)/g,
        menuIsHidden = /(^| )drop-down__menu--hidden( |$)/,
        triggerActive = /(^| )drop-down__trigger--active( |$)/g,
        menuIsFixed = /(^| )drop-down__menu--fixed( |$)/,

        widgetWidth = widget.clientWidth,
        menuWidth = menu.clientWidth,

        hideOnOtherDropDownShow = function (e) {
          var dropDownHideEvent;
          if (e.detail.widget !== widget) {
            dropDownHideEvent = new window.CustomEvent(
              'dropDownHide'
            );
            widget.dispatchEvent(dropDownHideEvent);
          }
        };

      if ((menuWidth > widgetWidth) && menuIsFixed.test(menu.className)) {
        widget.style.width = menuWidth + 'px';
      }

      /* STANDARD EVENTS */

      trigger.addEventListener('click', function (e) {
        var
          dropDownShowEvent,
          dropDownHideEvent;
        e.preventDefault();
        if (menuIsHidden.test(menu.className)) {
          dropDownShowEvent = new window.CustomEvent(
            'dropDownShow'
          );
          widget.dispatchEvent(dropDownShowEvent);
        } else {
          dropDownHideEvent = new window.CustomEvent(
            'dropDownHide'
          );
          widget.dispatchEvent(dropDownHideEvent);
        }
        return false;
      }, true);

      widget.addEventListener('keyup', function (e) {
        var
          dropDownShowEvent,
          dropDownHideEvent,
          nextNode,
          isHidden;
        isHidden = /(^| )drop-down__menu-option--hidden( |$)/;
        if (menuIsHidden.test(menu.className)) {
          if (e.keyCode === 32 && e.target.tagName === 'A') {
            e.target.click();
          }
          if (e.keyCode === 39 || e.keyCode === 40) {
            dropDownShowEvent = new window.CustomEvent(
              'dropDownShow'
            );
            widget.dispatchEvent(dropDownShowEvent);
          }
        } else {
          if (e.keyCode === 32 && e.target.tagName === 'A') {
            e.target.click();
          }
          if (e.keyCode === 37 || e.keyCode === 38) {
            if (e.target.tagName === 'BUTTON') {
              dropDownHideEvent = new window.CustomEvent(
                'dropDownHide'
              );
              widget.dispatchEvent(dropDownHideEvent);
            } else {
              nextNode = e.target.parentElement.previousSibling;
              if (nextNode && isHidden.test(nextNode.className)) {
                nextNode = nextNode.previousSibling;
              }
              while (nextNode && nextNode.nodeType !== 1) {
                nextNode = nextNode.previousSibling;
                if (nextNode && isHidden.test(nextNode.className)) {
                  nextNode = nextNode.previousSibling;
                }
              }
              if (nextNode) {
                nextNode.children[0].focus();
              } else {
                trigger.focus();
              }
            }
          }
          if (e.keyCode === 39 || e.keyCode === 40) {
            if (e.target.tagName === 'BUTTON') {
              nextNode = menu.children[0];
            } else {
              nextNode = e.target.parentElement.nextSibling;
            }
            if (nextNode && isHidden.test(nextNode.className)) {
              nextNode = nextNode.nextSibling;
            }
            while (nextNode && nextNode.nodeType !== 1) {
              nextNode = nextNode.nextSibling;
              if (nextNode && isHidden.test(nextNode.className)) {
                nextNode = nextNode.nextSibling;
              }
            }
            if (nextNode) {
              nextNode.children[0].focus();
            }
          }
        }
      }, true);

      menu.addEventListener('click', function (e) {
        var dropDownSelectEvent;
        if (e.target.tagName === 'A') {
          dropDownSelectEvent = new window.CustomEvent(
            'dropDownSelect',
            {
              'detail': {
                'select': e.target
              }
            }
          );
          widget.dispatchEvent(dropDownSelectEvent);
        }
      }, true);

      /* API EVENTS */

      widget.addEventListener('dropDownShow', function () {
        var
          dropDownWillShowEvent,
          dropDownDidShowEvent,
          mClassName,
          sClassName;

        dropDownWillShowEvent = new window.CustomEvent(
          'dropDownWillShow',
          {
            'detail': {
              'widget': widget
            }
          }
        );
        widget.dispatchEvent(dropDownWillShowEvent);
        document.body.dispatchEvent(dropDownWillShowEvent);

        mClassName = menu.className;
        sClassName = trigger.className;

        mClassName = mClassName.replace(menuHidden, ' ');
        sClassName = sClassName.replace(triggerActive, ' ') +
          ' drop-down__trigger--active';

        menu.className = mClassName;
        trigger.className = sClassName;

        dropDownDidShowEvent = new window.CustomEvent(
          'dropDownDidShow',
          {
            'detail': {
              'widget': widget
            }
          }
        );

        document.body.addEventListener(
          'dropDownWillShow',
          hideOnOtherDropDownShow,
          true
        );

        menu.scrollTop = 1;
        menu.scrollTop = 0;

        trigger.focus();

        widget.dispatchEvent(dropDownDidShowEvent);
      }, true);

      widget.addEventListener('dropDownHide', function () {
        var
          dropDownWillHideEvent,
          dropDownDidHideEvent,
          mClassName,
          sClassName;

        dropDownWillHideEvent = new window.CustomEvent(
          'dropDownWillHide',
          {
            'detail': {
              'widget': widget
            }
          }
        );
        widget.dispatchEvent(dropDownWillHideEvent);

        mClassName = menu.className;
        sClassName = trigger.className;

        mClassName = mClassName.replace(menuHidden, ' ') +
          ' drop-down__menu--hidden';
        sClassName = sClassName.replace(triggerActive, ' ');

        menu.className = mClassName;
        trigger.className = sClassName;

        dropDownDidHideEvent = new window.CustomEvent(
          'dropDownDidHide',
          {
            'detail': {
              'widget': widget
            }
          }
        );

        document.body.removeEventListener(
          'dropDownWillShow',
          hideOnOtherDropDownShow,
          true
        );

        widget.dispatchEvent(dropDownDidHideEvent);
      }, true);

      widget.addEventListener('dropDownSelect', function (e) {
        var
          selected = e.detail.select,
          dropDownDidSelectEvent,
          dropDownHideEvent,
          menuOptions,
          i,
          len,
          menuOption,
          cClassName,
          oClassName,
          isCurrent = /(^| )drop-down__menu-option(-container)?--current( |$)/g,
          isHidden = /(^| )drop-down__menu-option--hidden( |$)/g,
          isFixed = /(^| )drop-down__trigger--fixed( |$)/g,
          currentIsHidden = widget.querySelectorAll('.drop-down__menu-option--hidden').length;

        if (!isFixed.test(trigger.className)) {
          trigger.innerHTML = selected.innerHTML;

          menuOptions = menu.children;

          for (i = 0, len = menuOptions.length; i < len; i += 1) {
            menuOption = menuOptions[i];
            cClassName = menuOption.className;
            oClassName = menuOption.children[0].className;
            cClassName = cClassName.replace(isCurrent, ' ');
            cClassName = cClassName.replace(isHidden, ' ');
            oClassName = oClassName.replace(isCurrent, ' ');
            if (menuOption.children[0] === selected) {
              cClassName += ' drop-down__menu-option--current';
              oClassName += ' drop-down__menu-option-trigger';
              if (currentIsHidden) {
                cClassName += ' drop-down__menu-option--hidden';
              }
            }
            menuOption.className = cClassName;
            menuOption.children[0].className = oClassName;
          }

        }

        dropDownHideEvent = new window.CustomEvent(
          'dropDownHide',
          {
            'detail': {
              'widget': widget
            }
          }
        );

        trigger.focus();

        dropDownDidSelectEvent = new window.CustomEvent(
          'dropDownDidSelect',
          {
            'detail': {
              'widget': e.detail.widget,
              'selected': e.detail.select
            }
          }
        );
        widget.dispatchEvent(dropDownDidSelectEvent);

        widget.dispatchEvent(dropDownHideEvent);
      }, true);

    }
  });

}(window.SignalUI));
