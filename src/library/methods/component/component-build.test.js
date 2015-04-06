describe('Component.build', function () {

  it('should return false without a component', function () {
    var component = new ChopSuey._Component({});

    expect(component.build()).to.equal(false);
  });

  it('should return true with a component', function () {
    var component = new ChopSuey._Component({});

    expect(component.build('anything')).to.equal(true);
  });

});
