/*
* Ajout de la Page Build de cette vue
*/
AppAddPage("Controller", "BuildControllerVue()", "IconeVueController");

/*
* Construction de la vue
*/
function BuildControllerVue() {
	// Add action
	AppAddAction("Retry", "ControllerGetData()");
	// Set view
	AppSetVue(TemplateControllerScreen());
	// Get Data
	ControllerGetData();
}

/*
* Template de la vue
*/
function TemplateControllerScreen() {
	var reponse ='' +
					'<div id="Titre" class="Color">Controller</div>' +
					'<div id="ControllerContent">' +
					'</div>' +
					'<div class="DivWitheSpace"></div>' ;
	return reponse;
}

function TemplateControllerListe(data) {
	var reponse ='' +
					'<div class="SubTitre1 Color">Order to Send</div>' +
					ControllerCreateElementToSend(data.ToSend) +
					'<div class="DivWitheSpace"></div>' +
					'<div class="SubTitre1 Color">Order to Close</div>' +
					ControllerCreateElementToClose(data.ToClose);
	return reponse;
}

function TemplateControllerElementToSend(OrderId, Nom) {
	var reponse = '' +
		'<div class="ControllerOrderElement BorderColor" onclick="ControllerOpenOrderToSend(\''+ OrderId +'\')">' +
			'<div class="FlexRowToColumn FlexContentStart">' +
				'<div class="ControllerOrderElementA">' +
					'<div class="FlexRow">' +
						'<div class="ControllerOrderElementTitre Color">Order Id:</div>' +
						'<div class="ControllerOrderElementValue" ="">' + OrderId + '</div>' +
					'</div>' +
				'</div>' +
				'<div class="ControllerOrderElementB">' +
					'<div class="FlexRow">' +
						'<div class="ControllerOrderElementTitre Color">Nom:</div>' +
						'<div class="ControllerOrderElementValue">' + Nom + '</div>' +
					'</div>' +
				'</div>' +
			'</div>' +
		'</div>' ;
	return reponse;
}

function TemplateControllerElementToClose(OrderId, Nom) {
	var reponse = '' +
	'<div class="ControllerOrderElement BorderColor" onclick="ControllerOpenOrderToClose(\''+ OrderId +'\')">' +
		'<div class="FlexRowToColumn FlexContentStart">' +
			'<div class="ControllerOrderElementA">' +
				'<div class="FlexRow">' +
					'<div class="ControllerOrderElementTitre Color">Order Id:</div>' +
					'<div class="ControllerOrderElementValue">' + OrderId + '</div>' +
				'</div>' +
			'</div>' +
			'<div class="ControllerOrderElementB">' +
				'<div class="FlexRow">' +
					'<div class="ControllerOrderElementTitre Color">Nom:</div>' +
					'<div class="ControllerOrderElementValue">' + Nom + '</div>' +
				'</div>' +
			'</div>' +
		'</div>' +	
	'</div>';
	return reponse;
}

function TemplateControllerVueToSend(Data) {
	var reponse = '' +
		'<div class="DivWitheSpace"></div>' +
		'<div class="ControllerDataDiv BorderColor">' +
			'<div class="FlexRow" style="width:100%; margin:1%;">' +
				'<div class="ControllerOrderElementTitre Color">Order_Id:</div>' +
				'<div class="ControllerOrderElementValue">' + Data.IdCommande + '</div>' +
			'</div>' +
			'<div class="FlexRow" style="width:100%; margin:1%;">' +
				'<div class="ControllerOrderElementTitre Color">Order:</div>' +
				'<div class="ControllerOrderElementValue">' + Data.Panier + '</div>' +
			'</div>' +
			'<div class="FlexRow" style="width:100%; margin:1%;">' +
				'<div class="ControllerOrderElementTitre Color">Nom:</div>' +
				'<div class="ControllerOrderElementValue">' + Data.Nom + '</div>' +
			'</div>' +
			'<div class="FlexRow" style="width:100%; margin:1%;">' +
				'<div class="ControllerOrderElementTitre Color">Email:</div>' +
				'<div class="ControllerOrderElementValue">' + Data.Email + '</div>' +
			'</div>' +
			'<div class="FlexRow" style="width:100%; margin:1%;">' +
				'<div class="ControllerOrderElementTitre Color">Adresse:</div>' +
				'<div class="ControllerOrderElementValue">' + 
					'<div>' + Data.Adresse1 + '</div>' +
					'<div>' + Data.Adresse2 + '</div>' +
					'<div>' + Data.Adresse3 + '</div>' +
				'</div>' +
			'</div>' +
		'</div>' +
		'<div class="DivWitheSpace"></div>' +
		'<div class="FlexRow FlexContentSpaceAround FlexWrap">' +
			'<button class="MyButton BackgroundColor ControllerButton" onclick= "ControllerPrint(\''+ Data.IdCommande +'\');">Print</button>' +
			'<button class="MyButton BackgroundColor ControllerButton" onclick= "ControllerClickOrderDone(\''+ Data.IdCommande +'\');">Order to Done</button>' +
			'<button class="MyButton BackgroundColor ControllerButton" onclick= "ControllerGetData();">Cancel</button>' +
		'</div>' ;
	return reponse;
}

function TemplateControllerVueToClose(Data) {
	var reponse = '' +
		'<div class="DivWitheSpace"></div>' +
		'<div class="ControllerDataDiv BorderColor">' +
			'<div class="FlexRow" style="width:100%; margin:1%;">' +
				'<div class="ControllerOrderElementTitre Color">Order_Id:</div>' +
				'<div class="ControllerOrderElementValue">' + Data.IdCommande + '</div>' +
			'</div>' +
			'<div class="FlexRow" style="width:100%; margin:1%;">' +
				'<div class="ControllerOrderElementTitre Color">Order:</div>' +
				'<div class="ControllerOrderElementValue">' + Data.Panier + '</div>' +
			'</div>' +
			'<div class="FlexRow" style="width:100%; margin:1%;">' +
				'<div class="ControllerOrderElementTitre Color">Nom:</div>' +
				'<div class="ControllerOrderElementValue">' + Data.Nom + '</div>' +
			'</div>' +
			'<div class="FlexRow" style="width:100%; margin:1%;">' +
				'<div class="ControllerOrderElementTitre Color">Email:</div>' +
				'<div class="ControllerOrderElementValue">' + Data.Email + '</div>' +
			'</div>' +
		'</div>' +
		'<div class="DivWitheSpace"></div>' +
		'<div class="FlexRow FlexContentSpaceAround FlexWrap">' +
			'<button class="MyButton BackgroundColor ControllerButton" onclick= "ControllerViewResult(\''+ Data.IdCommande +'\');">View</button>' +
			'<button class="MyButton BackgroundColor ControllerButton" onclick= "ControllerClickOrderClosed(\''+ Data.IdCommande +'\');">Order to Close</button>' +
			'<button class="MyButton BackgroundColor ControllerButton" onclick= "ControllerGetData();">Cancel</button>' +
		'</div>' + 
		'<div id="ControllerDivVueResult" class="BorderColor" style="border-width: 2px; padding:2%;">' +
		'</div>' ;
	return reponse;
}

function TemplateControllerVueCallBackAction(Data) {
	var reponse = '' +
		'<div style="text-align: center;">' + 
			Data + 
		'</div>' + 
		'<div class="DivWitheSpace"></div>' +
		'<button class="MyButton BackgroundColor ControllerButton" style="margin-left: auto; margin-right: auto;" onclick= "AppDeleteWindow();">Ok</button>' ;
	return reponse;
}

/*
* Variable blobal de la vue
*/
var ControllerData = null;
var ControllerNewWindows = null;

/*
* Fonction de la vue
*/
function ControllerGetData() {
	SendToServer("GetControllerData", "NoData", CallBackControllerGetData, AppTimeOutCallBack);
}

function CallBackControllerGetData(data) {
	if (data.IsValid) {
		ControllerData = data.Message;
		ControllerSetviewListe(data.Message);
	} else {
		AppSetVue(AppTemplateScreenError(data.Message));
	}
}

// faire apparaitre la liste des element a controler
function ControllerSetviewListe(data) {
	document.getElementById("ControllerContent").innerHTML = TemplateControllerListe(data);
}

// Creation des éléménts ToSend
function ControllerCreateElementToSend(data) {
	var reponse = '';
	if (data != null) {
		for (var C in data){
			reponse += TemplateControllerElementToSend(data[C].IdCommande, data[C].Nom);
		}
	} else {
		reponse = '<div style="text-align: left; margin:1%;">No Data</div>';
	}
	
	return reponse;
}

// Creation des éléménts ToClose
function ControllerCreateElementToClose(data) {
	var reponse = '';
	if (data != null) {
		for (var C in data){
			reponse += TemplateControllerElementToClose(data[C].IdCommande, data[C].Nom);
		}
	} else {
		reponse = '<div style="text-align: left; margin:1%;">No Data</div>';
	}
	return reponse;
}

// Open Order To send
function ControllerOpenOrderToSend(OrderId) {
	if (ControllerData != null){
		var AllDataToSend = ControllerData.ToSend;
		for (var C in AllDataToSend){
			if (AllDataToSend[C].IdCommande == OrderId) {
				document.getElementById("ControllerContent").innerHTML = TemplateControllerVueToSend(AllDataToSend[C]);
				break;
			}
		}
	}
}

// Open Order To Close
function ControllerOpenOrderToClose(OrderId) {
	if (ControllerData != null){
		var AllDataToClose = ControllerData.ToClose;
		for (var C in AllDataToClose){
			if (AllDataToClose[C].IdCommande == OrderId) {
				document.getElementById("ControllerContent").innerHTML = TemplateControllerVueToClose(AllDataToClose[C]);
				break;
			}
		}
	}
}

// execution d'un commande tosend
function ControllerClickOrderDone(OrderId) {
	var ModifyOrderData = new Object();
	ModifyOrderData.OrderId = OrderId;
	ModifyOrderData.Action = "OrderToDone";
	SendToServer("ModifyOrder", ModifyOrderData, CallBackControllerModifyOrder, AppTimeOutCallBack);
}

// execution d'un commande ToClose
function ControllerClickOrderClosed(OrderId) {
	var ModifyOrderData = new Object();
	ModifyOrderData.OrderId = OrderId;
	ModifyOrderData.Action = "OrderToClose";
	SendToServer("ModifyOrder", ModifyOrderData, CallBackControllerModifyOrder, AppTimeOutCallBack);
}

// CallBack ModifyOrder
function CallBackControllerModifyOrder(data) {
	if (data.IsValid) {
		ControllerData = data.Message;
		ControllerSetviewListe(data.Message);
	} else {
		AppSetVue(AppTemplateScreenError(data.Message));
	}
}

// Print
function ControllerPrint(OrderId) {
	var ActionOrderData = new Object();
	ActionOrderData.OrderId = OrderId;
	ActionOrderData.Action = "Print";
	SendToServer("ActionToOrder", ActionOrderData, CallBackControllerActionToOrder, AppTimeOutCallBack);
}

// Voir le resultat de l'analyse en PDF
function ControllerViewResult(OrderId) {
	ControllerNewWindows = window.open("","_blank");
	ControllerNewWindows.blur;

	document.getElementById("ControllerDivVueResult").innerHTML = "Waiting...";
	document.getElementById("ControllerDivVueResult").style.borderStyle = "solid"; 
	var ActionOrderData = new Object();
	ActionOrderData.OrderId = OrderId;
	ActionOrderData.Action = "ViewResult";
	SendToServer("ActionToOrder", ActionOrderData, CallBackControllerActionToOrder, AppTimeOutCallBack);
}

// CallBack ActionToOrder
function CallBackControllerActionToOrder(data) {
	if (data.IsValid) {
		var ReponseData = data.Message;
		if (ReponseData.Action == "Print") {
			AppBuildWindow(TemplateControllerVueCallBackAction(ReponseData.Data), "50");
		} else if (ReponseData.Action == "ViewResult") {
			if (ReponseData.Data) {
				var Token = "";
				if (sessionStorage.getItem("Token")) {
					Token = sessionStorage.getItem("Token");
				}
				ControllerNewWindows.location.href = "SecuredApp/Public/PdfViewer.php?Token=" + Token;
				ControllerNewWindows.focus;
			} else {
				ControllerNewWindows.close();
				AppBuildWindow(TemplateControllerVueCallBackAction('Pdf not generated'), "50");
			}
			document.getElementById("ControllerDivVueResult").innerHTML = "";
			document.getElementById("ControllerDivVueResult").style.borderStyle = "none"; 
		} else {
			AppBuildWindow(TemplateControllerVueCallBackAction('Action not found: ' + ReponseData.Action), "50");
		}
		
	} else {
		AppSetVue(AppTemplateScreenError(data.Message));
	}
}