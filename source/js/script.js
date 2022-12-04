(function ($) {
  // получаем доступ к элементу слайдера на странице
  var $dragMe = $(".toggle-drag"),
    // к слайдеру
    $container = $(".slider-container"),
    // и картинке слева
    $viewAfter = $(".view-after");
  // используем свойство draggable из библиотеки с интерфейсом, чтобы получить координаты сдвига слайдера
  $dragMe.draggable({
    containment: "parent",
    drag: function () {
      // при перемещении слайдера меняем ширину картинки слева в стилях
      $viewAfter.css({
        width: parseFloat($(this).css('left')) + 3
      });
    }
  });
  // добавляем реакцию на клик по картинке
  $container.on("click", function (event) {
    // получаем координаты клика, чтобы сместить туда слайдер
    var eventLeft = event.pageX - $container.offset().left - 15;
    // плавно сдвигаем слайдер
    animateTo(eventLeft);
  });
  // функция сдвига слайдера при клике, на входе получаем новые координаты границы картинок
  function animateTo(_left) {
    // анимируем сдвиг слайдера
    $dragMe.animate({
      left: _left
    }, 'slow', 'linear');
    // и картинки
    $viewAfter.animate({
      width: _left
    }, 'slow', 'linear');
  }
})(jQuery);
