<?php
class ComponentLibrary {
  private $mustache;

  public function __construct($data = array()) {
    require 'mustache_php/src/Mustache/Autoloader.php';
    Mustache_Autoloader::register();
    $config = array(
      "loader" => new Mustache_Loader_FilesystemLoader(dirname(__FILE__).'/../templates')
    );

    if (isset($data['partials_loader'])) {
      $config['partials_loader'] = new Mustache_Loader_FilesystemLoader(dirname(__FILE__) . '/../templates/' . $data['partials_loader']);
    }
    $this->mustache = new Mustache_Engine($config);
  }

  public function getChoppedSUIChoppedSui.js($data) {
    return $this->mustache->render('chopped-sui.js/chopped-sui.js', $data);
  }

  public function getChoppedSUIChoppedSui.min.js($data) {
    return $this->mustache->render('chopped-sui.min.js/chopped-sui.min.js', $data);
  }

  public function getChoppedSUIComponents.js($data) {
    return $this->mustache->render('components.js/components.js', $data);
  }

  public function getChoppedSUIComponents.min.js($data) {
    return $this->mustache->render('components.min.js/components.min.js', $data);
  }
}
