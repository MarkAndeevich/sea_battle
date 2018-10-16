class Field {
  constructor() {
  }
  // Создание поля и заполнение пустыми ячейками
  // IDEA: Создать еще Ships для этого поля, чтобы игроку в будущем хранить только поле
  CreateField(dom_element){
    var tbody_field = createElement('tbody');
    for (let i = 0; i < 10; i++) {
      var rows = createElement('tr');
      rows.className = "_" + i + " " + "Row";
      for (let j = 0; j < 10; j++) {
        let cell = createElement('td');
        cell.className = "_" + j + " " + "EmptyCell";
        cell.id = "Cell";
        let div = createElement('div');
        div.setAttribute('row', i);
        div.setAttribute('column', j);
        div.className = "Field-content";
        cell.appendChild(div);
        rows.appendChild(cell);
        // Подпись каждой клетки на событие click и проверка есть ли на месте этой клетке корабль
        div.addEventListener('click', ({target}) => {
          console.log(target);
          let x = target.getAttribute('row');
          let y = target.getAttribute('column');
          let arrayField = this.FillField();
          target.classList.remove("EmptyCell");
          // Хотел заменить arrayField[x][y] на HitShip(x,y, mapShip) чтобы избавиться от дублирования
          if(arrayField[x][y] === 4 || arrayField[x][y] === 3
          ||arrayField[x][y] === 2 || arrayField[x][y] === 1){
            target.classList.add("BusyCell");
          }
          else{
            target.classList.add("MissCell");
          }
        });
      }
      tbody_field.appendChild(rows);
    }
    return dom_element.appendChild(tbody_field);
  }
  // "Ручное" заполнение поле кораблями.
  FillField(){
    return [
      [4,0,3,0,3,0,2,0,2,0],
      [4,0,3,0,3,0,2,0,2,0],
      [4,0,3,0,3,0,0,0,0,0],
      [4,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,2,0,1,0,1,0,0,0],
      [0,0,2,0,0,0,0,0,0,0],
      [0,0,0,0,1,0,1,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0]
    ];

  }
  // Метод, отвечающий за то, попали по кораблю или нет.
  HitShip(x, y, mapShip){
    for(var ship in mapShip)
    {
      [ship].forEach(function(elem, index){
        if(!ship[index].isDamaged && (ship[index].x === x || ship[index].y === y))
          return true;
      });
    }
  }
}
class Ship{
  constructor(){

  }
// IDEA: Одна из попыток придумать создания кораблей более "топорным" способом, хотя бы без рандомной генерации кораблей
  CreateShips(){
    return new Map([
      [4,[[0,0],[1,0],[2,0],[3,0]]],
      [3,[[0,2],[1,2],[2,2]],[[0,4],[1,4],[2,4]]],
      [2,[[0,6],[1,6]],[[0,8],[1,8]],[[5,2],[6,2]]],
      [1,[[5,4],[5,6],[7,6],[7,4]]]
    ]);
  }
// IDEA: Одна из попыток придумать вид хранения кораблей. Т.е. каждый корабль поделен на квадраты с координатами х,у и isDamaged.
  ShipDecks(x,y){
    this.x = x;
    this.y = y;
    isDamaged = false;
  }
}
// Класс игрока, который хранит его поле и имя
class Player {
  constructor(name, field=null) {
    this.name = name;
    this.field = field;
  }

}

function createElement(domElement){
  return document.createElement(domElement);
}
// IDEA: вариант как хранить корабли для добавления в дальнейшем их на поле
// var Ships = {
//   four_deck_ship: {
//     value: 4,
//     count: 1
//   },
//   three_deck_ship: {
//     value: 3,
//     count: 2
//   },
//   two_deck_ship: {
//     value: 2,
//     count: 3
//   },
//   one_deck_ship: {
//     value: 1,
//     count: 4
//   }
// };

// IDEA: Задумка как зарандомить распределение кораблей, через рандом вектора, что-то типа Math.random() > 0.5? RandomFilling(i,j) : RandomFilling(j,i)
// randomVectorA и randomVectorB могут быть как i, так и j
// function RandomFilling(randomVectorA, randomVectorB){
//   var arrayField = [
//   [0,0,0,0,0,0,0,0,0,0],
//   [0,0,0,0,0,0,0,0,0,0],
//   [0,0,0,0,0,0,0,0,0,0],
//   [0,0,0,0,0,0,0,0,0,0],
//   [0,0,0,0,0,0,0,0,0,0],
//   [0,0,0,0,0,0,0,0,0,0],
//   [0,0,0,0,0,0,0,0,0,0],
//   [0,0,0,0,0,0,0,0,0,0],
//   [0,0,0,0,0,0,0,0,0,0],
//   [0,0,0,0,0,0,0,0,0,0]];
//   for (var ship in Ships) {
//     for (var i = 0; i < Ships[ship]['count']; i++) {
//
//     }
//   }
// }
// IDEA: Задумка на то, чтобы у игрока отнимать по квадратику от целого корабля.
// player.playerShips.four_deck_ship = player.playerShips.four_deck_ship-1;
// console.log(player.playerShips);
// IDEA: Границы вокруг корабля для того, чтобы при рандомном распределении не лепить корабли вплотную.
// var aroundPoints = [[x-1, y-1], [x-1, y], [x-1, y+1], [x, y-1], [x, y], [x, y+1], [x+1, y-1],[x+1, y], [x+1, y+1]];

// IDEA: Попытка придумать статус игры: меню, старт, конец(победа/поражение)
var GameStatus  = {
  Start : function(countPlayers){
    var players = [];
    let table = document.getElementById("table");
    for (var i = 0; i < countPlayers; i++) {
      let createField = new Field();
      var player = new Player("Player"+(i+1));
      players.push(player);
      let Player_field = createElement('div');
      Player_field.className = "battleField";
      FieldHeader = createElement("h3");
      FieldHeader.className = player.name+" Players";
      let playerName = document.createTextNode(player.name);
      table.appendChild(Player_field);
      let tableField = createElement('table');
      tableField.className = "Field";
      tableField.id = "Field";
      FieldHeader.appendChild(playerName);
      Player_field.appendChild(FieldHeader);
      Player_field.appendChild(tableField);
      let newDom = createField.CreateField(tableField);
      tableField = newDom;
    }
  }
}
// Событие на клик кнопки "Играть" и запуска игры.
function play(){
  var menu = document.getElementById('PlayersMenu');
  menu.style.display = "none";
  var countPlayers = document.getElementById('countPlayers').value;
  if(!countPlayers) return;
  GameStatus.Start(countPlayers);
}
