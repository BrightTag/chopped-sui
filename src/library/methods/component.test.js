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
