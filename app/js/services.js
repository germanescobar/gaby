(function() {
  angular.module('gaby.services', [])
    .factory('gabyService', ['questionService', function(questionService) {
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
          // the index of the questions that hands sticker
          var stickers = [2, 5, 8, 11, 14, 18, 22, 26, 30, 34, 39];
          return stickers.indexOf(getIndex()) >= 0;
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
    }])

    .factory('questionService', function() {
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
})();