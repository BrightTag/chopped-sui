describe('ChopSuey.initializeComponent', function () {

  it('should be a function', function () {
    expect(ChopSuey.initializeComponent).to.be.an('function');
  });

  it('should return false with no args', function () {
    expect(ChopSuey.initializeComponent()).to.equal(false);
  });

  it('should return false with bad args', function () {
    expect(ChopSuey.initializeComponent({})).to.equal(false);
    expect(ChopSuey.initializeComponent(1)).to.equal(false);
    expect(ChopSuey.initializeComponent('a')).to.equal(false);
    expect(ChopSuey.initializeComponent(function(){})).to.equal(false);
  });

});
