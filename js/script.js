var modal = document.getElementById('windowError');
var span = document.getElementsByClassName("close")[0];

referencias = [["hogar","fuerza","no"],["hola","adios","bye"]]

var globalCount = 0;
document.getElementById("contadorGlobal").innerHTML = "Intentos totales: " + globalCount;

function radioClick(form){
	enableSend(form);
	setRadioBG();
}

//Función que habilita el botón de enviar al escoger un radio button
function enableSend(form){
	form.querySelector("[name = 'send']").disabled = false;
}

//Función que cambia el color del fondo de un radio button seleccionado
function setRadioBG(){
	var elements = document.getElementsByClassName("radio");
	var asd = elements[0].parentNode.parentNode;
	for(var i=0;i<elements.length;i++){
		if(!elements[i].checked == true){
			elements[i].parentNode.parentNode.style.backgroundColor = "";
		}else if(elements[i].disabled == false){
			elements[i].parentNode.parentNode.style.backgroundColor = "rgba(102, 102, 255, 0.4)";
		}
	}
}

function counter(form){
	globalCount++;
	document.getElementById("contadorGlobal").innerHTML = "Intentos totales: " + globalCount;
	var contador = form.querySelector(".contador").childNodes[1].childNodes[1];
	var answersCount = contador.textContent;
	answersCount++;
	contador.innerHTML = answersCount;
	return answersCount;
}

function checkAnswers(form){
	//Creamos las imágenes que se van a utilizar a posteriori según si es correcta o no la respuesta
	var imgTrue = document.createElement("img");
	imgTrue.setAttribute("name","imgCheck");
	var imgFalse = document.createElement("img");
	imgFalse.setAttribute("name","imgCheck");
	imgTrue.src = "images/true.png";
	imgFalse.src = "images/false.png";
	//Se recorren todos los elementos que forman parte del formulario
	for(var i=0;i<form.length;i++){

		if(form.elements[i].checked){
			var count = counter(form);
			var selectedElement = form[i]; //El elemento seleccionado en el radio button
			var parent = selectedElement.parentNode.parentNode; //El elemento padre del radio button
			if(selectedElement.value == "correcto"){
				parent.appendChild(imgTrue); //Añadimos la imagen de respuesta verdadera al elemento padre
				parent.style.backgroundColor = "rgba(63, 191, 63, 0.5)"; //Cambiamos el fondo del elemenento padre
				form.elements.namedItem("restart").disabled = true; //Deshabilitamos el botón restart si la respuesta es correcta
				form.parentNode.style.opacity = 0.6;
			}else{
				parent.appendChild(imgFalse); //Añadimos la imagen de respuesta falsa al elemento padre
				parent.style.backgroundColor = "rgba(255, 0, 0, 0.5)";
				if(count == 3){ //Si falla 3 veces se bloqueará el botón de restart y no permitirá seguir realizando intentos
					maxIntentos(form);
				}
			}
		}
		//Bloqueamos los elementos para que sólo sean usados cuando deben
		form.elements[i].disabled = true;
		if(form.elements[i].name == "restart"){
			form.elements[i].disabled = false; //Desbloqueamos el botón de restart para poder hacer otro intento
		}
	}
}

function terceraPregunta(form){
	var childs = form.childNodes;
	var label = childs[9].childNodes[0];
	var wrongLabel = childs[7].childNodes[0];
	for(var i=0;i<form.length;i++){
		if(form[i].type == "textarea"){
			var valueTA = form[i];
			if(valueTA.value != ""){
				label.style.color = "";
				wrongLabel.style.display = "none";
				label.style.display = "inline";
				label.style.border = "";
				valueTA.style.borderColor = "";
				enviar.disabled = true;
				form.parentNode.style.opacity = 0.6;
			}else{
				wrongLabel.style.color = "red";
				wrongLabel.style.display = "inline";
				valueTA.style.borderColor = "red";
				enviar.disabled = false;
			}
		}
		if(form[i].name == "send"){
			var enviar = form[i];
		}
	}
}

function pcuatro(num,form){
	var parent = form.querySelectorAll("p");
	var lista = form.querySelectorAll(".respuesta");
	var control = true;
	var cuentaCorrectos = 0;
	//la classe por la que empiezan las imagenes

	for(var i=0;i<lista.length;i++){
		if (lista[i].value == "") {
			control = false;
			document.querySelector(".modal").style.display = "block";
		}
	}

	if(control == true){
		for (var i =  0; i <= lista.length-1; i++) {
			var image = parent[i].querySelectorAll("img");
			if(lista[i].value == referencias[num][i]) {//La referencia [num] es para la posicion de la lista
				image[1].style.display = "none";
				image[0].style.display = "inline";
				lista[i].style.borderBottom = "1px solid green";
				cuentaCorrectos++;
			}else{
				image[1].style.display = "inline";
				lista[i].style.borderBottom = "1px solid red";
			}
			lista[i].disabled = true;
			
		}
		var contadorIntentos = counter(form);
		form.elements.namedItem("send").disabled = true;
		if(cuentaCorrectos == 3){
			form.elements.namedItem("restart").disabled = true; //Deshabilitamos el botón restart si la respuesta es correcta
			form.parentNode.style.opacity = 0.6;
		}
	}
	
	if(contadorIntentos == 3){
		maxIntentos(form);
	}
}

function maxIntentos(form){
	form.elements.namedItem("send").disabled = true;
	form.elements.namedItem("restart").disabled = true;
	form.parentNode.style.opacity = 0.6;
	for (var i =  0; i <= lista.length-1; i++) {
		lista[i].disabled = true;
	}
}

function reset4(num,form) {
	var lista = form.querySelectorAll(".respuesta");
	var parent = form.querySelectorAll("p");
	var count = 1;
	for (var i =  0; i < lista.length; i++) {
		//var image = document.getElementsByClassName(count);
		var image = parent[i].querySelectorAll("img");
		if(lista[i].value != referencias[num][i]) {
			image[1].style.display = "none";
			lista[i].style.borderBottom = "1px solid black";
			lista[i].value ="";
			lista[i].disabled = false;
		}
		count++;
	}
	form.elements.namedItem("send").disabled = false;

}

function resetForm(form){			
	for(var i=0;i<form.length;i++){
		if(form[i].checked){
			var selectedElement = form[i];
			var parent = selectedElement.parentNode.parentNode;
			parent.style.backgroundColor = "";
			parent.removeChild(parent.lastChild);
		}
		if(form[i].name != "send"){
			if(form[i].name == "restart"){
				form[i].disabled = true;
			}else{
				form[i].disabled = false;
			}
		}
	}
	form.reset();
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}