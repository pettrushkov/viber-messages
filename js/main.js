jQuery(document).ready(function($) {
    
  $('.modal-close a').click(function() {
    $('.modal-overlay').hide();
  });

  $('.modal-overlay').click(function(e) {
    var clicked = $(e.target);
    if (clicked.is('.modal') || clicked.parents().is('.modal')) {
    } else {
      $('.modal-overlay').hide();
    }
  });

});

