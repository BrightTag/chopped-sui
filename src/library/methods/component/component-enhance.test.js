describe('[private] Component.enhance', function () {

  it('should return false without a component', function () {
    var component = new ChopSuey._private.Component({});

    expect(component.enhance()).to.equal(false);
  });

  it('should return true with a component', function () {
    var component = new ChopSuey._private.Component({});

    expect(component.enhance('anything')).to.equal(true);
  });

});
