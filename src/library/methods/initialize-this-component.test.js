describe('ChopSuey.initializeComponent by component', function () {

  it('should return false without a componentType', function () {
    var component = document.createElement('div');

    component.className = 'knownInitializeByComponent1 knownInitializeByComponent1--unenehanced';

    expect(ChopSuey.initializeComponent({
      component: component
    })).to.equal(false);
  });

  it('should return false without an unknown componentType', function () {
    var component = document.createElement('div');

    component.className = 'knownInitializeByComponent1 knownInitializeByComponent1--unenehanced';

    expect(ChopSuey.initializeComponent({
      componentType: 'knownInitializeByComponent2',
      component    : component
    })).to.equal(false);
  });

  it('should return false without a matching componentType', function () {
    var component = document.createElement('div');

    ChopSuey.registerComponent({
      componentType : 'knownInitializeByComponent1',
      componentClass: 'knownInitializeByComponent1'
    });

    component.className = 'knownInitializeByComponent2 knownInitializeByComponent2--uninitialized';

    document.body.appendChild(component);

    expect(ChopSuey.initializeComponent({
      componentType: 'knownInitializeByComponent1',
      component    : component
    })).to.equal(false);

    document.body.removeChild(component);
  });

  it('should return true with a known, matching componentType', function () {
    var component = document.createElement('div');

    ChopSuey.registerComponent({
      componentType : 'knownInitializeByComponent2',
      componentClass: 'knownInitializeByComponent2'
    });

    component.className = 'knownInitializeByComponent2 knownInitializeByComponent2--uninitialized';

    document.body.appendChild(component);

    expect(ChopSuey.initializeComponent({
      componentType: 'knownInitializeByComponent2',
      component    : component
    })).to.equal(true);

    document.body.removeChild(component);
  });

  it('should initialize an uninitialized component', function (done) {
    var
      component = document.createElement('div');

    ChopSuey.registerComponent({
      componentType : 'knownInitializeByType3',
      componentClass: 'knownInitializeByType3'
    });

    component.className = 'knownInitializeByType3 knownInitializeByType3--unenhanced';

    document.body.appendChild(component);

    expect(component.className).to.match(/--unenhanced( |$)/);

    expect(ChopSuey.initializeComponent({
      componentType: 'knownInitializeByType3'
    })).to.equal(true);

    expect(component.className).to.match(/--built( |$)/);

    setTimeout(function () {
      expect(component.className).to.match(/--enhanced( |$)/);

      document.body.removeChild(component);

      done();
    }, 100);

  });

  it('should not initialize an initialized component', function () {
    var
      component = document.createElement('div');

    ChopSuey.registerComponent({
      componentType : 'knownInitializeByType4',
      componentClass: 'knownInitializeByType4'
    });

    component.className = 'knownInitializeByType4 knownInitializeByType4--enhanced';

    document.body.appendChild(component);

    expect(component.className).to.match(/--enhanced( |$)/);

    expect(ChopSuey.initializeComponent({
      componentType: 'knownInitializeByType4'
    })).to.equal(true);

    expect(component.className).to.match(/--enhanced( |$)/);
  });

});
