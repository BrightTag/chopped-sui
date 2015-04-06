describe('Component.willDestroy', function () {

  it('should return false without a component', function () {
    var component = new ChopSuey._Component({});

    expect(component.willDestroy()).to.equal(false);
  });

  it('should return true with a component', function () {
    var
      component = new ChopSuey._Component({}),
      div       = document.createElement('div');

    expect(component.willDestroy(div)).to.equal(true);
  });

  it('should fire a componentWillDestroy event on the element', function (done) {
    var
      component = new ChopSuey._Component({
        componentType : 'component',
        componentClass: 'component'
      }),
      div = document.createElement('div');

    document.body.appendChild(div);

    div.addEventListener('componentWillDestroy', function () {
      document.body.removeChild(div);

      done();
    }, false);

    component.willDestroy(div);

  });

});
