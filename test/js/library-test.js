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

describe('[private] Component', function () {

});

describe('ChopSuey.initializeComponent by componentType', function () {

  it('should return false with an unknown componentType', function () {
    expect(ChopSuey.initializeComponent({
      componentType: 'unknown'
    })).to.equal(false);
  });

  it('should return true with a known componentType', function () {
    ChopSuey.registerComponent({
      componentType : 'knownInitializeByType1',
      componentClass: 'knownInitializeByType1'
    });

    expect(ChopSuey.initializeComponent({
      componentType: 'knownInitializeByType1'
    })).to.equal(true);

  });

  it('should initialize all components of a componentType', function (done) {
    var
      uninitialized = document.createElement('div'),
      initialized   = document.createElement('div');

    ChopSuey.registerComponent({
      componentType : 'knownInitializeByType2',
      componentClass: 'knownInitializeByType2'
    });

    uninitialized.className = 'knownInitializeByType2 knownInitializeByType2--unenhanced';
    initialized.className = 'knownInitializeByType2 knownInitializeByType2--enhanced';

    document.body.appendChild(uninitialized);
    document.body.appendChild(initialized);

    expect(uninitialized.className).to.match(/--unenhanced( |$)/);
    expect(initialized.className).to.match(/--enhanced( |$)/);

    expect(ChopSuey.initializeComponent({
      componentType: 'knownInitializeByType2'
    })).to.equal(true);

    expect(uninitialized.className).to.match(/--built( |$)/);
    expect(initialized.className).to.match(/--enhanced( |$)/);

    setTimeout(function () {
      expect(uninitialized.className).to.match(/--enhanced( |$)/);
      expect(initialized.className).to.match(/--enhanced( |$)/);

      document.body.removeChild(uninitialized);
      document.body.removeChild(initialized);

      done();
    }, 100);

  });

});

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

describe('ChopSuey.registerComponent', function () {

});


describe('ChopSuey.registeredComponents', function () {

});

describe('[private] Component.build', function () {

});

describe('[private] Component.didBuild', function () {

});

describe('[private] Component.didEnhance', function () {

});

describe('[private] Component.enhance', function () {

});

describe('[private] Component.willBuild', function () {

});

describe('[private] Component.willEnhance', function () {

});
