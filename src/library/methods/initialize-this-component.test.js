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
