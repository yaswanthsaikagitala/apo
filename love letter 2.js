
$(function () {
  var $env = $('#envelope');
  var $flap = $env.find('.front.flap');
  var $letter = $env.find('.letter');
  var $lines = $letter.find('.words');
  var $hearts = $env.find('.heart');

  // helper to show lines with stagger
  function showLines() {
    $lines.each(function (i) {
      var $el = $(this);
      setTimeout(function () {
        $el.addClass('show');
      }, i * 140);
    });
  }

  function hideLines() {
    $lines.removeClass('show');
  }

  // open animation
  $('#open').on('click', function () {
    if ($env.hasClass('open')) return;
    $env.removeClass('close').addClass('open');
    // reveal letter after flap opens
    setTimeout(function () {
      showLines();
      // animate hearts with delays
      $hearts.each(function (i) {
        var $h = $(this);
        setTimeout(function () {
          $h.css({ opacity: 1 }).css({ transform: 'rotate(-45deg) scale(1)' });
        }, 300 + i * 120);
      });
    }, 420);
  });

  // close / reset
  $('#reset').on('click', function () {
    if (!$env.hasClass('open')) return;
    // hide content
    hideLines();
    $hearts.css({ opacity: 0, transform: 'rotate(-45deg) scale(0)' });
    // close after small delay so lines fade first
    setTimeout(function () {
      $env.removeClass('open').addClass('close');
    }, 220);
  });

  // optional: click envelope to toggle
  $env.on('click', function (e) {
    // avoid toggling when click buttons
    if ($(e.target).is('button')) return;
    if ($env.hasClass('open')) { $('#reset').trigger('click'); }
    else { $('#open').trigger('click'); }
  });

  // initial state: ensure lines hidden
  hideLines();
});