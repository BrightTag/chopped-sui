<?php
class ChopSuey {
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

  public function accordion($data) {
    return $this->mustache->render('accordion/accordion', $data);
  }

  public function dropDown($data) {
    return $this->mustache->render('drop-down/drop-down', $data);
  }

  public function main.js($data) {
    return $this->mustache->render('main.js/main.js', $data);
  }
}
