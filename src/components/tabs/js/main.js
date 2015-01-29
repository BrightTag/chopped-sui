(function (ChopSuey) {

  'use strict';

  function hasClass(e,cls) {
    return e.className.match(('(\\s^|)'+cls+'(\\s|)'));
  }

  function addClass(e,cls) {
    if(!hasClass(e,cls)) {
      e.className += ' ' + cls;
    }
  }

  function removeAllSiblingActiveClasses(e,cls) {
    var children = e.children;
    for (var i = 0; i < children.length; i +=1) {

      var child = children[i];
      if (hasClass(child, cls)) {
        var reg = new RegExp('(\\s^|\\s)'+cls+'(\\s|)', 'g');
        child.className=child.className.replace(reg,'');
      }
    }
  }

  function toggleActiveClass (component) {
  	var activeClassName = 'active';

    component.addEventListener('click', function(e) {
      // e = e || window.event;
      var
        tab = e.target.parentElement,
        parentNode = tab.parentElement;

      if(hasClass(tab, 'nav-tab') && !hasClass(tab, 'nav-tab '+activeClassName)){
        removeAllSiblingActiveClasses(parentNode, activeClassName);
        addClass(tab, activeClassName);
      }
    });
  }

  ChopSuey.registerComponent({

    componentType: 'tabs',

    componentClass: 'tabs',

    build: function () {},

    enhance: toggleActiveClass

  });

}(window.ChopSuey));
