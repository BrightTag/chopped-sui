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
