describe('ChopSuey.initializeComponent by componentType', function () {

  it('should return false with an unknown componentType', function () {
    expect(ChopSuey.initializeComponent({
      componentType: 'unknown'
    })).to.equal(false);
  });

  it('should return true with a known componentType', function () {
    ChopSuey.registerComponent({
      componentType : 'knownInitializeByType1',
      componentClass: 'knownInitializeByType1'
    });

    expect(ChopSuey.initializeComponent({
      componentType: 'knownInitializeByType1'
    })).to.equal(true);

  });

  it('should initialize all components of a componentType', function (done) {
    var
      uninitialized = document.createElement('div'),
      initialized   = document.createElement('div');

    ChopSuey.registerComponent({
      componentType : 'knownInitializeByType2',
      componentClass: 'knownInitializeByType2'
    });

    uninitialized.className = 'knownInitializeByType2 knownInitializeByType2--unenhanced';
    initialized.className = 'knownInitializeByType2 knownInitializeByType2--enhanced';

    document.body.appendChild(uninitialized);
    document.body.appendChild(initialized);

    expect(uninitialized.className).to.match(/--unenhanced( |$)/);
    expect(initialized.className).to.match(/--enhanced( |$)/);

    expect(ChopSuey.initializeComponent({
      componentType: 'knownInitializeByType2'
    })).to.equal(true);

    expect(uninitialized.className).to.match(/--built( |$)/);
    expect(initialized.className).to.match(/--enhanced( |$)/);

    setTimeout(function () {
      expect(uninitialized.className).to.match(/--enhanced( |$)/);
      expect(initialized.className).to.match(/--enhanced( |$)/);

      document.body.removeChild(uninitialized);
      document.body.removeChild(initialized);

      done();
    }, 100);

  });

});
