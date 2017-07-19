/*
* Variable globale avec la liste des Pages
*/
var ListePage = new Array();

/*
* Ajoute une Page dans la liste
*/
function AppAddPage(Titre, Fct, Img) {
	var Page = new Object();
	Page.Titre = Titre;
	Page.Fct = Fct;
	Page.Img = Img;
	ListePage.push(Page);
}

/*
* Ajoute de la Page Home à la liste des Pages
*/
AppAddPage("Home", "BuildHomeScreen()", "HomeImg");

/*
* Variable globale avec la liste des Actions
*/
var ListeAction = new Array();

/*
* Ajoute une Page dans la liste
*/
function AppAddAction(Titre, Fct) {
	var Action = new Object();
	Action.Titre = Titre;
	Action.Fct = Fct;
	ListeAction.push(Action);
	// ajout du boutton action
	if (!document.getElementById("AdminActionButton")) {
		BuildActionMenu();
	}
	// Display du boutton action
	if (document.getElementById("AdminMenuButton")) {
		if (document.getElementById("AdminMenuButton").style.opacity == "1") {
			document.getElementById("AdminActionButton").style.opacity = "1";
		}
	}
}

/*
* Fonction pour demarrer l'application
*/
function AppStartApp() {
	// Ajout du boutton menu
	BuildPageMenu();
	// Construire la premiere page de l'application
	BuildFirstScreen();
}

/*
* Ajout de l action double touch
*/
var lastTap = 0;
var DoubleTouchEventSet = false;
function AddDoubleTouchEvent() {
	document.addEventListener('touchend', DoubleTouchEventFct);
	DoubleTouchEventSet = true;
}

function DoubleTouchEventFct() {
	var currentTime = new Date().getTime();
    var tapLength = currentTime - lastTap;
    if (tapLength < 500 && tapLength > 0) {
    	if (document.getElementById("AdminMenuButton")) {
    		if (document.getElementById("AdminMenuButton").style.opacity == "1") {
    			document.getElementById("AdminMenuButton").style.opacity = "0";
    		} else {
    			document.getElementById("AdminMenuButton").style.opacity = "1";
    		}
    	}
    	if (document.getElementById("AdminActionButton")) {
    		if (document.getElementById("AdminActionButton").style.opacity == "1") {
    			document.getElementById("AdminActionButton").style.opacity = "0";
    		} else {
    			document.getElementById("AdminActionButton").style.opacity = "1";
    		}
    	}
        event.preventDefault();
    } 
    lastTap = currentTime;
}

/*
* Construction du boutton de menu Page
*/
function BuildPageMenu() {
	// Si la liste de Page contient au moin une Page en plus que la Page HOME
	if (ListePage.length > 2) {
		document.body.innerHTML = GetTemplatePageMenu() + document.body.innerHTML;
		// si le double touch event pas actif, on l ajoute
		if (!DoubleTouchEventSet) {
			AddDoubleTouchEvent();
		}
	}
}

function GetTemplatePageMenu() {
	var TemplateCommnandeButton = '<button id="AdminMenuButton" class="CommandButton PageMenu BorderColor" style="display: inline;" onclick="ClickOpenCmdMenu();">☰</button>';
	return TemplateCommnandeButton;
}

function ClickOpenCmdMenu() {
	AppBuildWindow(GetTemplateMenuBoutton(), "30");
}

function GetTemplateMenuBoutton() {
	var reponse ='';
	for (var C in ListePage){
		var Titre = ListePage[C].Titre;
		var Fct = ListePage[C].Fct;
		var ElemImg = AppCreateImage(ListePage[C].Img);
		ElemImg.setAttribute("style", "max-height:50px; width:100%;");
		reponse +=	'<button style="background-color:white;" class="MyButton" onclick="RemoveActionMenu(); AppCleanVue(); AppDeleteWindow();' + Fct + ';">' + 
						'<div class="FlexRow FlexAlignItemCenter FlexContentStart FlexAlignContentCenter">' +
							'<div style="width:15%; margin-right: 5%;">' +ElemImg.outerHTML + '</div>' +
							'<div>' +Titre + '</div>' +
						'</div>' +
					'</button>';
	}
	return reponse;
}

/*
* Construction du boutton de menu Page
*/
function BuildActionMenu() {
	// Si la liste de Page contient au moin une Page en plus que la Page HOME
	if (ListeAction.length > 0) {
		document.body.innerHTML = GetTemplateActionMenu() + document.body.innerHTML;
		// si le double touch event pas actif, on l ajoute
		if (!DoubleTouchEventSet) {
			AddDoubleTouchEvent();
		}
	}
}

function GetTemplateActionMenu() {
	var TemplateActionButton = '<button id="AdminActionButton" class="CommandButton ActionMenu BorderColor" style="display: inline;" onclick="ClickOpenActionMenu();">&#9733</button>';
	return TemplateActionButton;
}

function RemoveActionMenu() {
	ListeAction = new Array();
	if (document.getElementById("AdminActionButton")) {
		var AdminActionButton = document.getElementById("AdminActionButton");
    	AdminActionButton.parentNode.removeChild(AdminActionButton);
	}
}

function ClickOpenActionMenu() {
	AppBuildWindow(GetTemplateActionBoutton(), "30");
}

function GetTemplateActionBoutton() {
	var reponse ='';
	for (var C in ListeAction){
		var Titre = ListeAction[C].Titre;
		var Fct = ListeAction[C].Fct;
		reponse +=	'<button style="background-color:white;" class="MyButton" onclick= "AppDeleteWindow(); ' + Fct + ';">' + 
						'<div class="FlexRow FlexAlignItemCenter FlexContentCenter FlexAlignContentCenter">' +
							'<div>' +Titre + '</div>' +
						'</div>' +
					'</button>';
	}
	return reponse;
}

/*
* Construction de la premiere page de l'application (soit rien, soit home screen, soit la seule page de l'application)
*/
function BuildFirstScreen() {
	if (typeof ListePage != "undefined" && ListePage != null && ListePage.length > 1) {
	 	if (ListePage.length > 2) {
	 		// Build home screen
	 		BuildHomeScreen();
	 	} else {
	 		// Build de la seule page
	 		var myfct = ListePage[1].Fct;
	 		myfct = myfct.replace('()','');
	 		window[myfct]();
	 	}
	} else {
		// Pas de page dans l'application
	 	document.getElementById("AppContent").innerHTML = 'No Page on this application...';
	}
}

/*
* Construction de la page home screen
*/
function BuildHomeScreen() {
	document.getElementById("AppContent").innerHTML = GetTemplateHomeScreen(document.title);
	if (document.getElementById("AdminMenuButton")) {
		if (document.getElementById("AdminMenuButton").style.opacity == "1") {
			document.getElementById("AdminMenuButton").style.opacity = "0";
		}
	}
	if (document.getElementById("AdminActionButton")) {
		if (document.getElementById("AdminActionButton").style.opacity == "1") {
			document.getElementById("AdminActionButton").style.opacity = "0";
		}
	}
}

function GetTemplateHomeScreen(Titre) {
	var reponse = '<div id="Titre" class="Color">' + Titre + '</div>' +
				'<div class="DivWitheSpace"></div>' +
				'<div class="FlexRow FlexAlignItemCenter FlexWrap FlexContentStart FlexAlignContentCenter">' +
					BuilHomeScreenButton() +
				'</div>';
	return reponse;
}

function BuilHomeScreenButton() {
	var reponse = '';
	for (var C=1; C<ListePage.length; C++){
		var button = GetTemplateHomeScreenButton(ListePage[C].Titre, ListePage[C].Img, ListePage[C].Fct);
		reponse += button;
	}
	return reponse;
}

function GetTemplateHomeScreenButton(Titre, Img, Fct) {
	var ElemImg = AppCreateImage(Img);
	ElemImg.classList.add("ImgHomeScreen");
	var reponse =	'<div class="PageButton BorderColor FlexColumn FlexAlignItemCenter FlexContentCenter FlexAlignContentSpaceBetween" onclick=" AppCleanVue(); '+Fct+'">' +
						'<div style="height: 70%;">' + ElemImg.outerHTML + '</div>'+
						'<div class="PageButtonTitre">' + Titre + '</div>' +
					'</div>';
	return reponse;
}

/*
* Creation d une image
*/
function AppCreateImage(Nom) {
	var Src ="";
	// Recherche du nom dans le liste des image
	var ImgNotFindInArray = true;
	for (var C in ApplicationAllImg){
		if (ApplicationAllImg[C].Nom == Nom){
			Src = "data:image/" + ApplicationAllImg[C].Ext + ";base64," + ApplicationAllImg[C].Img;
			ImgNotFindInArray = false;
			break;
		}
	}
	if (ImgNotFindInArray) {
		Src = "SecuredApp/Public/NoImage.jpg";
	}
	var img = document.createElement("img");
	img.setAttribute("src", Src);
	return img;
}

/*
* ajouter une vue
*/
function AppSetVue(Vue){
	document.getElementById("AppContent").innerHTML = Vue;
}

/*
* Vider la vue
*/
function AppCleanVue() {
	document.getElementById("AppContent").innerHTML='';
}

/*
* Construire une fenetre
*/
function AppBuildWindow(TemplateFct, Width) {
	document.body.innerHTML += BuildMenuWindow(TemplateFct, Width);
}

function BuildMenuWindow(GetTemplateFct, Width) {
	var winH = window.innerHeight;
    var divInputScreenTop = (winH/10)  + "px";
    var divInputScreenMaxHeight = winH - 2*(winH/10)  + "px";
    if (window.innerWidth < 700) {
    	Width = 90;
    }
	var Menu = GetTemplateMenuWindows(divInputScreenTop, divInputScreenMaxHeight, Width, GetTemplateFct);
	return Menu;
}

function AppDeleteWindow() {
	var divWindow = document.getElementById("DivWindow");
    divWindow.parentNode.removeChild(divWindow);
}

function GetTemplateMenuWindows(Top, MaxHeight, Width, GetTemplateFct) {
	var reponse ='<div id="DivWindow">' +
					'<div id="ScreenOverlay"></div>' +
					'<div id="InputScreen" style="top: ' + Top + '; max-height: '+ MaxHeight + '; width:'+ Width + '%;">' +
						'<div class="CanvasMenuWindowRowSpaceAround">' +
							'<button class="MyRondButton BackgroundColor" onclick="AppDeleteWindow();">&#x2716</button>' +
						'</div>' +
						'<div class="CanvasMenuWindow">' +
							GetTemplateFct +
						'</div>' +	
						'<div class="DivWitheSpace"></div>' +					
					'</div>' +
				'</div>';
	return reponse;
}

/*
* TimeOutCallBack simple
*/
function AppTimeOutCallBack() {
	alert("TimeOut");
}

/*
* Template de la vue error message
*/
function AppTemplateScreenError(data) {
	var reponse ='' +
					'<div class="DivWitheSpace"></div>' +
					'<div class="Error">' + data + '</div>';
	return reponse;
}