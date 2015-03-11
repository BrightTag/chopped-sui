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
