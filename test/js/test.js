
  describe('ChopSuey', function () {

    it('should be an object', function () {
      expect(ChopSuey).to.be.an('object');
    });

    it('should have a registeredComponents property', function () {
      expect(ChopSuey.registeredComponents).to.be.an('function');
    });

    it('should have an initializeComponent method', function () {
      expect(ChopSuey.initializeComponent).to.be.an('function');
    });

    it('should have a registerComponent method', function () {
      expect(ChopSuey.registerComponent).to.be.an('function');
    });

  });

  describe('ChopSuey.initializeComponent', function () {

    it('should be a function', function () {
      expect(ChopSuey.initializeComponent).to.be.an('function');
    });

    it('should return false with no args', function () {
      expect(ChopSuey.initializeComponent()).to.equal(false);
    });

    it('should return false with bad args', function () {
      expect(ChopSuey.initializeComponent({})).to.equal(false);
      expect(ChopSuey.initializeComponent(1)).to.equal(false);
      expect(ChopSuey.initializeComponent('a')).to.equal(false);
      expect(ChopSuey.initializeComponent(function(){})).to.equal(false);
    });

    describe('ChopSuey.initializeComponent by componentType', function () {

      it('should return false with an unknown componentType', function () {
        expect(ChopSuey.initializeComponent({
          componentType: 'unknown'
        })).to.equal(false);
      });

      it('should return true with a known componentType', function () {
        ChopSuey.registerComponent({
          componentType : 'known1',
          componentClass: 'known1'
        });

        expect(ChopSuey.initializeComponent({
          componentType: 'known1'
        })).to.equal(true);

      });

      it('should initialize all components of a componentType', function () {
        var
          uninitialized = document.createElement('div'),
          initialized   = document.createElement('div');

        uninitialized.className = 'known2 known2--unenhanced';
        initialized.className = 'known2 known2--enhanced';

        document.body.appendChild(uninitialized);
        document.body.appendChild(initialized);

        ChopSuey.registerComponent({
          componentType : 'known2',
          componentClass: 'known2'
        });

        document.append()

        expect(uninitialized.className()).to.equal('known2   known2--enhanced');
        expect(initialized.className()).to.equal('known2 known2--enhanced');

        document.body.removeChild(uninitialized);
        document.body.removeChild(initialized);
      });

    });

  });
