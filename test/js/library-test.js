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

describe('Component', function () {

  describe('constructor', function () {

    it('should be a constructor', function () {
      var component = new ChopSuey._Component({});

      expect(component).to.be.an.instanceof(ChopSuey._Component);
    });

    it('should have default properties', function () {
      var component = new ChopSuey._Component({});

      expect(component.componentType).to.equal('component');
      expect(component.componentClass).to.equal('component');
    });

    it('should allow properties to be overwritten', function () {
      var
        component = new ChopSuey._Component({
          componentType : 'niftyComponent',
          componentClass: 'nifty-component'
        });

      expect(component.componentType).to.equal('niftyComponent');
      expect(component.componentClass).to.equal('nifty-component');
    });

    it('should not allow build to be overwritten at creation', function () {
      var
        specialBuild = function () { return 'build'; },
        component    = new ChopSuey._Component({
          build: specialBuild
        });

      expect(component.build).to.not.equal(specialBuild);
    });

    it('should not allow willBuild to be overwritten at creation', function () {
      var
        specialWillBuild = function () { return 'willBuild'; },
        component        = new ChopSuey._Component({
          willBuild: specialWillBuild
        });

      expect(component.willBuild).to.not.equal(specialWillBuild);
    });

    it('should not allow didBuild to be overwritten at creation', function () {
      var
        specialDidBuild = function () { return 'didBuild'; },
        component       = new ChopSuey._Component({
          didBuild: specialDidBuild
        });

      expect(component.didBuild).to.not.equal(specialDidBuild);
    });

    it('should not allow destroy to be overwritten at creation', function () {
      var
        specialDestroy = function () { return 'destroy'; },
        component      = new ChopSuey._Component({
          destroy: specialDestroy
        });

      expect(component.destroy).to.not.equal(specialDestroy);
    });

    it('should not allow willDestroy to be overwritten at creation', function () {
      var
        specialWillDestroy = function () { return 'willDestroy'; },
        component          = new ChopSuey._Component({
          willDestroy: specialWillDestroy
        });

      expect(component.willDestroy).to.not.equal(specialWillDestroy);
    });

    it('should not allow didDestroy to be overwritten at creation', function () {
      var
        specialDidDestroy = function () { return 'didDestroy'; },
        component         = new ChopSuey._Component({
          didDestroy: specialDidDestroy
        });

      expect(component.didDestroy).to.not.equal(specialDidDestroy);
    });

    it('should not allow enhance to be overwritten at creation', function () {
      var
        specialEnhance = function () { return 'enhance'; },
        component      = new ChopSuey._Component({
          enhance: specialEnhance
        });

      expect(component.enhance).to.not.equal(specialEnhance);
    });

    it('should not allow willEnhance to be overwritten at creation', function () {
      var
        specialWillEnhance = function () { return 'willEnhance'; },
        component          = new ChopSuey._Component({
          willEnhance: specialWillEnhance
        });

      expect(component.willEnhance).to.not.equal(specialWillEnhance);
    });

    it('should not allow didEnhance to be overwritten at creation', function () {
      var
        specialDidEnhance = function () { return 'didEnhance'; },
        component         = new ChopSuey._Component({
          didEnhance: specialDidEnhance
        });

      expect(component.didEnhance).to.not.equal(specialDidEnhance);
    });

  });

  describe('methods', function () {
    var component = new ChopSuey._Component({});

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

    it('should have a destroy method', function () {
      expect(component).to.respondTo('destroy');
      expect(component.destroy).to.be.a('function');
    });

    it('should have a willDestroy method', function () {
      expect(component).to.respondTo('willDestroy');
      expect(component.willDestroy).to.be.a('function');
    });

    it('should have a didDestroy method', function () {
      expect(component).to.respondTo('didDestroy');
      expect(component.didDestroy).to.be.a('function');
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

describe('ChopSuey.registerComponent', function () {

  var
    classBase        = 'registerComponent',
    classIndex       = 1,
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
    var
      componentName = newComponentName(),
      build         = function () { return 'build' },
      destroy       = function () { return 'destroy' },
      enhance       = function () { return 'enhance' };

    it('should register a component', function () {
      ChopSuey.registerComponent({
        componentType : componentName,
        componentClass: componentName,
        build         : build,
        destroy         : destroy,
        enhance       : enhance
      });

      expect(ChopSuey.registeredComponents(componentName)).to.be.an.instanceof(ChopSuey._Component);
      expect(ChopSuey.registeredComponents(componentName).componentType).to.equal(componentName);
      expect(ChopSuey.registeredComponents(componentName).componentClass).to.equal(componentName);
      expect(ChopSuey.registeredComponents(componentName).build).to.equal(build);
      expect(ChopSuey.registeredComponents(componentName).destroy).to.equal(destroy);
      expect(ChopSuey.registeredComponents(componentName).enhance).to.equal(enhance);
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
    classBase        = 'registeredComponents',
    classIndex       = 1,
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

      expect(ChopSuey.registeredComponents(componentName)).to.be.an.instanceof(ChopSuey._Component);
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

describe('Component.destroy (by element)', function () {

  var
    classBase        = 'destroyThisComponent',
    classIndex       = 1,
    newComponentName = function () {
      return classBase + classIndex++;
    };

  describe('validate args', function () {

    it('should return false without a componentType', function () {
      var
        component     = document.createElement('div'),
        componentName = newComponentName();

      component.className = componentName + ' ' + componentName + '--unenehanced';

      ChopSuey.registerComponent({
        componentType : componentName,
        componentClass: componentName
      });

      expect(ChopSuey.registeredComponents()[componentName]._destroyByElement(
        undefined,
        component,
        undefined
      )).to.equal(false);
    });

    it('should return false without a known componentType', function () {
      var
        component      = document.createElement('div'),
        componentName1 = newComponentName(),
        componentName2 = newComponentName();

      component.className = componentName1 + ' ' + componentName1 + '--unenehanced';

      ChopSuey.registerComponent({
        componentType : componentName1,
        componentClass: componentName1
      });

      expect(ChopSuey.registeredComponents()[componentName1]._destroyByElement(
        componentName2,
        component,
        undefined
      )).to.equal(false);
    });

    it('should return false without a matching componentType', function () {
      var
        component      = document.createElement('div'),
        componentName1 = newComponentName(),
        componentName2 = newComponentName();

      ChopSuey.registerComponent({
        componentType : componentName1,
        componentClass: componentName1
      });

      component.className = componentName2 + ' ' + componentName2 + '--enhanced';

      document.body.appendChild(component);

      expect(ChopSuey.registeredComponents()[componentName1]._destroyByElement(
        componentName1,
        component,
        undefined
      )).to.equal(false);

      document.body.removeChild(component);
    });

    it('should return true with a known, matching componentType', function () {
      var
        component     = document.createElement('div'),
        componentName = newComponentName();

      ChopSuey.registerComponent({
        componentType : componentName,
        componentClass: componentName
      });

      component.className = componentName + ' ' + componentName + '--enhanced';

      document.body.appendChild(component);

      expect(ChopSuey.registeredComponents()[componentName]._destroyByElement(
        componentName,
        component,
        undefined
      )).to.equal(true);

    });

  });

  describe('by component', function () {

    it('should destroy an enhanced component', function () {
      var
        component     = document.createElement('div'),
        componentName = newComponentName();

      ChopSuey.registerComponent({
        componentType : componentName,
        componentClass: componentName
      });

      component.className = componentName + ' ' + componentName + '--enhanced';

      document.body.appendChild(component);

      ChopSuey.registeredComponents()[componentName]._destroyByElement(
        componentName,
        component,
        undefined
      );

      expect(isInDOMTree(component)).to.equal(false);
    });

    it('should destroy an unenhanced component', function () {
      var
        component     = document.createElement('div'),
        componentName = newComponentName();

      ChopSuey.registerComponent({
        componentType : componentName,
        componentClass: componentName
      });

      component.className = componentName + ' ' + componentName + '--unenhanced';

      document.body.appendChild(component);

      ChopSuey.registeredComponents()[componentName]._destroyByElement(
        componentName,
        component,
        undefined
      );

      expect(isInDOMTree(component)).to.equal(false);
    });

  });

});

describe('Component.destroy (by type)', function () {

  var
    classBase        = 'destroyAllOfType',
    classIndex       = 1,
    newComponentName = function () {
      return classBase + classIndex++;
    };

  describe('validate args', function () {

    it('should return false with an bad args', function () {
      var componentName = newComponentName();

      ChopSuey.registerComponent({
        componentType : componentName,
        componentClass: componentName
      });

      expect(ChopSuey.registeredComponents()[componentName]._destroyByType()).to.equal(false);

    });

    it('should return true with good args', function () {
      var componentName = newComponentName();

      ChopSuey.registerComponent({
        componentType : componentName,
        componentClass: componentName
      });

      expect(ChopSuey.registeredComponents()[componentName]._destroyByType(componentName)).to.equal(true);

    });

  });

  describe('by type', function () {

    it('should destroy all enhanced components of a componentType', function () {
      var
        enhanced1     = document.createElement('div'),
        enhanced2     = document.createElement('div'),
        componentName = newComponentName();

      ChopSuey.registerComponent({
        componentType : componentName,
        componentClass: componentName
      });

      enhanced1.className = componentName + ' ' + componentName + '--enhanced';
      enhanced2.className = componentName + ' ' + componentName + '--enhanced';

      document.body.appendChild(enhanced1);
      document.body.appendChild(enhanced2);

      ChopSuey.registeredComponents()[componentName]._destroyByType(componentName);

      expect(isInDOMTree(enhanced1)).to.equal(false);
      expect(isInDOMTree(enhanced2)).to.equal(false);

    });

    it('should destroy unenhanced components of a componentType', function () {
      var
        unenhanced    = document.createElement('div'),
        componentName = newComponentName();

      ChopSuey.registerComponent({
        componentType : componentName,
        componentClass: componentName
      });

      unenhanced.className = componentName + ' ' + componentName + '--unenhanced';

      document.body.appendChild(unenhanced);

      ChopSuey.registeredComponents()[componentName]._destroyByType(componentName);

      expect(isInDOMTree(unenhanced)).to.equal(false);
    });

  });

});

describe('Component.destroy', function () {

  var
    classBase        = 'destroyComponent',
    classIndex       = 1,
    newComponentName = function () {
      return classBase + classIndex++;
    };

  describe('validate args', function () {

    it('should return false with bad args', function () {
      var componentName = newComponentName();

      ChopSuey.registerComponent({
        componentType : componentName,
        componentClass: componentName
      });

      expect(ChopSuey.registeredComponents()[componentName].destroy({})).to.equal(false);
      expect(ChopSuey.registeredComponents()[componentName].destroy(1)).to.equal(false);
      expect(ChopSuey.registeredComponents()[componentName].destroy('a')).to.equal(false);
      expect(ChopSuey.registeredComponents()[componentName].destroy(function(){})).to.equal(false);
    });

    it('should return true with good args', function () {
      var
        component     = document.createElement('div'),
        componentName = newComponentName();

      ChopSuey.registerComponent({
        componentType : componentName,
        componentClass: componentName
      });

      component.className = componentName + ' ' + componentName + '--enhanced';

      document.body.appendChild(component);

      expect(ChopSuey.registeredComponents()[componentName].destroy(component)).to.equal(true);
    });

  });

  describe('by type', function () {

    it('should destroy all of a componentType with no component or image', function () {
      var
        component1    = document.createElement('div'),
        component2    = document.createElement('div'),
        componentName = newComponentName();

      ChopSuey.registerComponent({
        componentType : componentName,
        componentClass: componentName
      });

      component1.className = componentName + ' ' + componentName + '--enhanced';
      component2.className = componentName + ' ' + componentName + '--enhanced';

      document.body.appendChild(component1);
      document.body.appendChild(component2);

      ChopSuey.registeredComponents()[componentName].destroy();

      expect(isInDOMTree(component1)).to.equal(false);
      expect(isInDOMTree(component2)).to.equal(false);
    });

  });

  describe('by element (component)', function () {

    it('should destroy a single component given that component', function () {
      var
        component1    = document.createElement('div'),
        component2    = document.createElement('div'),
        componentName = newComponentName();

      ChopSuey.registerComponent({
        componentType : componentName,
        componentClass: componentName
      });

      component1.className = componentName + ' ' + componentName + '--enhanced';
      component2.className = componentName + ' ' + componentName + '--enhanced';

      document.body.appendChild(component1);
      document.body.appendChild(component2);

      ChopSuey.registeredComponents()[componentName].destroy(component1);

      expect(isInDOMTree(component1)).to.equal(false);
      expect(isInDOMTree(component2)).to.equal(true);

      document.body.removeChild(component2);
    });

  });

});

describe('Component.didBuild', function () {

  it('should return false without a component', function () {
    var component = new ChopSuey._Component({});

    expect(component.didBuild()).to.equal(false);
  });

  it('should return true with a component', function () {
    var
      component = new ChopSuey._Component({}),
      div       = document.createElement('div');

    expect(component.didBuild(div)).to.equal(true);
  });

  it('should fire a componentDidBuild event on the element', function (done) {
    var
      component = new ChopSuey._Component({
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

describe('Component.didDestroy', function () {

  it('should return false without a component', function () {
    var component = new ChopSuey._Component({});

    expect(component.didDestroy()).to.equal(false);
  });

  it('should return true with a component', function () {
    var
      component = new ChopSuey._Component({}),
      div       = document.createElement('div');

    expect(component.didDestroy(div)).to.equal(true);
  });

  it('should fire a componentDidDestroy event on the element', function (done) {
    var
      component = new ChopSuey._Component({
        componentType : 'component',
        componentClass: 'component'
      }),
      div = document.createElement('div');

    document.body.appendChild(div);

    div.addEventListener('componentDidDestroy', function () {
      document.body.removeChild(div);

      done();
    }, false);

    component.didDestroy(div);

  });

});

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

describe('Component.enhance', function () {

  it('should return false without a component', function () {
    var component = new ChopSuey._Component({});

    expect(component.enhance()).to.equal(false);
  });

  it('should return true with a component', function () {
    var component = new ChopSuey._Component({});

    expect(component.enhance('anything')).to.equal(true);
  });

});

describe('Component.initialize (by element)', function () {

  var
    classBase        = 'initializeThisComponent',
    classIndex       = 1,
    newComponentName = function () {
      return classBase + classIndex++;
    };

  describe('validate args', function () {

    it('should return false without a componentType', function () {
      var
        component     = document.createElement('div'),
        componentName = newComponentName();

      component.className = componentName + ' ' + componentName + '--unenehanced';

      ChopSuey.registerComponent({
        componentType : componentName,
        componentClass: componentName
      });

      expect(ChopSuey.registeredComponents()[componentName]._initializeByElement(
        undefined,
        component,
        undefined
      )).to.equal(false);
    });

    it('should return false without an known componentType', function () {
      var
        component      = document.createElement('div'),
        componentName1 = newComponentName(),
        componentName2 = newComponentName();

      component.className = componentName1 + ' ' + componentName1 + '--unenehanced';

      ChopSuey.registerComponent({
        componentType : componentName1,
        componentClass: componentName1
      });

      expect(ChopSuey.registeredComponents()[componentName1]._initializeByElement(
        componentName2,
        component,
        undefined
      )).to.equal(false);
    });

    it('should return false without a matching componentType', function () {
      var
        component      = document.createElement('div'),
        componentName1 = newComponentName(),
        componentName2 = newComponentName();

      ChopSuey.registerComponent({
        componentType : componentName1,
        componentClass: componentName1
      });

      component.className = componentName2 + ' ' + componentName2 + '--uninitialized';

      document.body.appendChild(component);

      expect(ChopSuey.registeredComponents()[componentName1]._initializeByElement(
        componentName1,
        component,
        undefined
      )).to.equal(false);

      document.body.removeChild(component);
    });

    it('should return true with a known, matching componentType', function () {
      var
        component     = document.createElement('div'),
        componentName = newComponentName();

      ChopSuey.registerComponent({
        componentType : componentName,
        componentClass: componentName
      });

      component.className = componentName + ' ' + componentName + '--uninitialized';

      document.body.appendChild(component);

      expect(ChopSuey.registeredComponents()[componentName]._initializeByElement(
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
        component     = document.createElement('div'),
        componentName = newComponentName();

      ChopSuey.registerComponent({
        componentType : componentName,
        componentClass: componentName
      });

      component.className = componentName + ' ' + componentName + '--unenhanced';

      document.body.appendChild(component);

      expect(component.className).to.match(/--unenhanced( |$)/);

      ChopSuey.registeredComponents()[componentName]._initializeByElement(
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
        component     = document.createElement('div'),
        componentName = newComponentName();

      ChopSuey.registerComponent({
        componentType : componentName,
        componentClass: componentName
      });

      component.className = componentName + ' ' + componentName + '--enhanced';

      document.body.appendChild(component);

      expect(component.className).to.match(/--enhanced( |$)/);

      ChopSuey.registeredComponents()[componentName]._initializeByElement(
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
        component     = document.createElement('div'),
        image         = document.createElement('img'),
        componentName = newComponentName();

      ChopSuey.registerComponent({
        componentType : componentName,
        componentClass: componentName
      });

      component.className = componentName + ' ' + componentName + '--unenhanced';

      document.body.appendChild(component);
      document.body.appendChild(image);

      expect(component.className).to.match(/--unenhanced( |$)/);

      ChopSuey.registeredComponents()[componentName]._initializeByElement(
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
        component     = document.createElement('div'),
        image         = document.createElement('img'),
        componentName = newComponentName();

      ChopSuey.registerComponent({
        componentType : componentName,
        componentClass: componentName
      });

      component.className = componentName + ' ' + componentName + '--enhanced';

      document.body.appendChild(component);
      document.body.appendChild(image);

      expect(component.className).to.match(/--enhanced( |$)/);

      ChopSuey.registeredComponents()[componentName]._initializeByElement(
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

describe('Component.initialize (by type)', function () {

  var
    classBase        = 'initializeAllOfType',
    classIndex       = 1,
    newComponentName = function () {
      return classBase + classIndex++;
    };

  describe('validate args', function () {

    it('should return false with an bad args', function () {
      var componentName = newComponentName();

      ChopSuey.registerComponent({
        componentType : componentName,
        componentClass: componentName
      });

      expect(ChopSuey.registeredComponents()[componentName]._initializeByType()).to.equal(false);

    });

    it('should return true with good args', function () {
      var componentName = newComponentName();

      ChopSuey.registerComponent({
        componentType : componentName,
        componentClass: componentName
      });

      expect(ChopSuey.registeredComponents()[componentName]._initializeByType( componentName)).to.equal(true);

    });

  });

  describe('by type', function () {

    it('should build and enhance all unenhanced components of a componentType', function (done) {
      var
        unenhanced1   = document.createElement('div'),
        unenhanced2   = document.createElement('div'),
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

      ChopSuey.registeredComponents()[componentName]._initializeByType(componentName);

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
        built1        = document.createElement('div'),
        built2        = document.createElement('div'),
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

      expect(ChopSuey.registeredComponents()[componentName]._initializeByType(componentName)).to.equal(true);

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
        enhanced      = document.createElement('div'),
        componentName = newComponentName();

      ChopSuey.registerComponent({
        componentType : componentName,
        componentClass: componentName
      });

      enhanced.className = componentName + ' ' + componentName + '--enhanced';

      document.body.appendChild(enhanced);

      expect(enhanced.className).to.match(/--enhanced( |$)/);

      expect(ChopSuey.registeredComponents()[componentName]._initializeByType(componentName)).to.equal(true);

      expect(enhanced.className).to.match(/--enhanced( |$)/);

      setTimeout(function () {
        expect(enhanced.className).to.match(/--enhanced( |$)/);

        document.body.removeChild(enhanced);

        done();
      }, 100);

    });

  });

});

describe('Component.initialize', function () {

  var
    classBase        = 'initializeComponent',
    classIndex       = 1,
    newComponentName = function () {
      return classBase + classIndex++;
    };

  describe('validate args', function () {

    it('should return false with bad args', function () {
      var componentName = newComponentName();

      ChopSuey.registerComponent({
        componentType : componentName,
        componentClass: componentName
      });

      expect(ChopSuey.registeredComponents()[componentName].initialize({})).to.equal(false);
      expect(ChopSuey.registeredComponents()[componentName].initialize(1)).to.equal(false);
      expect(ChopSuey.registeredComponents()[componentName].initialize('a')).to.equal(false);
      expect(ChopSuey.registeredComponents()[componentName].initialize(function(){})).to.equal(false);
    });

    it('should return true with good args', function () {
      var
        component     = document.createElement('div'),
        componentName = newComponentName();

      ChopSuey.registerComponent({
        componentType : componentName,
        componentClass: componentName
      });

      component.className = componentName + ' ' + componentName + '--unenhanced';

      document.body.appendChild(component);

      expect(ChopSuey.registeredComponents()[componentName].initialize(component)).to.equal(true);

      document.body.removeChild(component);
    });

  });

  describe('by type', function () {

    it('should initialize all of a componentType with no component or image', function (done) {
      var
        component1    = document.createElement('div'),
        component2    = document.createElement('div'),
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

      ChopSuey.registeredComponents()[componentName].initialize();

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

  describe('by element (component)', function () {

    it('should initialize a single component given that component', function (done) {
      var
        component1    = document.createElement('div'),
        component2    = document.createElement('div'),
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

      ChopSuey.registeredComponents()[componentName].initialize(component1);

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

  describe('by element (image)', function () {

    it('should initialize a single component given that component\'s image initializer', function (done) {
      var
        component1    = document.createElement('div'),
        image1        = document.createElement('img'),
        component2    = document.createElement('div'),
        image2        = document.createElement('img'),
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

      ChopSuey.registeredComponents()[componentName].initialize(image1);

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

describe('Component.willBuild', function () {

  it('should return false without a component', function () {
    var component = new ChopSuey._Component({});

    expect(component.willBuild()).to.equal(false);
  });

  it('should return true with a component', function () {
    var
      component = new ChopSuey._Component({}),
      div       = document.createElement('div');

    expect(component.willBuild(div)).to.equal(true);
  });

  it('should fire a componentWillBuild event on the element', function (done) {
    var
      component = new ChopSuey._Component({
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

describe('Component.willEnhance', function () {

  it('should return false without a component', function () {
    var component = new ChopSuey._Component({});

    expect(component.willEnhance()).to.equal(false);
  });

  it('should return true with a component', function () {
    var
      component = new ChopSuey._Component({}),
      div       = document.createElement('div');

    expect(component.willEnhance(div)).to.equal(true);
  });

  it('should fire a componentWillEnhance event on the element', function (done) {
    var
      component = new ChopSuey._Component({
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
