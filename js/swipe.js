var animating = false;
var cardsCounter = 0;
var numOfCards = 6;
var decisionVal = 80;
var pullDeltaX = 0;
var deg = 0;
var $card, $cardReject, $cardLike;

function pullChange() {
  animating = true;
  deg = pullDeltaX / 10;
  $card.css("transform", "translateX(" + pullDeltaX + "px) rotate(" + deg + "deg)");

  var opacity = pullDeltaX / 100;
  var rejectOpacity = (opacity >= 0) ? 0 : Math.abs(opacity);
  var likeOpacity = (opacity <= 0) ? 0 : opacity;
  $cardReject.css("opacity", rejectOpacity);
  $cardLike.css("opacity", likeOpacity);
};

function release() {
  // Anubhaw //
  var swipeDirection = '';
  // Anubhaw //
  if (pullDeltaX >= decisionVal) {
    $card.addClass("to-right");
    // Anubhaw //
    swipeDirection = 'right';
    // Anubhaw //
  } else if (pullDeltaX <= -decisionVal) {
    // Anubhaw //
    swipeDirection = 'left';
    // Anubhaw //
    $card.addClass("to-left");
  }

  if (Math.abs(pullDeltaX) >= decisionVal) {
    $card.addClass("inactive");
    ///        Anubhaw hack    ///
    app.lookersScreen.swipeCard(app, $card[0].id, swipeDirection)
    ///        Anubhaw hack    ///
    setTimeout(function () {
      $card.addClass("below").removeClass("inactive to-left to-right");
      cardsCounter++;
      if (cardsCounter === numOfCards) {
        cardsCounter = 0;
        $(".demo__card").removeClass("below");
      }
    }, 300);
  }

  if (Math.abs(pullDeltaX) < decisionVal) {
    $card.addClass("reset");
  }

  setTimeout(function () {
    $card.attr("style", "").removeClass("reset")
      .find(".demo__card__choice").attr("style", "");

    pullDeltaX = 0;
    animating = false;
  }, 300);
};