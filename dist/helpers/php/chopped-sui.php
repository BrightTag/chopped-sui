<?php
class ComponentLibrary {
  private $mustache;

  public function __construct() {
    require 'mustache_php/src/Mustache/Autoloader.php';
    Mustache_Autoloader::register();
    $this->mustache = new Mustache_Engine(array(
      "loader" => new Mustache_Loader_FilesystemLoader(dirname(__FILE__).'/templates')
    ));
  }

  public function getComponent($component, $params, $built=FALSE) {
    switch($component) {
      case "dropdown":
        return $this->getDropDown($params["id"], $params["buttonText"], $params["options"], $built);
        break;
    }
  }

  private function getDropDown($id, $buttonText, $options, $built) {
    $data = array(
      "id" => $id,
      "buttonText" => $buttonText,
      "options" => $options,
    );
    $template = "dropdown/";
    $template .= $built ? "built" : "unbuilt";
    return $this->mustache->render($template, $data);
  }

  public function getChoppedSUIDropDown($data) {
    return $this->mustache->render('drop-down/drop-down', $data);
  }

  public function getChoppedSUITabs($data) {
    return $this->mustache->render('tabs/tabs', $data);
  }

}
