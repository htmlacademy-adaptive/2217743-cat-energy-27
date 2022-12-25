(function ($) {
  var $dragMe = $(".slider-container__toggle-drag"),
    $container = $(".slider-container"),
    $viewAfter = $(".slider-container__view-after");
  $dragMe.draggable({
    containment: "parent",
    drag: function () {
      $viewAfter.css({
        width: parseFloat($(this).css('left')) + 3
      });
    }
  });
  $container.on("click", function (event) {
    var eventLeft = event.pageX - $container.offset().left - 15;
    animateTo(eventLeft);
  });
  animateTo("50%");

  function animateTo(_left) {
    $dragMe.animate({
      left: _left
    }, 'slow', 'linear');
    $viewAfter.animate({
      width: _left
    }, 'slow', 'linear');
  }
})(jQuery);
