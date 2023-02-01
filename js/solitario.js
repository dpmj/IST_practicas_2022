/* JUAN DEL PINO MENA
 * Solitario Práctica 4 y 5 de IST
 * 2022 
 */


/***** INICIO DECLARACIÓN DE VARIABLES GLOBALES *****/

// Array de palos
let palos = ["corazones", "picas", "rombos", "treboles"];
	
// Array de número de cartas
let numeros = ["as", 2, 3, 4, 5, 6, 7, 8, 9, 10, "jota", "reina", "rey"];

// En las pruebas iniciales solo se trabajará con cuatro cartas por palo:
// let numeros = [10, "jota", "reina", "rey"];

// Versión aún más reducida para testeo del gameover:
//let numeros = ["reina", "rey"];

// paso (top y left) en pixeles de una carta a la anterior en un mazo
let paso = 3;

// Tapetes				
let tapete_inicial = document.getElementById("inicial");
let tapete_sobrantes = document.getElementById("sobrantes");
let tapete_receptor1 = document.getElementById("receptor1");
let tapete_receptor2 = document.getElementById("receptor2");
let tapete_receptor3 = document.getElementById("receptor3");
let tapete_receptor4 = document.getElementById("receptor4");

// Mazos
let mazo_inicial = [];
let mazo_sobrantes = [];
let mazo_receptor1 = [];
let mazo_receptor2 = [];
let mazo_receptor3 = [];
let mazo_receptor4 = [];

// Contadores de cartas
let cont_inicial = document.getElementById("cont_inicial");
let cont_sobrantes = document.getElementById("cont_sobrantes");
let cont_receptor1 = document.getElementById("cont_receptor1");
let cont_receptor2 = document.getElementById("cont_receptor2");
let cont_receptor3 = document.getElementById("cont_receptor3");
let cont_receptor4 = document.getElementById("cont_receptor4");
let cont_movimientos = document.getElementById("cont_movimientos");

// Tiempo
let cont_tiempo = document.getElementById("cont_tiempo");  // span cuenta tiempo
let segundos = 0;  // cuenta de segundos
let temporizador = null;  // manejador del temporizador

// Contador del número de movimientos
let movimientos = 0;

// Flag global que indica que el juego ha acabado
let over = false;

// Elemento HTML que indica el fin del juego
let mensaje_fin = document.getElementById("mensajefin");
mensaje_fin.style.visibility = "hidden";
mensaje_fin.style.color = "green";
mensaje_fin.style.textAlign = "center";

/***** FIN DECLARACIÓN DE VARIABLES GLOBALES *****/

			
// Rutina asociada a botón reset: comenzar_juego
document.getElementById("reset").onclick = comenzar_juego;

// El juego debería comenzar al cargar la página: no se debe esperar a pulsar el botón de Reiniciar
/* !!!!!!!!!!!!!!!!!!! CÓDIGO !!!!!!!!!!!!!!!!!!!!!!! */
comenzar_juego();
/* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */



/* 
 * Asegura un reinicio correcto del juego 
 */
function reset_all()
{
	// Se asegura de que los mazos inicialmente están vacíos

	mazo_inicial = [];
	mazo_sobrantes = [];
	mazo_receptor1 = [];
	mazo_receptor2 = [];
	mazo_receptor3 = [];
	mazo_receptor4 = [];

	// Borra los hijos de los tapetes, para el caso del reinicio
	// Añade los hijos necesarios 'span' a los tapetes
	
	tapete_inicial.innerHTML = '<span id="cont_inicial" class="contador"></span>';
	tapete_sobrantes.innerHTML = '<span id="cont_sobrantes" class="contador"></span>';
	tapete_receptor1.innerHTML = '<span id="cont_receptor1" class="contador"></span>';
	tapete_receptor2.innerHTML = '<span id="cont_receptor2" class="contador"></span>';
	tapete_receptor3.innerHTML = '<span id="cont_receptor3" class="contador"></span>';
	tapete_receptor4.innerHTML = '<span id="cont_receptor4" class="contador"></span>';

	// Vuelve a identificar los elementos correspondientes

	cont_inicial = document.getElementById("cont_inicial");
	cont_sobrantes = document.getElementById("cont_sobrantes");
	cont_receptor1 = document.getElementById("cont_receptor1");
	cont_receptor2 = document.getElementById("cont_receptor2");
	cont_receptor3 = document.getElementById("cont_receptor3");
	cont_receptor4 = document.getElementById("cont_receptor4");

	// Reset del contador de movimiento
	movimientos = 0;

	// Se asegura de que el juego no está en estado acabado
	over = false;

	// Reset del aspecto de los contadores de tiempo y movimientos, por si en la partida
	// anterior se ganó
	cont_movimientos.style.backgroundColor = "transparent";
	cont_movimientos.style.color = "black";
	cont_tiempo.style.backgroundColor = "transparent";
	cont_tiempo.style.color = "black";
	
	// Esconde el mensaje de fin de juego
	mensaje_fin.style.visibility = "hidden";
}



/*
 * Desarrollo del comienzo del juego
 */
function comenzar_juego() {

	/* Crear el mazo inicial con toda la baraja. Este será un array cuyos 
	elementos serán elementos HTML <img>, siendo cada uno de ellos una carta.
	Sugerencia: en dos bucles for, bárranse los "palos" y los "numeros", formando
	oportunamente el nombre del fichero png que contiene a la carta (recuérdese poner
	el path correcto en la URL asociada al atributo src de <img>). Una vez creado
	el elemento img, inclúyase como elemento del array mazo_inicial. 
	*/

	/* !!!!!!!!!!!!!!!!!!!!!! CÓDIGO !!!!!!!!!!!!!!!!!!!! */	
	
	// Se asegura de que los mazos inicialmente están vacíos y los tapetes también, entre
	// otros ajustes
	reset_all();

	// Reset de la apariencia del tiempo y contador de movimientos, por si se ganó en la
	// partida anterior
	
	// Recorre las posibles combinaciones de número y palo, generando los src e ID de imagen
	for (var i = 0; i < palos.length; i++)  // 'filas'
	{
		for (var j = 0; j < numeros.length; j++)  // 'columnas'
		{
			let carta = document.createElement("img");

			// src se genera según la estructura de carpetas donde están las imágenes
			carta.setAttribute("src", `img/baraja/${numeros[j]}-${palos[i]}.png`);

			// id generado identificando la carta que es (número y palo)
			carta.setAttribute("id", numeros[j] + "-" + palos[i]);

			// datos del programador
			carta.setAttribute("data-palo", palos[i]);
			carta.setAttribute("data-nombre", numeros[j]);
			
			// Especificar el mazo origen
			carta.setAttribute("data-tapete", "inicial");

			// Dragable - Por defecto no pueden ser arrastradas
			carta.setAttribute("draggable", false);  
			// "carta" es el equivalente a "objeto_que_se_mueve"

			// color según palo
			if (palos[i] == "corazones" || palos[i] == "rombos") {
				carta.setAttribute("data-color", "rojo");
			} else {
				carta.setAttribute("data-color", "negro");
			}

			// push al vector
			mazo_inicial.push(carta);
		}
	}
	// A la salida de los bucles tenemos un vector de palos.length * numeros.length 
	// posiciones con elementos imagen con el src e id correspondiente

	/* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */
	
	// Barajar
	barajar(mazo_inicial);
	
	// Paso adicional: que la última carta del mazo sea Draggable.
	mazoAdjustDrag(mazo_inicial, true);

	// Dejar mazo_inicial en tapete inicial
	cargar_tapete_inicial(mazo_inicial);

	// Puesta a cero de contadores de mazos
	set_contador(cont_inicial, mazo_inicial.length);
	set_contador(cont_sobrantes, 0);
	set_contador(cont_receptor1, 0);
	set_contador(cont_receptor2, 0);
	set_contador(cont_receptor3, 0);
	set_contador(cont_receptor4, 0);
	set_contador(cont_movimientos, 0);
			
	// Arrancar el conteo de tiempo, cada segundo
	arrancar_tiempo();

} // comenzar_juego



/**
	Se debe encargar de arrancar el temporizador: cada 1000 ms se
	debe ejecutar una función que a partir de la cuenta autoincrementada
	de los segundos (segundos totales) visualice el tiempo oportunamente con el 
	format hh:mm:ss en el contador adecuado.

	Para descomponer los segundos en horas, minutos y segundos pueden emplearse
	las siguientes igualdades:

	segundos = truncar (   segundos_totales % (60)                 )
	minutos  = truncar ( ( segundos_totales % (60*60) )     / 60   )
	horas    = truncar ( ( segundos_totales % (60*60*24)) ) / 3600 )

	donde % denota la operación módulo (resto de la división entre los operadores)

	Así, por ejemplo, si la cuenta de segundos totales es de 134 s, entonces será:
		00:02:14

	Como existe la posibilidad de "resetear" el juego en cualquier momento, hay que 
	evitar que exista más de un temporizador simultáneo, por lo que debería guardarse
	el resultado de la llamada a setInterval en alguna variable para llamar oportunamente
	a clearInterval en su caso.   
*/

function arrancar_tiempo()
{ // Ya completamente implementado: estúdiese
	if (temporizador) clearInterval(temporizador);

	let hms = function () {
		let seg = Math.trunc( segundos % 60 );
		let min = Math.trunc( (segundos % 3600) / 60 );
		let hor = Math.trunc( (segundos % 86400) / 3600 );
		let tiempo =  ( (hor<10)? "0"+hor : ""+hor ) 
				+ ":" + ( (min<10)? "0"+min : ""+min )  
				+ ":" + ( (seg<10)? "0"+seg : ""+seg );

		if (!over)  // Si el juego no ha acabado
		{
			set_contador(cont_tiempo, tiempo);
			segundos++;
		}  // En caso contrario, el contador está detenido
		
	}
	segundos = 0;
	hms(); // Primera visualización 00:00:00
	temporizador = setInterval(hms, 1000); // hms() será invocado cada segundo               	
} // arrancar_tiempo

		

/**
	Si mazo es un array de elementos <img>, en esta rutina debe ser
	reordenado aleatoriamente. Al ser un array un objeto, se pasa
	por referencia, de modo que si se altera el orden de dicho array
	dentro de la rutina, esto aparecerá reflejado fuera de la misma.
	Para reordenar el array puede emplearse el siguiente pseudo código:

	- Recorramos con i todos los elementos del array
		- Sea j un indice cuyo valor sea un número aleatorio comprendido 
			entre 0 y la longitud del array menos uno. Este valor aleatorio
			puede conseguirse, por ejemplo con la instrucción JavaScript
				Math.floor( Math.random() * LONGITUD_DEL_ARRAY );
		- Se intercambia el contenido de la posición i-ésima con el de la j-ésima

*/
function barajar(mazo) 
{
	/* !!!!!!!!!!!!!!!!!!!!!! CODIGO !!!!!!!!!!!!!!!!!!!! */	
	
	for (var i = 0; i < mazo.length; i++)  //
	{
		let j = Math.floor(Math.random() * mazo.length);
		let aux = mazo[i];
		mazo[i] = mazo[j];
		mazo[j] = aux;
	}

	// no hace falta devolver nada, se trabaja por referencia.

	/* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */
} // barajar


		
/**
	En el elemento HTML que representa el tapete inicial (variable tapete_inicial)
	se deben añadir como hijos de DOM todos los elementos <img> del array mazo actual.
	Antes de añadirlos, se deberían fijar propiedades como la anchura, la posición,
	coordenadas top y left, algun atributo de tipo data-...
	Al final se debe ajustar el contador de cartas a la cantidad oportuna
*/
function cargar_tapete_inicial(mazo) 
{
	/* !!!!!!!!!!!!!!!!!!!!!! CODIGO !!!!!!!!!!!!!!!!!!!! */	

	for (var i = 0; i < mazo.length; i++)  //
	{
		// Ajustes de tamaño y posición
		mazo[i].style.width = "50px";
		mazo[i].style.position = "absolute";
		mazo[i].style.top = i * paso + "px";
		mazo[i].style.left = mazo[i].style.top;  // misma posición horizontal y vertical

		mazo[i].style.transform = "none";  // Sin transform
		mazo[i].setAttribute("data-tapete", "inicial");  // Especificar el mazo origen

		tapete_inicial.appendChild(mazo[i]);  // creación del objeto html en el tapete
	}

	/* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */	
} // cargar_tapete_inicial



/**
	Esta función debe incrementar el número correspondiente al contenido textual
	del elemento que actúa de contador
*/
function inc_contador(contador)
{
	contador.innerHTML = +contador.innerHTML + 1; 
	// Obsérvese el operador + antes de contador.innerHTML
} // inc_contador


/**
	Idem que anterior, pero decrementando 
*/
function dec_contador(contador)
{
	/* !!!!!!!!!!!!!!!!!!!!!! CODIGO !!!!!!!!!!!!!!!!!!!! */	
	contador.innerHTML = +contador.innerHTML - 1;
	/* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */	
} // dec_contador



/**
	Similar a las anteriores, pero ajustando la cuenta al
	valor especificado
*/
function set_contador(contador, valor)
{
	/* !!!!!!!!!!!!!!!!!!!!!! CODIGO !!!!!!!!!!!!!!!!!!!! */
	contador.innerHTML = valor;
	/* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */	
} // set_contador



// ///////////////////////////////////////////////////////////////////////////////////////
// FUNCIONES IMPLEMENTADAS PARA LA PRÁCTICA 5



/*
 * Ejecutar las instrucciones del final del juego 
 */
function gameOver() 
{
	// Flag global que indica que el juego ha acabado
	over = true;

	// Leer contador de tiempo final
	let tiempo_final = cont_tiempo.innerHTML;

	// Muestra el tiempo final
	set_contador(cont_tiempo, tiempo_final);
	
	// Mostrar contadores resaltados en verde
	cont_movimientos.style.backgroundColor = "green";
	cont_movimientos.style.color = "white";
	cont_tiempo.style.backgroundColor = "green";
	cont_tiempo.style.color = "white";
	
	// Mostrar el mensaje de fin de juego
	mensaje_fin.style.visibility = "visible";

	// Alerta al usuario
	alert("¡Has completado el juego, enhorabuena!");
}



/*
 * Función que comprueba si el juego debe acabarse, o si debe rellenarse el mazo inicial
 * con las cartas del sobrante
 */
function comprobarFinJuego()
{
	if (mazo_inicial.length == 0)  // Si el mazo inicial está vacío
	{
		if (mazo_sobrantes.length == 0)  // Si el mazo de sobrantes está vacío 
		{
			// Si las reglas están bien programadas, se supone que todos los mazos están 
			// bien ordenados, por lo tanto si se cumple esta condición es seguro que el 
			// juego se ha terminado
			gameOver();
		}
		else  // Si aún quedan cartas en el mazo de sobrantes 
		{
			// Hard-copy del vector mazo_sobrantes a mazo_inicial (evitar la referencia)
			mazo_inicial = [... mazo_sobrantes];  // "..." = JS ES6 Spread Operator

			// Barajar las cartas y ajustar las propiedades del drag
			barajar(mazo_inicial);
			mazoAdjustDrag(mazo_inicial, true);

			// Cargar tapete inicial con las cartas nuevas
			cargar_tapete_inicial(mazo_inicial);
			

			// Borrar mazo sobrante y vaciar su tapete
			mazo_sobrantes = [];
			tapete_sobrantes.innerHTML = '<span id="cont_sobrantes" class="contador"></span>';
			cont_sobrantes = document.getElementById("cont_sobrantes");

			// Actualizar contadores
			set_contador(cont_sobrantes, mazo_sobrantes.length);
			set_contador(cont_inicial, mazo_inicial.length);
		}
	}
}



/* 
 * Función que toma un mazo y hace que sus elementos no sean draggables excepto el último
 * Función auxiliar para el código de abajo
 * Espera recibir objetos vectores mazo (por referencia)
 * El argumento dragLastAllow (booleano) indica si la carta superior puede moverse o no
 */
function mazoAdjustDrag(mazo, dragLastAllow=false) 
{
	// genérico para cada tapete, sin tener en cuenta cuál es o su número de elementos
	// Si tiene cero elementos, no modifica nada
	for (var i = 0; i < mazo.length; i++) 
	{
		mazo[i].setAttribute("draggable", false);

		if (dragLastAllow && (i == mazo.length - 1))  
		{  
			// En la última posición activar drag y listener si se indica en dragLastAllow
			mazo[i].setAttribute("draggable", true);
			mazo[i].addEventListener("dragstart", dragHandler);  
		}
	}
}



// Variables globales que genera dragHandler y consume dropHandler
var mazo_origen;  // Array de cartas origen
var cont_origen;  // Contador de nº de cartas origen

/* 
 * Handler del evento de arrastrar, identifica el último elemento arrastrado y lo almacena
 * en las variables globales anteriores
 */
function dragHandler(e)
{
	// identificación del elemento arrastrado 
	var objeto_que_se_mueve = e.target;

	// identificación del mazo origen y su contador de cartas
	switch(objeto_que_se_mueve.getAttribute("data-tapete")) 
	{
		case "inicial":
			mazo_origen = mazo_inicial;
			cont_origen = cont_inicial;
			break;
		case "sobrantes":
			mazo_origen = mazo_sobrantes;
			cont_origen = cont_sobrantes;
			break;
		case "receptor1":
			mazo_origen = mazo_receptor1;
			cont_origen = cont_receptor1;
			break;
		case "receptor2":
			mazo_origen = mazo_receptor2;
			cont_origen = cont_receptor2;
			break;
		case "receptor3":
			mazo_origen = mazo_receptor3;
			cont_origen = cont_receptor3;
			break;
		case "receptor4":
			mazo_origen = mazo_receptor4;
			cont_origen = cont_receptor4;
			break;
		default:
			mazo_origen = undefined;
			cont_origen = undefined;
			break;
	}
}



/* 
 * Handler del evento soltar
 * Genérica de todos los tapetes y mazos
 * La función dragHandler() identifica el objeto origen, y esta función el objeto destino
 */
function dropHandler(e) 
{
	e.preventDefault();

	var tapete_destino = e.target;  // Elemento de destino del elemento arrastrado
	var mazo_destino;  // Array de cartas, destino de la carta arrastrada
	var cont_destino;  // Contador del nº cartas del destino

	var do_nothing = false;  // True en caso de que el destino del drop no sea permitido

	// Booleano que indica si se permite arrastrar la última carta del tapete. True en 
	// caso de soltar en el tapete sobrantes, false en el resto de tapetes receptores
	var dragLastAllow = false;  

	// Si el destino no es un tapete sino una imagen (si por ejemplo el mazo tiene cartas)
	// Identificar el tapete como el padre de la imagen
	if (tapete_destino.tagName == "IMG")  // Si el destino es una imagen
	{
		tapete_destino = tapete_destino.parentElement;  // Ahora sí es un div tapete
	}

	// identificación del mazo de destino y su contador
	switch(tapete_destino.id) 
	{
		// No se permite soltar sobre el tapete incial
		case "sobrantes":
			mazo_destino = mazo_sobrantes;
			cont_destino = cont_sobrantes;
			dragLastAllow = true;  
			break;
		case "receptor1":
			mazo_destino = mazo_receptor1;
			cont_destino = cont_receptor1;
			break;
		case "receptor2":
			mazo_destino = mazo_receptor2;
			cont_destino = cont_receptor2;
			break;
		case "receptor3":
			mazo_destino = mazo_receptor3;
			cont_destino = cont_receptor3;
			break;
		case "receptor4":
			mazo_destino = mazo_receptor4;
			cont_destino = cont_receptor4;
			break;
		default:
			do_nothing = true;  // Se ha soltado sobre un sitio no permitido
			break;
	}

	if (!do_nothing)  // Si se ha soltado en un sitio no permitido
	{	
		// Comprobar si el movimiento está autorizado
		var permitido = comprobarReglas(mazo_origen, mazo_destino, tapete_destino.id);

		if (permitido)
		{
			carta = mazo_origen.pop();  // Sacamos la carta correspondiente del mazo

			// Ajustes de estilo
			carta.style.top = "50%"; 
			carta.style.left = "50%";
			carta.style.transform = "translate(-50%, -50%)";

			// Ajustar propiedades de drag del mazo origen
			mazoAdjustDrag(mazo_origen, true);
			
			mazo_destino.push(carta);  // Insertamos la carta en el mazo de destino

			// Ajustar propiedades de drag del mazo destino
			mazoAdjustDrag(mazo_destino, dragLastAllow);  
			
			// Actualizar el tapete donde está colocada la carta
			mazo_destino[mazo_destino.length - 1].setAttribute("data-tapete", 
															   tapete_destino.id);
			
			// Se añade como hijo al tapete (moviéndolo del origen)
			tapete_destino.appendChild(mazo_destino[mazo_destino.length - 1]);

			// Actualizar valores de los respectivos contadores
			set_contador(cont_origen, mazo_origen.length);
			set_contador(cont_destino, mazo_destino.length);

			// Incrementar el contador de movimientos
			movimientos++;
			set_contador(cont_movimientos, movimientos);

			// Por último, comprobar si se ha acabado el juego o se necesita rellenar el
			// tapete inicial con las sobrantes
			comprobarFinJuego();
		} 
	}
}



// Asignación de eventos a diferentes funciones en cada uno de los tapetes
// NOTA: la asignación de las propiedades draggables y eventos a las cartas se hace en la
// función donde se genera el tapete incial: comenzar_juego()

tapete_sobrantes.ondragenter = function(e) { e.preventDefault(); };
tapete_sobrantes.ondragover = function(e) { e.preventDefault(); };
tapete_sobrantes.ondraleave = function(e) { e.preventDefault(); };
tapete_sobrantes.ondrop = dropHandler;

tapete_receptor1.ondragenter = function(e) { e.preventDefault(); };
tapete_receptor1.ondragover = function(e) { e.preventDefault(); };
tapete_receptor1.ondraleave = function(e) { e.preventDefault(); };
tapete_receptor1.ondrop = dropHandler;

tapete_receptor2.ondragenter = function(e) { e.preventDefault(); };
tapete_receptor2.ondragover = function(e) { e.preventDefault(); };
tapete_receptor2.ondraleave = function(e) { e.preventDefault(); };
tapete_receptor2.ondrop = dropHandler;

tapete_receptor3.ondragenter = function(e) { e.preventDefault(); };
tapete_receptor3.ondragover = function(e) { e.preventDefault(); };
tapete_receptor3.ondraleave = function(e) { e.preventDefault(); };
tapete_receptor3.ondrop = dropHandler;

tapete_receptor4.ondragenter = function(e) { e.preventDefault(); };
tapete_receptor4.ondragover = function(e) { e.preventDefault(); };
tapete_receptor4.ondraleave = function(e) { e.preventDefault(); };
tapete_receptor4.ondrop = dropHandler;



/* Función que implementa la comprobación de reglas: 
 * ¿Se puede mover la tarjeta a x tapete?
 * Para ello comprueba la última carta añadida al tapete.
 * - Si está vacío, sólo permite añadir reyes, de cualquier color
 * - Si está lleno, sólo permite añadir una carta de número inmediatamente inferior y de 
 *   color opuesto
 */
function comprobarReglas(mazo_origen, mazo_destino, id_tapete_destino) 
{
	var permitido = true;  // Booleano que autoriza o no un movimiento

	// Mover al tapete de sobrantes siempre está permitido
	if (id_tapete_destino != "sobrantes") 
	{
		var carta_que_se_mueve = mazo_origen[mazo_origen.length - 1];

		if (mazo_destino.length == 0) 
		{  
			// Si el vector mazo destino está vacío, sólo dejar insertar reyes
			if (carta_que_se_mueve.getAttribute("data-nombre") != "rey")
			{
				permitido = false;
			}
		} 
		else  // Si ya hay cartas en el mazo, comprobar su valor
		{
			var carta_destino = mazo_destino[mazo_destino.length - 1];

			// Si las cartas son del mismo color, el movimiento no está permitido
			if (carta_que_se_mueve.getAttribute("data-color") 
			    == carta_destino.getAttribute("data-color"))
			{
				permitido = false;
			}
			else
			{
				// Si la carta es de diferente color comprobamos si el número es 
				// inmediatamente inferior. Para ello usamos el vector "numeros" definido 
				// para crear la baraja. Suponiendo que "numeros" está definido en orden 
				// de valor ascendente, buscamos el índice (valor numérico puro) de cada 
				// carta y lo comparamos.
				// Referencia del método findIndex: 
				// https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex

				var valor_carta_movida = numeros.findIndex(
					numeros => numeros == carta_que_se_mueve.getAttribute("data-nombre"))
				var valor_carta_destino = numeros.findIndex(
					numeros => numeros == carta_destino.getAttribute("data-nombre"))

				if (valor_carta_movida != (valor_carta_destino - 1))
				{
					// Si el número de la carta que se mueve no es inmediatamente inferior
					// a la de la última carta en el destino, no se autoriza el movimiento
					permitido = false;
				}
			}
		}
	}

	return permitido;
}


