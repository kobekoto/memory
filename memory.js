(function() {

    var prevSquareVal,
        prevSquareEl,
        currentSquareVal,
        currentSquareEl,
        clickCount = 0;

    var Board = function(size) {
        this.size = size;
    };

    Board.prototype.createSquares = function() {
        var table = document.createElement("table");
        for (var i = 0; i < this.size; i++) {
            var newRow = table.insertRow();
            for (var j = 0; j < this.size; j++) {
                var newCell = newRow.insertCell();
                var span = document.createElement("span");
                newCell.appendChild(span);
                span.className = "text";
            }
            table.appendChild(newRow);
        }
        document.body.appendChild(table);
    };

    Board.prototype.createDupArrays = function() {
        var spans = document.querySelectorAll("span");
        var spanList = Array.prototype.slice.call(spans);
        var spanLengthHalved = spanList.length / 2;

        this.numbers = [];
        this.dupNumbers = [];

        for (var i = 1; i <= spanLengthHalved; i++) {
            this.numbers.push(i);
        }
        this.dupNumbers = this.numbers.slice(0);
    };

    Board.prototype.shuffle = function(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    };

    Board.prototype.randomizeBoard = function() {
        var numbers = this.shuffle(this.numbers);
        var dupNumbers = this.shuffle(this.dupNumbers);
        var joinedNumbers = numbers.concat(dupNumbers);
        var spans = document.getElementsByTagName("span");

        for (var i = 0; i < joinedNumbers.length; i++) {
            spans[i].textContent = joinedNumbers[i];
        }
    };

    Board.prototype.addingWhite = function(element) {
        clickCount++;
        element.classList.add("changeWhite");

    };

    Board.prototype.tilesDoMatch = function(prevEl, currentEl) {
        prevEl.classList.remove("changeWhite");
        currentEl.classList.remove("changeWhite");
        prevEl.classList.add("popUp");
        currentEl.classList.add("popUp");
    };

    Board.prototype.tilesDontMatch = function() {
        var $cells = document.getElementsByTagName("TD");
        setTimeout(function() {
            for (var i = 0; i < $cells.length; i++) {                            
              $cells[i].classList.remove("changeWhite");                    
            }

        }, 1300);
    };

    Board.prototype.checkMatches = function() {
        var self = this;
        var $table = document.getElementsByTagName("table")[0];
      
        $table.addEventListener("click", function(event) {
          var clickedEl = event.target;
          if (clickedEl.tagName === 'TD') {
            if (!(clickedEl.classList.contains("changeWhite"))) {
                
              console.log(this, clickedEl);
              self.addingWhite(clickedEl);
              
              if (clickCount === 1) {
                prevSquareVal = clickedEl.textContent;
                prevSquareEl = clickedEl;
              } else if (clickCount === 2) {
                currentSquareVal = clickedEl.textContent;
                currentSquareEl = clickedEl;
                if (prevSquareVal === currentSquareVal) {
                  self.tilesDoMatch(prevSquareEl, currentSquareEl);
                } else {
                  self.tilesDontMatch();
                }                                    
                clickCount = 0;
              }
            }
          }        
        });
    };


    var board = new Board(4);
    console.log(board);
    board.createSquares();
    board.createDupArrays();
    board.randomizeBoard();
    board.checkMatches();

})();
