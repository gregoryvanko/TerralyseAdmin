/*
* Ajout de la Page Build de cette vue
*/
AppAddPage("InfoOrder", "BuildInfoOrderVue()", "IconeVueInfoOrder");

/*
* Construction de la vue
*/
function BuildInfoOrderVue() {
	AppSetVue(TemplateInfoOrderScreen());
}

/*
* Template de la vue
*/
function TemplateInfoOrderScreen() {
	var reponse ='' +
					'<div id="Titre" class="Color">Information</div>' +
					'<div class="DivWitheSpace"></div>' +
					'<div class="FlexRow FlexContentCenter">' +
						'<input style="margin: 1%;" id="OrederSearch" class="InfoOrderInput" type="text" name="OrederSearch" autofocus placeholder="Order" onkeyup="InfoOrderInputKeyUp(event)">' +
						'<button style="margin: 1%;" class="MyButton BackgroundColor" onclick= "InfoOrderSearch();">Search</button>' +
					'</div>' +
					'<div class="DivWitheSpace"></div>' +
					'<div id="InfoOrederContent">' +
					'</div>' +
					'<div class="DivWitheSpace"></div>' +
					'<div id="InfoOrederResult">' +
					'</div>' +
					'<div class="DivWitheSpace"></div>' ;
	return reponse;
}

function TemplateInfoOrderNoDataFound() {
	var reponse ='' +
					'<div>' +
					'No Data Found' +
					'</div>' ;
	return reponse;
}

function TemplateInfoOrderData(Data) {
	var reponse = '' +
		'<div class="SubTitre1 Color">Information</div>' +
		'<div class="InfoOrderDataDiv BorderColor">' +
			'<div class="FlexRow" style="width:100%; margin:1%;">' +
				'<div id="TitreOrder_Id" class="InfoOrderElementTitre Color">Order_Id:</div>' +
				'<div class="InfoOrderElementValue">' + Data.IdCommande + '</div>' +
			'</div>' +
			'<div class="FlexRow" style="width:100%; margin:1%;">' +
				'<div id="TitrePaypal_Id" class="InfoOrderElementTitre Color">Paypal_Id:</div>' +
				'<div class="InfoOrderElementValue">' + Data.IdPaypal + '</div>' +
			'</div>' +
			'<div class="FlexRow" style="width:100%; margin:1%;">' +
				'<div id="TitreStatus" class="InfoOrderElementTitre Color">Status:</div>' +
				'<div class="InfoOrderElementValue">' + Data.Status + '</div>' +
			'</div>' +
			'<div class="FlexRow" style="width:100%; margin:1%;">' +
				'<div id="TitreOrder" class="InfoOrderElementTitre Color">Order:</div>' +
				'<div class="InfoOrderElementValue">' + Data.Panier + '</div>' +
			'</div>' +
			'<div class="FlexRow" style="width:100%; margin:1%;">' +
				'<div id="TitreNom" class="InfoOrderElementTitre Color">Nom:</div>' +
				'<div class="InfoOrderElementValue">' + Data.Nom + '</div>' +
			'</div>' +
			'<div class="FlexRow" style="width:100%; margin:1%;">' +
				'<div id="TitrePrenom" class="InfoOrderElementTitre Color">Prenom:</div>' +
				'<div class="InfoOrderElementValue">' + Data.Prenom + '</div>' +
			'</div>' +
			'<div class="FlexRow" style="width:100%; margin:1%;">' +
				'<div id="TitreEmail" class="InfoOrderElementTitre Color">Email:</div>' +
				'<div class="InfoOrderElementValue">' + Data.Email + '</div>' +
			'</div>' +
			'<div class="FlexRow" style="width:100%; margin:1%;">' +
				'<div id="TitreRue" class="InfoOrderElementTitre Color">Rue:</div>' +
				'<div class="InfoOrderElementValue">' + Data.Rue + '</div>' +
			'</div>' +
			'<div class="FlexRow" style="width:100%; margin:1%;">' +
				'<div id="TitreVille" class="InfoOrderElementTitre Color">Ville:</div>' +
				'<div class="InfoOrderElementValue">' + Data.ZipVille + '</div>' +
			'</div>' +
			'<div class="FlexRow" style="width:100%; margin:1%;">' +
				'<div id="TitrePays" class="InfoOrderElementTitre Color">Pays:</div>' +
				'<div class="InfoOrderElementValue">' + Data.Pays + '</div>' +
			'</div>' +
			'<div class="FlexRow" style="width:100%; margin:1%;">' +
				'<div id="TitreSuperficie" class="InfoOrderElementTitre Color">Superficie:</div>' +
				'<div class="InfoOrderElementValue">' + Data.Superficie + ' m carré</div>' +
			'</div>' +
			'<div class="FlexRow" style="width:100%; margin:1%;">' +
				'<div class="InfoOrderElementTitre Color">Culture précédente:</div>' +
				'<div class="InfoOrderElementValue">' + Data.CulturePrecedente + '</div>' +
			'</div>' +
			'<div class="FlexRow" style="width:100%; margin:1%;">' +
				'<div class="InfoOrderElementTitre Color">Culture Projetée:</div>' +
				'<div class="InfoOrderElementValue">' + Data.CultureProjetee + '</div>' +
			'</div>' +
			'<div class="FlexRow" style="width:100%; margin:1%;">' +
				'<div class="InfoOrderElementTitre Color">Apport Organique:</div>' +
				'<div class="InfoOrderElementValue">' + Data.ApportOrganique + '</div>' +
			'</div>' +
			'<div class="FlexRow" style="width:100%; margin:1%;">' +
				'<div class="InfoOrderElementTitre Color">Apport Engrais:</div>' +
				'<div class="InfoOrderElementValue">' + Data.ApportEngrais + '</div>' +
			'</div>' +
			'<div class="FlexRow" style="width:100%; margin:1%;">' +
				'<div class="InfoOrderElementTitre Color">Type Conseil:</div>' +
				'<div class="InfoOrderElementValue">' + Data.TypeConseils + '</div>' +
			'</div>' +
			'<div class="FlexRow" style="width:100%; margin:1%;">' +
				'<div class="InfoOrderElementTitre Color">Remarque:</div>' +
				'<div class="InfoOrderElementValue">' + Data.Remaque + '</div>' +
			'</div>' +
			'<div class="FlexRow" style="width:100%; margin:1%;">' +
				'<div class="InfoOrderElementTitre Color">Date Achat:</div>' +
				'<div class="InfoOrderElementValue">' + Data.QuestDate + '</div>' +
			'</div>' +
		'</div>';
	return reponse;
}

function TemplateInfoOrderResult(Data) {
	var reponse = '' +
		'<div class="SubTitre1 Color">Résultat</div>' +
		'<div class="InfoOrderDataDiv BorderColor">' +
			'<div class="SubTitre1 Color">Analyse</div>' +
			'<div class="InfoOrderBoxResultat">' +
				'<div class="FlexRow FlexContentSpaceAround" style="width:100%;">' +
					'<div class="InfoOrderBoxResultatCellTitre" style="width:21%;">' + 'Element' + '</div>' +
					'<div class="InfoOrderBoxResultatCellTitre" style="width:16%;">' + 'Teneur' + '</div>' +
					'<div class="InfoOrderBoxResultatCellTitre" style="width:44%;">' + 'Appréciation' + '</div>' +
					'<div class="InfoOrderBoxResultatCellTitre" style="width:19%; border-right-style: solid; border-right-width: 1px; border-right-color: black;">' + 'Référence' + '</div>' +
				'</div>' +
				TemplateInfoOrderResultElement(Data.ElementsAnalyse) +
				'<div class="FlexRow FlexContentSpaceAround" style="width:100%;">' +
					'<div class="InfoOrderBoxResultatCellEnd" style="width:21%;">' + '</div>' +
					'<div class="InfoOrderBoxResultatCellEnd" style="width:16%;">' + '</div>' +
					'<div class="InfoOrderBoxResultatCellEnd" style="width:44%;">' + '</div>' +
					'<div class="InfoOrderBoxResultatCellEnd" style="width:19%;">' + '</div>' +
				'</div>' +
			'</div>' +
			'<div class="SubTitre1 Color">Avis de Fumure</div>' +
			'<div class="InfoOrderBoxResultat">' +
				'<div class="FlexRow FlexContentSpaceAround" style="width:100%;">' +
					'<div class="InfoOrderBoxResultatCellTitre" style="width:50%;">' + 'Nom' + '</div>' +
					'<div class="InfoOrderBoxResultatCellTitre" style="width:50%; border-right-style: solid; border-right-width: 1px; border-right-color: black;">' + 'Quantité' + '</div>' +
				'</div>' +
				TemplateInfoOrderResultFumure(Data.AvisFumure) +
				'<div class="FlexRow FlexContentSpaceAround" style="width:100%;">' +
					'<div class="InfoOrderBoxResultatCellEnd" style="width:50%;">' + '</div>' +
					'<div class="InfoOrderBoxResultatCellEnd" style="width:50%;">' + '</div>' +
				'</div>' +
			'</div>' +
			'<div class="SubTitre1 Color">Commentaire</div>' +
			'<div style="margin:1% 3% 1% 3%; text-align: left; ">' +
				decodeURIComponent(Data.AvisTexte).replace(/\n/g, "<br />") + 
			'</div>' +
		'</div>';
	return reponse;
}

function TemplateInfoOrderResultElement(Data) {
	var reponse = '';
	for (var C in Data){
		reponse = reponse + 
		'<div class="FlexRow FlexContentSpaceAround" style="width:100%;">' +
			'<div class="InfoOrderBoxResultatCell" style="width:21%;">' + Data[C].Nom + '<br> (' + Data[C].Unite + ')' + '</div>' +
			'<div class="InfoOrderBoxResultatCell" style="width:16%;">' + Data[C].Teneur + '</div>' +
			'<div class="InfoOrderBoxResultatCell" style="width:44%;">' + Data[C].Appreciation + '</div>' +
			'<div class="InfoOrderBoxResultatCell" style="width:19%; border-right-style: solid; border-right-width: 1px; border-right-color: black;">' + Data[C].Reference + '</div>' +
		'</div>';
	}
	return reponse;
}

function TemplateInfoOrderResultFumure(Data) {
	var reponse = '';
	for (var C in Data){
		reponse = reponse + 
		'<div class="FlexRow FlexContentSpaceAround" style="width:100%;">' +
			'<div class="InfoOrderBoxResultatCell" style="width:50%;">' + Data[C].Nom + '</div>' +
			'<div class="InfoOrderBoxResultatCell" style="width:50%; border-right-style: solid; border-right-width: 1px; border-right-color: black;">' + Data[C].Quantité + '</div>' +
		'</div>';
	}
	return reponse;
}

function TemplateInfoOrderListeElement(Data) {
	var reponse = '' +
		'<div class="InfoOrderListElement BorderColor" onclick="InfoOrderOpenElement(\''+ Data.SearchId +'\', \''+ Data.SearchType +'\')">'+
			'<div class="FlexRow">' +
				'<div style="width:50%;" class="InfoOrderElementTitre Color">' + Data.SearchType + ':</div>' +
				'<div style="width:50%;" class="InfoOrderElementValue">' + Data.SearchValue + '</div>' +
			'</div>' +
		'</div>' ;
	return reponse;
}

/*
* Variable blobal de la vue
*/
var InfoOrderData = null;

/*
* Fonction de la vue
*/
function InfoOrderInputKeyUp(event) {
	if(event.keyCode === 13){
    	InfoOrderSearch();
    }
}

function InfoOrderSearch() {
	var SearchData = document.getElementById('OrederSearch').value
	if (SearchData.length > 2) {
		SendToServer("SearchOrder", SearchData, CallBackInfoOrderSearch, AppTimeOutCallBack);
	} else {
		AppBuildWindow('<div style="text-align: center;">Search data must be greater than 2</div>', "50");
	}
}

function CallBackInfoOrderSearch(data) {
	if (data.IsValid) {
		InfoOrderData = data.Message;
		if (data.Message.length > 0) {
			if (data.Message.length == 1) {
				InfoOrderSetTemplateOrderData(data.Message[0].SearchData, data.Message[0].SearchType);
			} else {
				var AllData = data.Message;
				var reponse = '';
				for (var C in AllData){
					reponse += TemplateInfoOrderListeElement(AllData[C])
				}
				InfoOrderSetTemplateListeElement(reponse);
			}
		} else {
			InfoOrderSetTemplateNoDataFound();
		}
	} else {
		AppSetVue(AppTemplateScreenError(data.Message));
	}
}

function InfoOrderOpenElement(SearchId, SearchType) {
	for (var C in InfoOrderData){
		if (InfoOrderData[C].SearchId == SearchId) {
			InfoOrderSetTemplateOrderData(InfoOrderData[C].SearchData, SearchType);
			break;
		}
	}
}

function InfoOrderSetTemplateNoDataFound() {
	document.getElementById("InfoOrederContent").innerHTML = TemplateInfoOrderNoDataFound();
}

function InfoOrderSetTemplateOrderData(Data, SearchType) {
	document.getElementById("InfoOrederContent").innerHTML = TemplateInfoOrderData(Data);
	document.getElementById("Titre" + SearchType).style.color = "blue";
	document.getElementById("InfoOrederResult").innerHTML = TemplateInfoOrderResult(JSON.parse(Data.Resultat));
}

function InfoOrderSetTemplateListeElement(Data) {
	document.getElementById("InfoOrederContent").innerHTML = Data;
	document.getElementById("InfoOrederResult").innerHTML ='';
}