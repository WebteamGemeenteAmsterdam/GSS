$(function() {
  var loader = '<div id="loader">Laden...</div>';
  $('.gss-search-results').append(loader);
});
var TimerVerwijderGemeenteAmsterdam;

function removeGemeenteAmsterdam() {
  if ($('.gs-title a').length) {
    $('.gs-title a').html(function(index, text) {
      var amsterdameruit = text.split(" - ");
      if (typeof(amsterdameruit[2]) !== 'undefined') {
        return amsterdameruit[0] + " - " + amsterdameruit[1];
      } else if (typeof(amsterdameruit[1]) !== 'undefined') {
        return amsterdameruit[0];
      }
    });
    clearTimeout(TimerVerwijderGemeenteAmsterdam);
  }
}

function gcseReady() {

  var scripts = document.getElementsByTagName('script');
  var i = scripts.length;
  while (i--) {
    if (scripts[i].src === "https://cse.google.com/adsense/search/async-ads.js") {
      scripts[i].src = ""; // Your source here
      console.log("gedaan");
      break;
    }
  }


  $('#Zoekformulier_site_form').remove();
  $('#gsc-i-id1').bind("enterKey", function(e) {
    TimerVerwijderGemeenteAmsterdam = setTimeout(removeGemeenteAmsterdam, 2000);
  });
  $('#gsc-i-id1').keyup(function(e) {
    if (e.keyCode == 13) {
      $(this).trigger("enterKey");
    }
  });
  $(document).on("click", '.gsq_a', function(e) {
    TimerVerwijderGemeenteAmsterdam = setTimeout(removeGemeenteAmsterdam, 2000);
  });
  $(".gsc-search-button.gsc-search-button-v2").click(function() {
    TimerVerwijderGemeenteAmsterdam = setTimeout(removeGemeenteAmsterdam, 2000);
  });
  $('input.gsc-search-button').attr('src', '');
  $('input.gsc-input').attr('placeholder', 'Zoeken').attr('title', 'Zoeken');
  var interval = setInterval(function() {
    if ($(".gsc-wrapper").length) {
      $('#loader').remove();
      clearInterval(interval);
    }
  }, 100);
  return;
}
window.__gcse = {
  callback: gcseReady
};
(function() {
  var cx = '000633015535049998160:WMX-803900240';
  var gcse = document.createElement('script');
  gcse.type = 'text/javascript';
  gcse.async = true;
  gcse.src = 'https://cse.google.com/cse.js?cx=' + cx;
  var s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(gcse, s);
})();
