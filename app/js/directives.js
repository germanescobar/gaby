(function() {
  angular.module('gaby.directives', ['gaby.constants'])
    .directive('answer', ['$timeout', 'gabyService', 'NUM_IMAGES', function($timeout, gabyService, numImages) {
      // this function is called from the directive link method below
      function handleKeydown(scope, event) {
        if (event.keyCode == 13) { // enter   
          evaluateAnswer(scope, event.currentTarget.value);
          event.currentTarget.value = "";
        }
      }

      function evaluateAnswer(scope, answer) {
        if (answer == gabyService.getAnswer(scope.currentQuestion)) {
          markAsCorrect(scope)
        } else {
          markAsIncorrect(scope);
        }
        scope.$apply();
      }

      function markAsCorrect(scope) {
        scope.correct = true;

        if (gabyService.isStickerQuestion()) {
          showStickerModal();
        }

        scope.currentQuestion = gabyService.nextQuestion();
        $('body').append('<audio autoplay><source src="audio/applause.mp3" type="audio/mpeg"></audio>');
        $timeout(function() {
          scope.correct = false;
        }, 3000);
      }

      function showStickerModal() {
        var stickerImg;
        while (!stickerImg) {
          var stickerId = Math.floor(Math.random() * numImages) + 1;
          if (!gabyService.hasSticker(stickerId)) {
            stickerImg = '<img src="images/stickers/' + stickerId + '.jpg">';
            gabyService.addSticker(stickerId);
          }
        }
        $('#win-sticker-modal .sticker').html(stickerImg);
        $('#win-sticker-modal').modal();
      }

      function markAsIncorrect(scope) {
        scope.incorrect = true;
        $timeout(function() {
          scope.incorrect = false;
        }, 2000);
      }

      return {
        restrict: "A",
        link: function(scope, element) {
          element.bind('keydown', function(event) { handleKeydown(scope, event); });
        }
      };
    }]);
})();