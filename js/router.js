var App = App || {};

App.Router = {
  initialize: function() {
    // App.Header.initialize();

    var component = document.body.className.replace(/blippe-/g, '').split(/\s+/)[0];
    var componentPieces = component.split('-');
    var componentPiecesLength = componentPieces.length;

    component = '';

    for (var i = 0; i < componentPiecesLength; i++) {
      component += this.capitalizeFirstLetter(componentPieces[i]);
    }

    if (component && App[component] &&
        typeof App[component].initialize === 'function') {
          App[component].initialize();
    }
  },

  capitalizeFirstLetter: function(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
};

$(document).ready(function() {
  App.Router.initialize();
});
