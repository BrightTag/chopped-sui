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
