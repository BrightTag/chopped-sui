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

describe('[private] Component', function () {

  describe('constructor', function () {

    it('should be a constructor', function () {
      var component = new ChopSuey._private.Component({});

      expect(component).to.be.an.instanceof(ChopSuey._private.Component);
    });

    it('should have default properties', function () {
      var component = new ChopSuey._private.Component({});

      expect(component.componentType).to.equal('component');
      expect(component.componentClass).to.equal('component');
    });

    it('should allow properties to be overwritten', function () {
      var component = new ChopSuey._private.Component({
        componentType: 'niftyComponent',
        componentClass: 'nifty-component'
      });

      expect(component.componentType).to.equal('niftyComponent');
      expect(component.componentClass).to.equal('nifty-component');
    });

    it('should not allow build to be overwritten at creation', function () {
      var
        specialBuild = function () {
          return 'build';
        },
        component = new ChopSuey._private.Component({
          build: specialBuild
        });

      expect(component.build).to.not.equal(specialBuild);
    });

    it('should not allow willBuild to be overwritten at creation', function () {
      var
        specialWillBuild = function () {
          return 'willBuild';
        },
        component = new ChopSuey._private.Component({
          willBuild: specialWillBuild
        });

      expect(component.willBuild).to.not.equal(specialWillBuild);
    });

    it('should not allow didBuild to be overwritten at creation', function () {
      var
        specialDidBuild = function () {
          return 'didBuild';
        },
        component = new ChopSuey._private.Component({
          didBuild: specialDidBuild
        });

      expect(component.didBuild).to.not.equal(specialDidBuild);
    });

    it('should not allow enhance to be overwritten at creation', function () {
      var
        specialEnhance = function () {
          return 'enhance';
        },
        component = new ChopSuey._private.Component({
          enhance: specialEnhance
        });

      expect(component.enhance).to.not.equal(specialEnhance);
    });

    it('should not allow willEnhance to be overwritten at creation', function () {
      var
        specialWillEnhance = function () {
          return 'willEnhance';
        },
        component = new ChopSuey._private.Component({
          willEnhance: specialWillEnhance
        });

      expect(component.willEnhance).to.not.equal(specialWillEnhance);
    });

    it('should not allow didEnhance to be overwritten at creation', function () {
      var
        specialDidEnhance = function () {
          return 'didEnhance';
        },
        component = new ChopSuey._private.Component({
          didEnhance: specialDidEnhance
        });

      expect(component.didEnhance).to.not.equal(specialDidEnhance);
    });

  });

  describe('methods', function () {
    var component = new ChopSuey._private.Component({});

    it('should have a build method', function () {
      expect(component).to.respondTo('build');
      expect(component.build).to.be.a('function');
    });

    it('should have a willBuild method', function () {
      expect(component).to.respondTo('willBuild');
      expect(component.willBuild).to.be.a('function');
    });

    it('should have a didBuild method', function () {
      expect(component).to.respondTo('didBuild');
      expect(component.didBuild).to.be.a('function');
    });

    it('should have a enhance method', function () {
      expect(component).to.respondTo('enhance');
      expect(component.enhance).to.be.a('function');
    });

    it('should have a willEnhance method', function () {
      expect(component).to.respondTo('willEnhance');
      expect(component.willEnhance).to.be.a('function');
    });

    it('should have a didEnhance method', function () {
      expect(component).to.respondTo('didEnhance');
      expect(component.didEnhance).to.be.a('function');
    });

  });

});

describe('[private] initialize-all-of-type', function () {

  var
    classBase = 'initializeAllOfType',
    classIndex = 1,
    newComponentName = function () {
      return classBase + classIndex++;
    };

  describe('validate args', function () {

    it('should return false with an bad args', function () {
      var componentName = newComponentName();

      expect(ChopSuey._private.initializeAllOfType()).to.equal(false);

    });

    it('should return true with good args', function () {
      var componentName = newComponentName();

      ChopSuey.registerComponent({
        componentType : componentName,
        componentClass: componentName
      });

      expect(ChopSuey._private.initializeAllOfType(
        componentName
      )).to.equal(true);

    });

  });

  describe('by componentType', function () {

    it('should build and enhance all unenhanced components of a componentType', function (done) {
      var
        unenhanced1 = document.createElement('div'),
        unenhanced2 = document.createElement('div'),
        componentName = newComponentName();

      ChopSuey.registerComponent({
        componentType : componentName,
        componentClass: componentName
      });

      unenhanced1.className = componentName + ' ' + componentName + '--unenhanced';
      unenhanced2.className = componentName + ' ' + componentName + '--unenhanced';

      document.body.appendChild(unenhanced1);
      document.body.appendChild(unenhanced2);

      expect(unenhanced1.className).to.match(/--unenhanced( |$)/);
      expect(unenhanced2.className).to.match(/--unenhanced( |$)/);

      ChopSuey._private.initializeAllOfType(
        componentName
      );

      expect(unenhanced1.className).to.match(/--built( |$)/);
      expect(unenhanced2.className).to.match(/--built( |$)/);

      setTimeout(function () {
        expect(unenhanced1.className).to.match(/--enhanced( |$)/);
        expect(unenhanced2.className).to.match(/--enhanced( |$)/);

        document.body.removeChild(unenhanced1);
        document.body.removeChild(unenhanced2);

        done();
      }, 150);

    });

    it('should enhance all built unenhanced components of a componentType', function (done) {
      var
        built1 = document.createElement('div'),
        built2 = document.createElement('div'),
        componentName = newComponentName();

      ChopSuey.registerComponent({
        componentType : componentName,
        componentClass: componentName
      });

      built1.className = componentName + ' ' + componentName + '--unenhanced ' + componentName + '--built';
      built2.className = componentName + ' ' + componentName + '--unenhanced ' + componentName + '--built';

      document.body.appendChild(built1);
      document.body.appendChild(built2);

      expect(built1.className).to.match(/--unenhanced( |$)/);
      expect(built1.className).to.match(/--built( |$)/);
      expect(built2.className).to.match(/--unenhanced( |$)/);
      expect(built2.className).to.match(/--built( |$)/);

      expect(ChopSuey._private.initializeAllOfType(
        componentName
      )).to.equal(true);

      expect(built1.className).to.match(/--built( |$)/);
      expect(built2.className).to.match(/--built( |$)/);

      setTimeout(function () {
        expect(built1.className).to.match(/--enhanced( |$)/);
        expect(built2.className).to.match(/--enhanced( |$)/);

        document.body.removeChild(built1);
        document.body.removeChild(built2);

        done();
      }, 100);

    });

    it('should not build or enhance already enhanced components of a componentType', function (done) {
      var
        enhanced = document.createElement('div'),
        componentName = newComponentName();

      ChopSuey.registerComponent({
        componentType : componentName,
        componentClass: componentName
      });

      enhanced.className = componentName + ' ' + componentName + '--enhanced';

      document.body.appendChild(enhanced);

      expect(enhanced.className).to.match(/--enhanced( |$)/);

      expect(ChopSuey._private.initializeAllOfType(
        componentName
      )).to.equal(true);

      expect(enhanced.className).to.match(/--enhanced( |$)/);

      setTimeout(function () {
        expect(enhanced.className).to.match(/--enhanced( |$)/);

        document.body.removeChild(enhanced);

        done();
      }, 100);

    });

  });

});

describe('ChopSuey.initializeComponent', function () {

  var
    classBase = 'initializeComponent',
    classIndex = 1,
    newComponentName = function () {
      return classBase + classIndex++;
    };

  describe('validate args', function () {

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

  describe('by componentType', function () {

    it('should initialize all of a componentType with no component or image', function (done) {
      var
        component1 = document.createElement('div'),
        component2 = document.createElement('div'),
        componentName = newComponentName();

      ChopSuey.registerComponent({
        componentType : componentName,
        componentClass: componentName
      });

      component1.className = componentName + ' ' + componentName + '--unenhanced';
      component2.className = componentName + ' ' + componentName + '--unenhanced';

      document.body.appendChild(component1);
      document.body.appendChild(component2);

      expect(component1.className).to.match(/--unenhanced( |$)/);
      expect(component1.className).to.match(/--unenhanced( |$)/);

      ChopSuey.initializeComponent({
        componentType: componentName
      });

      expect(component1.className).to.match(/--built( |$)/);
      expect(component2.className).to.match(/--built( |$)/);

      setTimeout(function () {
        expect(component1.className).to.match(/--enhanced( |$)/);
        expect(component2.className).to.match(/--enhanced( |$)/);

        document.body.removeChild(component1);
        document.body.removeChild(component2);

        done();
      }, 100);

    });

  });

  describe('by component', function () {

    it('should initialize a single component given that component', function (done) {
      var
        component1 = document.createElement('div'),
        component2 = document.createElement('div'),
        componentName = newComponentName();

      ChopSuey.registerComponent({
        componentType : componentName,
        componentClass: componentName
      });

      component1.className = componentName + ' ' + componentName + '--unenhanced';
      component2.className = componentName + ' ' + componentName + '--unenhanced';

      document.body.appendChild(component1);
      document.body.appendChild(component2);

      expect(component1.className).to.match(/--unenhanced( |$)/);
      expect(component2.className).to.match(/--unenhanced( |$)/);

      ChopSuey.initializeComponent({
        componentType: componentName,
        component: component1
      });

      expect(component1.className).to.match(/--built( |$)/);
      expect(component2.className).to.match(/--unenhanced( |$)/);

      setTimeout(function () {
        expect(component1.className).to.match(/--enhanced( |$)/);
        expect(component2.className).to.match(/--unenhanced( |$)/);

        document.body.removeChild(component1);
        document.body.removeChild(component2);

        done();
      }, 100);

    });

  });

  describe('by image', function () {

    it('should initialize a single component given that component\'s image initializer', function (done) {
      var
        component1 = document.createElement('div'),
        image1 = document.createElement('img'),
        component2 = document.createElement('div'),
        image2 = document.createElement('img'),
        componentName = newComponentName();

      ChopSuey.registerComponent({
        componentType : componentName,
        componentClass: componentName
      });

      component1.className = componentName + ' ' + componentName + '--unenhanced';
      component2.className = componentName + ' ' + componentName + '--unenhanced';

      document.body.appendChild(component1);
      document.body.appendChild(image1);
      document.body.appendChild(component2);
      document.body.appendChild(image2);

      expect(component1.className).to.match(/--unenhanced( |$)/);
      expect(component2.className).to.match(/--unenhanced( |$)/);

      ChopSuey.initializeComponent({
        componentType: componentName,
        image: image1
      });

      expect(component1.className).to.match(/--built( |$)/);
      expect(component2.className).to.match(/--unenhanced( |$)/);

      setTimeout(function () {
        expect(component1.className).to.match(/--enhanced( |$)/);
        expect(component2.className).to.match(/--unenhanced( |$)/);
        expect(isInDOMTree(image1)).to.equal(false);
        expect(isInDOMTree(image2)).to.equal(true);

        document.body.removeChild(component1);
        document.body.removeChild(component2);
        document.body.removeChild(image2);

        done();
      }, 100);

    });

  });

});

describe('[private] initialize-this-component', function () {

  var
    classBase = 'initializeThisComponent',
    classIndex = 1,
    newComponentName = function () {
      return classBase + classIndex++;
    };

  describe('validate args', function () {

    it('should return false without a componentType', function () {
      var
        component = document.createElement('div'),
        componentName = newComponentName();

      component.className = componentName + ' ' + componentName + '--unenehanced';

      expect(ChopSuey._private.initializeThisComponent(
        undefined,
        component,
        undefined
      )).to.equal(false);
    });

    it('should return false without an unknown componentType', function () {
      var
        component = document.createElement('div'),
        componentName1 = newComponentName(),
        componentName2 = newComponentName();

      component.className = componentName1 + ' ' + componentName1 + '--unenehanced';

      expect(ChopSuey._private.initializeThisComponent(
        componentName2,
        component,
        undefined
      )).to.equal(false);
    });

    it('should return false without a matching componentType', function () {
      var
        component = document.createElement('div'),
        componentName1 = newComponentName(),
        componentName2 = newComponentName();

      ChopSuey.registerComponent({
        componentType : componentName1,
        componentClass: componentName1
      });

      component.className = componentName2 + ' ' + componentName2 + '--uninitialized';

      document.body.appendChild(component);

      expect(ChopSuey._private.initializeThisComponent(
        componentName1,
        component,
        undefined
      )).to.equal(false);

      document.body.removeChild(component);
    });

    it('should return true with a known, matching componentType', function () {
      var
        component = document.createElement('div'),
        componentName = newComponentName();

      ChopSuey.registerComponent({
        componentType : componentName,
        componentClass: componentName
      });

      component.className = componentName + ' ' + componentName + '--uninitialized';

      document.body.appendChild(component);

      expect(ChopSuey._private.initializeThisComponent(
        componentName,
        component,
        undefined
      )).to.equal(true);

      document.body.removeChild(component);
    });

  });

  describe('by component', function () {

    it('should initialize an uninitialized component', function (done) {
      var
        component = document.createElement('div'),
        componentName = newComponentName();

      ChopSuey.registerComponent({
        componentType : componentName,
        componentClass: componentName
      });

      component.className = componentName + ' ' + componentName + '--unenhanced';

      document.body.appendChild(component);

      expect(component.className).to.match(/--unenhanced( |$)/);

      ChopSuey._private.initializeThisComponent(
        componentName,
        component,
        undefined
      );

      expect(component.className).to.match(/--built( |$)/);

      setTimeout(function () {
        expect(component.className).to.match(/--enhanced( |$)/);

        document.body.removeChild(component);

        done();
      }, 100);

    });

    it('should not initialize an initialized component', function (done) {
      var
        component = document.createElement('div'),
        componentName = newComponentName();

      ChopSuey.registerComponent({
        componentType : componentName,
        componentClass: componentName
      });

      component.className = componentName + ' ' + componentName + '--enhanced';

      document.body.appendChild(component);

      expect(component.className).to.match(/--enhanced( |$)/);

      ChopSuey._private.initializeThisComponent(
        componentName,
        component,
        undefined
      );

      expect(component.className).to.match(/--enhanced( |$)/);

      setTimeout(function () {
        expect(component.className).to.match(/--enhanced( |$)/);

        document.body.removeChild(component);

        done();
      }, 100);

    });

  });

  describe('by component with image', function () {

    it('should initialize an uninitialized component', function (done) {
      var
        component = document.createElement('div'),
        image = document.createElement('img'),
        componentName = newComponentName();

      ChopSuey.registerComponent({
        componentType : componentName,
        componentClass: componentName
      });

      component.className = componentName + ' ' + componentName + '--unenhanced';

      document.body.appendChild(component);
      document.body.appendChild(image);

      expect(component.className).to.match(/--unenhanced( |$)/);

      ChopSuey._private.initializeThisComponent(
        componentName,
        component,
        image
      );

      expect(component.className).to.match(/--built( |$)/);

      setTimeout(function () {
        expect(component.className).to.match(/--enhanced( |$)/);
        expect(isInDOMTree(image)).to.equal(false);

        document.body.removeChild(component);

        done();
      }, 100);

    });

    it('should not initialize an initialized component', function (done) {
      var
        component = document.createElement('div'),
        image = document.createElement('img'),
        componentName = newComponentName();

      ChopSuey.registerComponent({
        componentType : componentName,
        componentClass: componentName
      });

      component.className = componentName + ' ' + componentName + '--enhanced';

      document.body.appendChild(component);
      document.body.appendChild(image);

      expect(component.className).to.match(/--enhanced( |$)/);

      ChopSuey._private.initializeThisComponent(
        componentName,
        component,
        image
      );

      expect(component.className).to.match(/--enhanced( |$)/);

      setTimeout(function () {
        expect(component.className).to.match(/--enhanced( |$)/);

        document.body.removeChild(component);
        expect(isInDOMTree(image)).to.equal(false);

        done();
      }, 100);

    });

  });

});

describe('ChopSuey.registerComponent', function () {

  var
    classBase = 'registerComponent',
    classIndex = 1,
    newComponentName = function () {
      return classBase + classIndex++;
    };

  describe('validate args', function () {

    it('should return false with no args', function () {
      expect(ChopSuey.registerComponent()).to.equal(false);
    });

    it('should return false without bad args', function () {
      expect(ChopSuey.registerComponent({})).to.equal(false);
      expect(ChopSuey.registerComponent(1)).to.equal(false);
      expect(ChopSuey.registerComponent('a')).to.equal(false);
      expect(ChopSuey.registerComponent(function(){})).to.equal(false);
    });

    it('should return false without componentType or componentClass', function () {
      var componentName = newComponentName();

      expect(ChopSuey.registerComponent({
        componentType: componentName
      })).to.equal(false);

      expect(ChopSuey.registerComponent({
        componentClass: componentName
      })).to.equal(false);

      expect(ChopSuey.registerComponent({
        componentType : componentName,
        componentClass: componentName
      })).to.equal(true);
    });

  });

  describe('registered', function () {
    var componentName = newComponentName();

    it('should register a component', function () {
      ChopSuey.registerComponent({
        componentType : componentName,
        componentClass: componentName
      });

      expect(ChopSuey.registeredComponents(componentName)).to.be.an.instanceof(ChopSuey._private.Component);
      expect(ChopSuey.registeredComponents(componentName).componentType).to.equal(componentName);
      expect(ChopSuey.registeredComponents(componentName).componentClass).to.equal(componentName);
    });

    it('should override a registered component based on type', function () {
      expect(ChopSuey.registeredComponents(componentName).componentClass).to.equal(componentName);

      ChopSuey.registerComponent({
        componentType : componentName,
        componentClass: 'fishheads'
      });

      expect(ChopSuey.registeredComponents(componentName).componentClass).to.equal('fishheads');
    });

  });

});

describe('ChopSuey.registeredComponents', function () {

  var
    classBase = 'registeredComponents',
    classIndex = 1,
    newComponentName = function () {
      return classBase + classIndex++;
    };

  describe('validate args', function () {

    it('should return an object with no args', function () {
      expect(ChopSuey.registeredComponents()).to.be.an('object');
    });

    it('should return undefined with an unknown component', function () {
      var componentName = newComponentName();

      expect(ChopSuey.registeredComponents(componentName)).to.equal(undefined);
    });

    it('should return a registered component with a known component', function () {
      var componentName = newComponentName();

      ChopSuey.registerComponent({
        componentType : componentName,
        componentClass: componentName
      });

      expect(ChopSuey.registeredComponents(componentName)).to.be.an.instanceof(ChopSuey._private.Component);
      expect(ChopSuey.registeredComponents(componentName).componentType).to.equal(componentName);
      expect(ChopSuey.registeredComponents(componentName).componentClass).to.equal(componentName);
    });

  });

  describe('registering', function () {

    it('should increase the registered component length for new components', function () {
      var
        componentName = newComponentName(),
        currentLength = Object.keys(ChopSuey.registeredComponents()).length;

      ChopSuey.registerComponent({
        componentType : componentName,
        componentClass: componentName
      });

      expect(Object.keys(ChopSuey.registeredComponents()).length).to.equal(1 + currentLength);
    });

  });

});

describe('[private] Component.build', function () {

  it('should return false without a component', function () {
    var component = new ChopSuey._private.Component({});

    expect(component.build()).to.equal(false);
  });

  it('should return true with a component', function () {
    var component = new ChopSuey._private.Component({});

    expect(component.build('anything')).to.equal(true);
  });

});

describe('[private] Component.didBuild', function () {

  it('should return false without a component', function () {
    var component = new ChopSuey._private.Component({});

    expect(component.didBuild()).to.equal(false);
  });

  it('should return true with a component', function () {
    var
      component = new ChopSuey._private.Component({}),
      div = document.createElement('div');

    expect(component.didBuild(div)).to.equal(true);
  });

  it('should fire a componentDidBuild event on the element', function (done) {
    var
      component = new ChopSuey._private.Component({
        componentType : 'component',
        componentClass: 'component'
      }),
      div = document.createElement('div');

    document.body.appendChild(div);

    div.addEventListener('componentDidBuild', function () {
      document.body.removeChild(div);

      done();
    }, false);

    component.didBuild(div);

  });

});

describe('[private] Component.didEnhance', function () {

  it('should return false without a component', function () {
    var component = new ChopSuey._private.Component({});

    expect(component.didEnhance()).to.equal(false);
  });

  it('should return true with a component', function () {
    var
      component = new ChopSuey._private.Component({}),
      div = document.createElement('div');

    expect(component.didEnhance(div)).to.equal(true);
  });

  it('should fire a componentDidEnhance event on the element', function (done) {
    var
      component = new ChopSuey._private.Component({
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

describe('[private] Component.willBuild', function () {

  it('should return false without a component', function () {
    var component = new ChopSuey._private.Component({});

    expect(component.willBuild()).to.equal(false);
  });

  it('should return true with a component', function () {
    var
      component = new ChopSuey._private.Component({}),
      div = document.createElement('div');

    expect(component.willBuild(div)).to.equal(true);
  });

  it('should fire a componentWillBuild event on the element', function (done) {
    var
      component = new ChopSuey._private.Component({
        componentType : 'component',
        componentClass: 'component'
      }),
      div = document.createElement('div');

    document.body.appendChild(div);

    div.addEventListener('componentWillBuild', function () {
      document.body.removeChild(div);

      done();
    }, false);

    component.willBuild(div);

  });

});

describe('[private] Component.willEnhance', function () {

  it('should return false without a component', function () {
    var component = new ChopSuey._private.Component({});

    expect(component.willEnhance()).to.equal(false);
  });

  it('should return true with a component', function () {
    var
      component = new ChopSuey._private.Component({}),
      div = document.createElement('div');

    expect(component.willEnhance(div)).to.equal(true);
  });

  it('should fire a componentWillEnhance event on the element', function (done) {
    var
      component = new ChopSuey._private.Component({
        componentType : 'component',
        componentClass: 'component'
      }),
      div = document.createElement('div');

    document.body.appendChild(div);

    div.addEventListener('componentWillEnhance', function () {
      document.body.removeChild(div);

      done();
    }, false);

    component.willEnhance(div);

  });

});
