describe('Component.didEnhance', function () {

  it('should return false without a component', function () {
    var component = new ChopSuey._Component({});

    expect(component.didEnhance()).to.equal(false);
  });

  it('should return true with a component', function () {
    var
      component = new ChopSuey._Component({}),
      div       = document.createElement('div');

    expect(component.didEnhance(div)).to.equal(true);
  });

  it('should fire a componentDidEnhance event on the element', function (done) {
    var
      component = new ChopSuey._Component({
        componentType : 'component',
        componentClass: 'component'
      }),
      div = document.createElement('div');

    document.body.appendChild(div);

    div.addEventListener('componentDidEnhance', function () {
      document.body.removeChild(div);

      done();
    }, false);

    component.didEnhance(div);

  });

});
