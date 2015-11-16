require('angular');
require('angular-animate');
require('angular-route');

var NUM_IMAGES = 14;

var app = angular.module('gaby', ['ngAnimate', 'ngRoute']);

app.controller('BodyController', function($scope) {
  $scope.keydown = function(event) {
    $scope.$broadcast('keydown', event);
  }
})

app.controller('GabyController', ['$scope', '$timeout', '$location', 'gabyService', function($scope, $timeout, $location, gabyService) {
  $scope.currentQuestion = gabyService.getCurrentQuestion();
  $scope.value = "_";
  $scope.correct = false;
  $scope.incorrect = false;

  $scope.$on('keydown', function(e, event) {
    if (event.keyCode == 13) {
      if ($scope.value == gabyService.getAnswer($scope.currentQuestion)) {
        $scope.correct = true;

        if (gabyService.isStickerQuestion()) {
          var stickerImg;
          while (!stickerImg) {
            var stickerId = Math.floor(Math.random() * NUM_IMAGES) + 1;
            if (!gabyService.hasSticker(stickerId)) {
              stickerImg = '<img src="images/stickers/' + stickerId + '.jpg">';
              gabyService.addSticker(stickerId);
            }
          }
          $('#win-sticker-modal .sticker').html(stickerImg);
          $('#win-sticker-modal').modal();
        }

        $scope.currentQuestion = gabyService.nextQuestion();
        $('body').append('<audio autoplay><source src="audio/applause.mp3" type="audio/mpeg"></audio>');
        $timeout(function() {
          $scope.correct = false;
        }, 3000);
      } else {
        $scope.incorrect = true;
        $timeout(function() {
          $scope.incorrect = false;
        }, 2000);
      }
      $scope.value = "_";
    }

    if (event.keyCode == 8) {
      event.preventDefault();
      $scope.value = $scope.value.slice(0, -1);
      if ($scope.value == "") {
        $scope.value = "_";
      }
    }

    if ((event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 96 && event.keyCode <= 105)) {
      if ($scope.value === "_") {
        $scope.value = "";
      }
      $scope.value += String.fromCharCode(event.keyCode);
    }
  });

  $scope.closeModal = function() {
    $('#win-sticker-modal').modal('hide');
    $('.modal-backdrop').remove();
    $('.modal-open').removeClass('modal-open');
    $location.path('/album');
  }
}]);

app.controller('AlbumController', ['$scope', 'gabyService', function($scope, gabyService) {
  $scope.hasSticker = function(id) {
    return gabyService.hasSticker(id);
  };

  $scope.range = function() {
    return new Array(NUM_IMAGES);
  };
}]);

app.config(['$routeProvider', function ($routeProvider) {

  $routeProvider
    .when('/', {
      templateUrl: 'views/gaby.html',
      controller: 'GabyController'
    })
    .when('/album', {
      templateUrl: 'views/album.html',
      controller: 'AlbumController'
    })
    .otherwise({
      redirectTo: '/'
    });

}]);


app.factory('gabyService', ['questionService', function(questionService) {
  function getIndex() {
    if (!localStorage.gabyIndex) {
      localStorage.gabyIndex = "0";
    }

    return parseInt(localStorage.gabyIndex);
  }

  function incrementIndex() {
    localStorage.gabyIndex = getIndex() + 1;
  }

  function getStickers() {
    if (!localStorage.gabyStickers) {
      localStorage.gabyStickers = "{}"
    }

    return JSON.parse(localStorage.gabyStickers);
  }

  return {
    getCurrentQuestion: function() {
      return questionService.find(getIndex());
    },

    nextQuestion: function() {
      incrementIndex();
      return questionService.find(getIndex());
    },

    isStickerQuestion: function() {
      return getIndex() % 5 == 4;
    },

    getAnswer: function(question) {
      if (question.type == "sum") {
        return question.data[0] + question.data[1];
      } else if (question.type == "sub") {
        return question.data[0] - question.data[1];
      }
    },

    hasSticker: function(stickerId) {
      var has = getStickers()["" + stickerId];
      return has;
    },

    addSticker: function(stickerId) {
      var stickers = getStickers();
      stickers[stickerId] = true;
      localStorage.gabyStickers = JSON.stringify(stickers);
    }
  }
}]);

app.factory('questionService', function() {
  var data = [ 
    { type: "sum", data: [1, 1] },
    { type: "sum", data: [2, 1] },
    { type: "sum", data: [3, 1] },
    { type: "sum", data: [4, 1] },
    { type: "sum", data: [5, 1] },
    { type: "sum", data: [6, 1] },
    { type: "sum", data: [2, 1] },
    { type: "sum", data: [1, 2] },
    { type: "sum", data: [1, 3] },
    { type: "sum", data: [1, 4] },
    { type: "sum", data: [2, 2] },
    { type: "sum", data: [1, 0] },
    { type: "sum", data: [2, 0] },
    { type: "sum", data: [7, 0] },
    { type: "sum", data: [4, 1] },
    { type: "sum", data: [3, 0] },
    { type: "sum", data: [4, 0] },
    { type: "sum", data: [3, 1] },
    { type: "sum", data: [8, 1] },
    { type: "sum", data: [0, 1] },
    { type: "sum", data: [0, 2] },
    { type: "sum", data: [0, 9] },
    { type: "sum", data: [5, 1] },
    { type: "sum", data: [1, 7] },
    { type: "sum", data: [6, 1] },
    { type: "sum", data: [1, 3] },
    { type: "sum", data: [0, 8] },
    { type: "sum", data: [1, 1] },
    { type: "sum", data: [3, 1] },
    { type: "sum", data: [5, 1] },
    { type: "sum", data: [7, 1] },
    { type: "sum", data: [2, 0] },
    { type: "sum", data: [2, 2] },
    { type: "sum", data: [3, 2] },
    { type: "sum", data: [2, 3] },
    { type: "sum", data: [6, 1] },
    { type: "sum", data: [3, 2] },
    { type: "sum", data: [1, 2] },
    { type: "sum", data: [0, 8] },
    { type: "sum", data: [3, 1] },
    { type: "sum", data: [3, 2] }
  ];

  return {
    find: function(id) {
      return data[id];
    }
  }
});