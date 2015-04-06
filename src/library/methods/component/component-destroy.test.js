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
