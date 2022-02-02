

$(".slider").slick({
  infinite: true,
  arrows: false,
  dots: false,
  autoplay: false,
  speed: 1200,
  slidesToShow: 1,
  slidesToScroll: 1
});


//ticking machine
var percentTime;
var tick;
var time = .1;
var progressBarIndex = 0;

$('.progressBarContainer .progressBar').each(function (index) {
  var progress = "<div class='inProgress inProgress" + index + "'></div>";
  $(this).html(progress);
});

function startProgressbar() {
  resetProgressbar();
  percentTime = 0;
  tick = setInterval(interval, 200);
}

function interval() {
  if ($('.slider .slick-track div[data-slick-index="' + progressBarIndex + '"]').attr("aria-hidden") === "true") {
    progressBarIndex = $('.slider .slick-track div[aria-hidden="false"]').data("slickIndex");
    startProgressbar();
  } else {
    percentTime += 1 / (time + 5);
    $('.inProgress' + progressBarIndex).css({
      width: percentTime + "%"
    });
    if (percentTime >= 100) {
      $('.single-item').slick('slickNext');
      progressBarIndex++;
      
      if (progressBarIndex > 2) {
        progressBarIndex = 0;
        $(this).addClass('outs');
      }
      startProgressbar();
    }
  }
}

function resetProgressbar() {
  $('.inProgress').css({
    width: 0 + '%'
  });

  clearInterval(tick);
}
startProgressbar();
// End ticking machine

$('.item').click(function () {
  clearInterval(tick);
  var goToThisIndex = $(this).find("span").data("slickIndex");
  $('.single-item').slick('slickGoTo', goToThisIndex, false);
  startProgressbar();
});
//# sourceURL=pen.js

document.addEventListener("mousemove", parallax);
function parallax(e) {
  document.querySelectorAll(".object").forEach(function (move) {

    var moving_value = move.getAttribute("data-value");
    var x = (e.clientX * moving_value) / 150;
    var y = (e.clientY * moving_value) / 150;
    move.style.transform = "translateX(" + x + "px) translateY(" + y + "px)";

  });
}