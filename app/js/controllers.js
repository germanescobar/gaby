(function() {
  angular.module('gaby.controllers', ['gaby.constants'])
    .controller('GabyController', ['$scope', '$timeout', '$location', 'gabyService', function($scope, $timeout, $location, gabyService) {
      $scope.currentQuestion = gabyService.getCurrentQuestion();
      $scope.correct = false;
      $scope.incorrect = false;

      $scope.closeModal = function() {
        $('#win-sticker-modal').modal('hide');
        $('.modal-backdrop').remove();
        $('.modal-open').removeClass('modal-open');
        $location.path('/album');
      }

      setInterval(function() {
        $('input').focus();
      });
    }])

    .controller('AlbumController', ['$scope', 'gabyService', 'NUM_IMAGES', function($scope, gabyService, numImages) {
      $scope.hasSticker = function(id) {
        return gabyService.hasSticker(id);
      };

      $scope.range = function() {
        return new Array(numImages);
      };
    }]);
})();