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
