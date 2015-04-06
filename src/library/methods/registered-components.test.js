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
