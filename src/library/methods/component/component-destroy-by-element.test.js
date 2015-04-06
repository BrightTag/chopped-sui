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
