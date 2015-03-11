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
