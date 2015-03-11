describe('ChopSuey', function () {

  describe('namespace', function () {

    it('should be an object', function () {
      expect(ChopSuey).to.be.an('object');
    });

    it('should be attached to the window object', function () {
      expect(ChopSuey).to.equal(window.ChopSuey);
    });

  });

  describe('methods', function () {

    it('should have a registeredComponents method', function () {
      expect(ChopSuey).to.respondTo('registeredComponents');
      expect(ChopSuey.registeredComponents).to.be.a('function');
    });

    it('should have an initializeComponent method', function () {
      expect(ChopSuey).to.respondTo('initializeComponent');
      expect(ChopSuey.initializeComponent).to.be.a('function');
    });

    it('should have a registerComponent method', function () {
      expect(ChopSuey).to.respondTo('registerComponent');
      expect(ChopSuey.registerComponent).to.be.a('function');
    });

  });

  describe('templates', function () {

    it('should have a templates object', function () {
      expect(ChopSuey.templates).to.be.an('object');
    });

  });

});
