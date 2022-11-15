let lastTime = 0;/*paso 9: la variable creada se inicializa en 0 */

let dropInterval = 1000;//variable para regular la caída de la ficha 
let dropCounter= 0; //variable para regular la caída de la ficha


const CANVAS = document.getElementById("tetris"); /* paso 3: se trae el canvas de html */
const CONTEXT = CANVAS.getContext("2d"); /* paso 4: Se crea una variable que establezca la visualización del canvas en 2d  */

const grid = createMatriz(10,20);/*Variable // funciona aninima para crear una tabla de 20 filas por 10 columnas -- se utilizan los valores de create matriz 10,20 como parametro en la funcion createMatriz */

const colors = [ // variable para definir los colores, después se cita en draw matriz 
    null, 
    'red',
    'blue',
    'violet',
    'green',
    'purple',
    'orange',
    'pink'
];

const player ={/*objeto llave y valor  pos abarca la posicion donde se ubica el tetromino*/
    pos: {x:0, y:0},
    matriz: null, //al comienzo se creaba la ficha aqui, pero cuand ose integran las demas, se almacenan en la función createPiece
    score:0
    
};

CONTEXT.scale(25,25); /*paso 5: Se establecen las dimensiones del tablero canvas teniendo en cuenta el height y el weight del html  */

function createPiece (tipo){
    if(tipo==='T') {
        /*array bidimensional que modifica en  x y y para difujar la ficha */
        return [ 
                [0,0,0],
                [1,1,1],
                [0,1,0]
             ];
    }else if (tipo==='O'){
        return [ 
            [2,2],
            [2,2],
        ];
    }else if (tipo==='L'){
        return [ 
            [0,3,0],
            [0,3,0],
            [0,3,3]
         ];
    }else if (tipo==='J'){
        return [ 
            [0,4,0],
            [0,4,0],
            [4,4,0]
         ];
    }else if (tipo==='I'){
        return [ 
            [0,5,0,0],
            [0,5,0,0],
            [0,5,0,0],
            [0,5,0,0],
         ];
    }else if (tipo==='S'){
        return [ 
            [0,6,6],
            [6,6,0],
            [0,0,0],            
         ];
    }else if (tipo==='Z'){
        return [ 
            [7,7,0],
            [0,7,7],
            [0,0,0],            
         ];
    }      
}


function createMatriz (width,height){/*se crea una funcion que trae como parametros los vbalores de la variable definida al comienzo */
    const matriz = [];/*se crea un array en blanco  */
    while (height--){/*height corresponde a 20, recordar que los numeros siempre van a ser un operador bnoleano  TRUE si se pasan como unico parametro dentro del condicional se va a ejecturar, por ende, 20 veces se imprime un array en la posición width o la fila con #0  */
        matriz.push(new Array (width).fill(0));
    }
    console.table(matriz) /*Se imprime una tabla .table que muestre la matriz del comienzo que se ha modificado por medio del while  */
    return matriz; /*Se devuelve la matriz en forma de tabla ⏫ */
}
/*recibe el grid por l matriz y el player tiene la matriz de lka ficha */

function collide (grid, player){ //funcion para limitar los movimientos dentro del canvas para que las figuras no superen los limites INFERIORES

    const matriz = player.matriz; //Variable definida para obtener la ruta de acceso directo a la lisya del objeto
    const offset = player.pos; // Variable definida para obtener la ruta de acceso directo a la lista del objeto

    for (let y =0; y < matriz.length; ++y) {//se repite 3 vveces 
// recorre la pieza vertical y horizontal buscando que las posiciones 
        for (let x=0; x < matriz[y].length; ++x ) { 

            if (matriz[y][x] !==0 && (grid[y + offset.y] && grid[y + offset.y][x+offset.x]) !==0) {//comprobar colisiones en el grid 
                return true;//retorna que colisiono 
            }
        }
    }
    return false; //retorna que no hay colision 
}

function merge (grid,player) {
    player.matriz.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value!==0) {
                grid [y + player.pos.y][x + player.pos.x] = value;               
            }
        });
    });      
}



function drawMatriz (matriz, offset) {/*Esta funcion trabaja con los parametros definidos dentro de la funcion draw  */
    /*array function funciona para abreviar la declaracion de una funcion y no poner las palabras reservadas de de las funciones como el function o el return*/
    matriz.forEach((row, y) => { /* el primer for each recibe dos parametros creados momentaneamente encargados de:  (row| se encarga de alamacenar los elementos de la lista matriz [0,0,0],[1,1,1],[0,1,0]) (y| se encarga de almacenar la posicion del elemento dentro de la lista:  # 0 -posicion- [0,0,0], # 1 [1,1,1], #2 [0,1,0]) */

        row.forEach((value, x) => { /* ahora se toma row| que ya alamcenó los elementos del array matriz, por ende, este .foreach abre cada lista y recorre el elemento en especifico de cada lista, es decir accede directamente a los numeros  */

            if(value!==0){/*una vez dentro de los numeros, aplica el condicional y si es diferente de 0 ⏬ */

                CONTEXT.fillStyle = colors[value];/*define los colores dependiendo la variable de colors al inicio ⏫. Por medio del metodo fillstyle, se le da un valor que va a sustraer de la lista de colores y lo va a aplicar  */

                CONTEXT.fillRect (x + offset.x, y + offset.y, 1, 1 ); /*se utiliza el metodo fill rect () de canvas que recibe 4 parametros, el primero y el segundo se encargan de definir la posición donde se va a pintar en el linzo o canva y los segundos dos se encargan de los tamaños en eje x y eje y. Recordemos que las posiciones e definieron en una cuadricula de 10x 20 enntonces se va a desplazar por eje x y y para pintarlas */
            }
        });
    });
}     
        
        
function draw () { /*Se crea la función draw que va a ser llamada dentro de update para no saturar la función update con demasiada información  */
    CONTEXT.fillStyle ="#000"; 

    CONTEXT.fillRect(0, 0, CANVAS.width , CANVAS.height);
    drawMatriz (grid, {x:0, y:0});    
    drawMatriz (player.matriz, player.pos);
}

function gridSweep () {//Funcion que elimina las lineas completadas 
    let rowCount = 1;
    let pruebaStiven = false;





    stiven: for (let y = grid.length -1; y >0; --y){

            for (let x = 0; x < grid [y].length; ++x){
                
                if (grid [y][x]===0){
                    continue stiven;
                }                
            }
            const row = grid.splice (y,1).fill (0);
            grid.unshift(row);
            ++y;
            player.score += rowCount *10;
        }
}

function update(time = 0) {/*paso 8: Se crea una función que se ejecute para inicializar el juego */

    const deltaTime = time - lastTime;/* paso 9: se declara una variable constante que juegue con los parametros de ingreso de update y se declara una variable global lasttime⏫*/
    lastTime = time;  

    /*¿CÓMO SE MUEVE LA FICHA? */
    dropCounter += deltaTime; //despues de definir la variable dropcounter arriba, se genera una oparción que se repetirá siempre debido al request animation de abajo⏬

    if (dropCounter > dropInterval) { //¿cómo funciona este if ? porque dropcounter nunca es mayor que dropinterval y se sigue ejecutando siempre 
        playerDrop(); /*Funcion que  contiene la operacion para hacer que el tetramino baje cada intervalo de tiempo por el request animation */
    }
    draw();
    requestAnimationFrame(update); /*Por medio de la funcion animation se vuelve a llamar update y el valor de time varia */
}


function playerDrop(){
    player.pos.y++; //aumenta la posicion en el eje y 
    if (collide(grid, player)){
        player.pos.y--; //contador en negativo para que la ficha baje automática. 
        
        merge(grid, player); //llama funcion con los parametros de posicion d ejugador y ficha
        
        playerReset(); //funcion creada para lanzar una nueva ficha 

        gridSweep ();

        

    }

    dropCounter =0; // se formatea a cero para que avance solo de a una casilla, si dejaramos sin redefinir la variable, el contador avanzaria alamacenando la variable
}

function playerReset () { //funcion creada para enviar un nueva ficha cuando la anterior colisiona 
    const pieces = 'IJLOSZT'

    player.matriz = createPiece(pieces [Math.floor(Math.random() * pieces.length)])

    /* player.matriz = createPiece (pieces[pieces.length * Math.random() | 0]); */


    player.pos.x = Math.floor(grid[0].length/3)

    /* player.pos.x = (grid[0].length /2 |0) - (player.matriz[0].length/2|0); */

    player.pos.y = 0;
}

function updateScore () {
    document.getElementById("score").innerHTML = player.score;
}



function playerMove (direction){ //se limita el movimiento 
    player.pos.x += direction; // 
    if (collide(grid,player)){ //si colisiona 
        player.pos.x -= direction;        
    }
}

function playerRotate () {//funciona para lo ratacion de las fichas
    const pos = player.pos.x; //declarar costante de posicion sin actualizar 

    let offset =1;//declara la variable que guarde la posicion inicial 
    rotate (player.matriz);

    while (collide (grid,player)){// si hay colisión, se le suma 1 a x lo que hace que nunca supere el limite vertical de lado y lado 
        player.pos.x += offset;
        offset = -(offset + (offset > 0 ? 1:-1)); //comprobar si offset es mayor que 0, dunciona para el limite derecho ya que devuelve la ficha si intenta superar el borde restandiole uno 
        if (offset > player.matriz[0].length){//
            rotate(player.matriz);
            player.pos.x = pos;
            return;
        } 
    }
}

function rotate (matriz){ //cambia la posicion de la ficha 
    for(let y =0; y < matriz.length; ++y ){
        for (let x=0; x<y; ++x) {
            [matriz [x][y] , matriz [y][x]] = [matriz [y][x], matriz[x][y]];           
        }
    }
    matriz.forEach (row => row.reverse());
}




//cómo se vincula los movimientos de las teclas con el juego
document.addEventListener("keydown", event => {
    if (event.key=== "ArrowDown") { //por medio de condiciones se validara qué tecla pulsa el usuario y se le aumentará la posición en eje x y y 
        playerDrop();
    }else if (event.key=== "ArrowLeft"){
        playerMove(-1);
    }else if (event.key=== "ArrowRight"){
        playerMove(1);
    }else if (event.key=== "ArrowUp"){
        playerRotate ();
    }
});

playerReset();

update();
updateScore ();


