var memory_array = ['bunkbedfall.gif','bunkbedfall.gif','exerciseball158px.gif','exerciseball158px.gif','explodepup158px.gif','explodepup158px.gif','idiotsammich158px.gif','idiotsammich158px.gif','kisslap 158px.gif','kisslap 158px.gif','popidol158px.gif','popidol158px.gif','ramenbeard158px.gif','ramenbeard158px.gif','slapfish158px.gif','slapfish158px.gif','wreckingball158px.gif','wreckingball158px.gif'];
var memory_values = [];
var memory_tile_IDs = [];
var tiles_Flipped = 0;


function countDown(secs,elem) {
  var element = document.getElementById(elem);
  element.innerHTML = "Time: "+secs+" seconds";
  if(secs < 1) {
    clearTimeout(timer);
    element.innerHTML = '<h2>Game Over! Click below to reload!</h2>';
    element.innerHTML += '<a href="#" onclick="refresh()">Reload/Refresh page</a>';
  } else {

    secs--;
    var timer = setTimeout('countDown('+secs+',"'+elem+'")',1000);
  }
}


Array.prototype.memory_tile_shuffle = function(){
  var i = this.length, j, temp;
  while(--i > 0){
    j = Math.floor(Math.random() * (i+1));
    temp = this[j];
    this[j] = this[i];
    this[i] = temp;
  }
}

function newBoard(){
  tiles_Flipped = 0;
  var output = '';
  memory_array.memory_tile_shuffle();
  for(var i = 0; i < memory_array.length; i++){
    output += '<div id="tile_'+i+'" onclick="memoryFlipTile(this,\''+memory_array[i]+'\')"></div>';
    //output += '<div id="card_'+i+'"><img style="opacity:0" src="'+memory_tile_shuffle[i]+'" onclick="memoryFlipTile(this)" /></div>';
  }
  document.getElementById('memory_board').innerHTML = output;
}
function memoryFlipTile(tile,val) {
  if(tile.innerHTML == "" && memory_values.length < 2){
    tile.style.background = '#FFF';
    tile.innerHTML = '<img src="'+val+'"/>';
    if (memory_values.length == 0) {
      memory_values.push(val);
      memory_tile_IDs.push(tile.id);
    }else if(memory_values.length == 1) {
      memory_values.push(val);
      memory_tile_IDs.push(tile.id);
      if(memory_values[0] == memory_values[1]) {
        tiles_Flipped += 2;
        memory_values = [];
        memory_tile_IDs = [];
        if(tiles_Flipped == memory_array.length) {
          alert("Board cleared... Reloading new board");
          document.getElementById('memory_board').innerHTML = ""; newBoard();
        }
      } else {
        function flip2back() {
          var tile_1 = document.getElementById(memory_tile_IDs[0]);
          var tile_2 = document.getElementById(memory_tile_IDs[1]);
          tile_1.style.background = 'url(bicycle_reiter_ruckseiten_kart.jpg) no-repeat';
          tile_1.innerHTML = "";
          tile_2.style.background = 'url(bicycle_reiter_ruckseiten_kart.jpg) no-repeat';
          tile_2.innerHTML = "";
          memory_values = [];
          memory_tile_IDs = [];
        }
        setTimeout(flip2back, 700);
      }
    }

  }


}
newBoard()
countDown(30, "timer")

function refresh(event){
  newBoard()

  countDown(30,"timer")
}
