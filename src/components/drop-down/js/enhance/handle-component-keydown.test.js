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
