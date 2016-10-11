/* eslint no-unused-vars: 0 */
/* eslint no-undef: 0 */

var App = App || {};

App.Admin = {
  initialize: function() {
    var elemSwitch = document.querySelector('.js-ad-switch');
    var initSwitch = new Switchery(elemSwitch, {
      color: '#44db5e'
    });

    this.initNav();
  },

  initNav: function() {
    var slideTransition = 300,
        $nav = $('.js-ad-nav');

    $nav.doOnce(function() {
      var $navListItemActive = $('.ad-nav-list-item.active');

      $navListItemActive.doOnce(function() {
        $navListItemActive.find('.ad-nav-sub').slideToggle(slideTransition);
      });

      $nav.on('click', '.ad-nav-list-item.primary > a', function(e) {
        e.preventDefault();

        var $self = $(this),
            $parent = $self.parent('.ad-nav-list-item'),
            $navSub = $self.next();

        $nav.find('.ad-nav-list-item').not($parent).removeClass('active');
        $nav.find('.ad-nav-sub').not($navSub).slideUp(slideTransition);

        $parent.toggleClass('active');

        $navSub.slideToggle(slideTransition);
      });
    });
  }
};
