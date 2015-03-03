describe('ChopSuey', function () {

  it('should be an object', function () {
    expect(ChopSuey).to.be.an('object');
  });

  it('should have a registeredComponents method', function () {
    expect(ChopSuey.registeredComponents).to.be.a('function');
  });

  it('should have an initializeComponent method', function () {
    expect(ChopSuey.initializeComponent).to.be.a('function');
  });

  it('should have a registerComponent method', function () {
    expect(ChopSuey.registerComponent).to.be.a('function');
  });

});
