var ApplicationAllImg = "";

/*
* Démarrage de l'appliction via l'event onload
*/
function IndexStart() {
    // Ajout du CSS de la page indexe si il n'existe pas
    if (!IsCssExist("SecuredApp.css")) {
        var head  = document.getElementsByTagName('head')[0];
        var link  = document.createElement('link');
        link.rel  = 'stylesheet';
        link.type = 'text/css';
        link.href = 'SecuredApp/Public/SecuredApp.css';
        link.media = 'all';
        head.appendChild(link);
    }
    // Ajout de la balise div de base de l'application
	document.body.innerHTML = '<div id="AppContent"></div>';
    // Rechercher les sources de l application sur le serveur ou afficher la page de login
	if (sessionStorage.getItem("Token")) {
        GetSources();
	} else {
		document.getElementById("AppContent").innerHTML = GetTemplateLogin(document.title);
	}
}

/*
* Retourne la présente d'un fichier CSS
*/
function IsCssExist(Nom) {
    var reponse = false;
    var css = document.styleSheets;
    for (var i = 0, max = css.length; i < max; i++) {
        if (css[i].href != null) {
            if (css[i].href.indexOf(Nom) !== -1){
                reponse = true;
                break;
            }
        }
    }
    return reponse;
}

/*
* Template de la page Login
*/
function GetTemplateLogin(Titre) {
	var LoginTemplate = "" +
	'<div style="display: flex; flex-direction: column; justify-content:space-between; align-content:center; align-items: center;">' +
		'<div class="Color" style="margin: 1%; font-size: 5vw;">' + Titre + '</div>' +
		'<div style="height: 25px;"></div>' +
		'<div id="BoxLogin">' +
    		'<div style="height: 25px;"></div>'+
    		'<input id="LoginValue" class="LoginInput" type="text" name="LoginValue" placeholder="Login" autofocus onkeyup="InputKeyUp(event)" tabindex="1"> <br>' +
    		'<input id="PswValue" class="LoginInput" type="password" name="PswValue" placeholder="Password" onkeyup="InputKeyUp(event)" tabindex="2"> <br>' +
    		'<div id="ErrorMsg" class="Error"></div>' +
    		'<button class="MyButton BackgroundColor" onclick="Send();" tabindex="3">Send</button>' +
		'</div>' +
	'</div>';
	return LoginTemplate;
}

function InputKeyUp(event){
    if(event.keyCode === 13){
    	Send();
    }
}

/*
* Appel au service de login
*/
function Send(){
    if (IsInputStringValide()){
        var LoginInfo = new Object();
        LoginInfo.login = document.getElementById('LoginValue').value;
        LoginInfo.psw = document.getElementById('PswValue').value;
        SendToServer("Login", LoginInfo, CallBackLogin, TimeOutLoginCallBack);
    }
}

function CallBackLogin(data){
	if (data.IsValid){
    	sessionStorage.setItem("Token",data.Message);
        document.getElementById("AppContent").innerHTML = '';
        GetSources();
    } else {
        document.getElementById("ErrorMsg").innerHTML=data.Message;
    }
}

function TimeOutLoginCallBack (){
    document.getElementById("ErrorMsg").innerHTML = "Timeout : Not Possible to contact server";
}

/*
* Validation des donnée d'input du Login
*/
function IsInputStringValide(){
    document.getElementById("ErrorMsg").innerHTML ="";
    var IsValide = true;
    var ErrorMessage = "";
    if (document.getElementById('LoginValue').value.length < 1){
        ErrorMessage += "Enter Login ";
        IsValide = false;
    } 
    if (document.getElementById('PswValue').value.length < 1){
        ErrorMessage += "Enter Password ";
        IsValide = false;
    } 
	if(!IsValide){
		document.getElementById("ErrorMsg").innerHTML = ErrorMessage;
	}
    return IsValide;
}

/*
* Appel au service pour recevoir les sources de l'application
*/
function GetSources(){
    // Si on a deja les sources on les supprimes
    if (document.getElementById("CodeCss")) {
        var CodeCss = document.getElementById("CodeCss");
        CodeCss.parentNode.removeChild(CodeCss);
    }
    if (document.getElementById("CodeJs")) {
        var CodeJs = document.getElementById("CodeJs");
        CodeJs.parentNode.removeChild(CodeJs);
    }
    // appel au serveur
    var Data = "";
    SendToServer("GetSources", Data, CallBackGetSources, TimeOutCallBackGetSources);
}

function CallBackGetSources(data) {
	if (data.IsValid){
		var Code = JSON.parse(data.Message);
		// Add CSS
		var CSS = document.createElement('style');
		CSS.type = 'text/css';
        CSS.id = 'CodeCss';
		CSS.innerHTML = Code.CSS;
		document.getElementsByTagName('head')[0].appendChild(CSS);
		// Add JS
		var JS = document.createElement('script');
		JS.type = 'text/javascript';
        JS.id = 'CodeJs';
		JS.innerHTML = Code.JS;
		document.getElementsByTagName('head')[0].appendChild(JS);
        // Add Image
        ApplicationAllImg = Code.IMG;
		// Start App
		AppStartApp();
    } else {
        alert("Erreur: " + data.MessageID);
    }
}

function TimeOutCallBackGetSources() {
	alert("TimeOut");
}

/*
* Envoie du requet au serveur
*/
function SendToServer(fct, data, CallbackFct, CallServiceTimeOut){
	var Token = "";
	if (sessionStorage.getItem("Token")) {
		Token = sessionStorage.getItem("Token");
	}
	var DataServeur = new Object();
    DataServeur.fct = fct;
    DataServeur.datafct = JSON.stringify(data);
    DataServeur.token = Token;
    var MyJson = JSON.stringify(DataServeur);
    var url = "SecuredApp/Public/ApplicationService.php";
    var PostData = encodeURIComponent('Data') + '=' + encodeURIComponent(MyJson);

    // Mozilla version
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    }
    // IE version
    else if (window.ActiveXObject) {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xhr.open("POST", url, true);
    xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
    //xhr.onreadystatechange=function() {
    xhr.onload=function() {
        if ((xhr.readyState===4) || (xhr.status === 200)){
            var reponse = xhr.responseText;

            if (IsJson(reponse)) {
                var Process = JSON.parse(reponse);
                if (Process.MessageID != "AllSources") {
                    console.log(Process.Message);
                }
                if (!data.IsValid && Process.MessageID == "ErrorNotValidUser"){
                    sessionStorage.setItem("Token","");
                    IndexStart();
                } else {
                    CallbackFct(Process);
                }
            } else {
                //alert("Reponse not Json");
                //console.log(reponse);
                document.body.innerHTML = reponse;
            }
        } else {
                alert( "Unexpected error !\nReadyState Code: " + xhr.readyState + "\nStatus Code: " + xhr.status + "\nStatus texte: " + xhr.statusText + "\nResponseURL: " + xhr.responseURL);
        }
    };
    xhr.onerror=function() {
        alert( "Unexpected error: onerror fct\nReadyState Code: " + xhr.readyState + "\nStatus Code: " + xhr.status + "\nStatus texte: " + xhr.statusText + "\nResponseURL: " + xhr.responseURL);
    };
    xhr.timeout = 20000;
    xhr.ontimeout = CallServiceTimeOut;
    xhr.send(PostData);
}

/*
* la variable est elle de type Json
*/
function IsJson(Json) {
	try{
		var Process = JSON.parse(Json);
		return true;
	} catch(e) {
		return false;
	}
}

/*
* execution automatique de la fonction IndexStart lors du chargement de la page
*/
onload = function() {
    IndexStart();
}