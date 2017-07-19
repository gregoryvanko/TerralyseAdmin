/*
* Ajout de la Page Build de cette vue
*/
AppAddPage("Labo", "BuildLaboVue()", "IconeVueLabo");

/*
* Construction de la vue
*/
function BuildLaboVue() {
	AppSetVue(TemplateLaboScreen());
	LaboGetOpenData();
}

/*
* Template de la vue
*/
function TemplateLaboScreen() {
	var reponse ='' +
					'<div id="Titre" class="Color">Laboratoire</div>' +
					'<div id="LaboContent">' +
					'</div>' +
					'<div class="DivWitheSpace"></div>';
	return reponse;
}

function TemplateLaboSearchScreen() {
	var reponse ='' +
					'<div class="DivWitheSpace"></div>' +
					'<div class="SubTitre1 Color">Search Order</div>' +
					'<div class="FlexRow FlexContentCenter">' +
						'<input style="margin: 1%;" id="OrederSearch" class="LaboInput" type="text" name="OrederSearch" placeholder="Labo ID" autofocus onkeyup="LaboInputKeyUp(event)">' +
						'<button style="margin: 1%;" class="MyButton BackgroundColor" onclick= "LaboIdSearch();">Search</button>' +
					'</div>' +
					'<div id="DivNotFound"></div>' +
					'<div id="DivLaboData"></div>';
	return reponse;
}

function TemplateLaboDataNotFound() {
	var reponse ='' +
					'<div>' +
						'<div class="DivWitheSpace"></div>' +
						'No Data Found' +
					'</div>' ;
	return reponse;
}

function TemplateLaboNoData() {
	var reponse ='' +
					'<div>' +
						'<div class="DivWitheSpace"></div>' +
						'No Data for Labo' +
					'</div>' ;
	return reponse;
}

function TemplateLaboDataFound() {
	var reponse ='' +
					'<div class="DivWitheSpace"></div>' +
					'<div id="LaboInformation">' +
					'</div>' +
					'<div class="DivWitheSpace"></div>' +
					'<div id="LaboResult">' +
					'</div>';
	return reponse;
}

function TemplateLaboDataEchantillon(Data) {
	var reponse = '' +
		'<div class="SubTitre1 Color">Information</div>' +
		'<div class="LaboDataDiv BorderColor">' +
			'<div class="FlexRow" style="width:100%; margin:1%;">' +
				'<div id="TitreOrder_Id" class="LaboElementTitre Color">Order_Id:</div>' +
				'<div class="LaboElementValue">' + Data.IdCommande + '</div>' +
			'</div>' +
			'<div class="FlexRow" style="width:100%; margin:1%;">' +
				'<div id="TitreOrder" class="LaboElementTitre Color">Order:</div>' +
				'<div class="LaboElementValue">' + Data.Panier + '</div>' +
			'</div>' +
			'<div class="FlexRow" style="width:100%; margin:1%;">' +
				'<div id="TitreRue" class="LaboElementTitre Color">Rue:</div>' +
				'<div class="LaboElementValue">' + Data.Rue + '</div>' +
			'</div>' +
			'<div class="FlexRow" style="width:100%; margin:1%;">' +
				'<div id="TitreVille" class="LaboElementTitre Color">Ville:</div>' +
				'<div class="LaboElementValue">' + Data.ZipVille + '</div>' +
			'</div>' +
			'<div class="FlexRow" style="width:100%; margin:1%;">' +
				'<div id="TitrePays" class="LaboElementTitre Color">Pays:</div>' +
				'<div class="LaboElementValue">' + Data.Pays + '</div>' +
			'</div>' +
			'<div class="FlexRow" style="width:100%; margin:1%;">' +
				'<div id="TitreSuperficie" class="LaboElementTitre Color">Superficie:</div>' +
				'<div class="LaboElementValue">' + Data.Superficie + ' m carré</div>' +
			'</div>' +
			'<div class="FlexRow" style="width:100%; margin:1%;">' +
				'<div class="LaboElementTitre Color">Culture précédente:</div>' +
				'<div class="LaboElementValue">' + Data.CulturePrecedente + '</div>' +
			'</div>' +
			'<div class="FlexRow" style="width:100%; margin:1%;">' +
				'<div class="LaboElementTitre Color">Culture Projetée:</div>' +
				'<div class="LaboElementValue">' + Data.CultureProjetee + '</div>' +
			'</div>' +
			'<div class="FlexRow" style="width:100%; margin:1%;">' +
				'<div class="LaboElementTitre Color">Apport Organique:</div>' +
				'<div class="LaboElementValue">' + Data.ApportOrganique + '</div>' +
			'</div>' +
			'<div class="FlexRow" style="width:100%; margin:1%;">' +
				'<div class="LaboElementTitre Color">Apport Engrais:</div>' +
				'<div class="LaboElementValue">' + Data.ApportEngrais + '</div>' +
			'</div>' +
			'<div class="FlexRow" style="width:100%; margin:1%;">' +
				'<div class="LaboElementTitre Color">Type Conseil:</div>' +
				'<div class="LaboElementValue">' + Data.TypeConseils + '</div>' +
			'</div>' +
			'<div class="FlexRow" style="width:100%; margin:1%;">' +
				'<div class="LaboElementTitre Color">Remarque:</div>' +
				'<div class="LaboElementValue">' + Data.Remaque + '</div>' +
			'</div>' +
		'</div>';
	return reponse;
}


function TemplateLaboDataResult(Data) {
	var reponse = '' +
		'<div class="SubTitre1 Color">Résultat</div>' +
		'<div class="LaboDataDiv BorderColor">' +
			'<div class="SubTitre1 Color">Analyse</div>' +
			'<div class="LaboBoxResultat">' +
				'<div class="FlexRow FlexContentSpaceAround" style="width:100%;">' +
					'<div class="LaboBoxResultatCellTitre" style="width:21%;">' + 'Element' + '</div>' +
					'<div class="LaboBoxResultatCellTitre" style="width:16%;">' + 'Teneur' + '</div>' +
					'<div class="LaboBoxResultatCellTitre" style="width:44%;">' + 'Appréciation' + '</div>' +
					'<div class="LaboBoxResultatCellTitre" style="width:19%; border-right-style: solid; border-right-width: 1px; border-right-color: black;">' + 'Référence' + '</div>' +
				'</div>' +
				TemplateLaboResultElement(Data.ElementsAnalyse) +
				'<div class="FlexRow FlexContentSpaceAround" style="width:100%;">' +
					'<div class="LaboBoxResultatCellEnd" style="width:21%;">' + '</div>' +
					'<div class="LaboBoxResultatCellEnd" style="width:16%;">' + '</div>' +
					'<div class="LaboBoxResultatCellEnd" style="width:44%;">' + '</div>' +
					'<div class="LaboBoxResultatCellEnd" style="width:19%;">' + '</div>' +
				'</div>' +
			'</div>' +
			'<div class="SubTitre1 Color">Avis de Fumure</div>' +
			'<div class="LaboBoxResultat">' +
				'<div class="FlexRow FlexContentSpaceAround" style="width:100%;">' +
					'<div class="LaboBoxResultatCellTitre" style="width:50%;">' + 'Nom' + '</div>' +
					'<div class="LaboBoxResultatCellTitre" style="width:50%; border-right-style: solid; border-right-width: 1px; border-right-color: black;">' + 'Quantité' + '</div>' +
				'</div>' +
				TemplateLaboResultFumure(Data.AvisFumure) +
				'<div class="FlexRow FlexContentSpaceAround" style="width:100%;">' +
					'<div class="LaboBoxResultatCellEnd" style="width:50%;">' + '</div>' +
					'<div class="LaboBoxResultatCellEnd" style="width:50%;">' + '</div>' +
				'</div>' +
			'</div>' +
			'<div class="SubTitre1 Color">Commentaire</div>' +
			'<div style="margin:1% 3% 1% 3%; text-align: left; ">' +
				'<textarea onChange="LaboInputResultOnChange();" onkeyup="LaboTextareaKeyUp()" onClick="LaboInputResultOnClick(this)" class="LaboInputResult" rows="3" id="AvisTexte">' + decodeURIComponent(Data.AvisTexte) + '</textarea>' +
			'</div>' +
			'<div class="FlexRow FlexContentSpaceAround FlexWrap">' +
				'<button class="MyButton BackgroundColor LaboButton" onclick= "LaboSaveClick();">Analysis Done</button>' +
				'<button class="MyButton BackgroundColor LaboButton" onclick= "LabobackClick();">Back</button>' +
			'</div>' +
		'</div>';
	return reponse;
}

function TemplateLaboResultElement(Data) {
	var reponse = '';
	for (var C in Data){
		reponse = reponse + 
		'<div class="FlexRow FlexContentSpaceAround" style="width:100%;">' +
			'<div class="LaboBoxResultatCell" style="width:21%;">' + Data[C].Nom + '<br> (' + Data[C].Unite + ')' + '</div>' +
			'<div class="LaboBoxResultatCell" style="width:16%;"> <input onChange="LaboInputResultOnChange();" onkeyup="LaboInputResultKeyUp(event, this)" onClick="LaboInputResultOnClick(this)" class="LaboInputResult" type="text" id="'+ C + 'Teneur' + '" value="' + Data[C].Teneur + '"></div>' +
			'<div class="LaboBoxResultatCell" style="width:44%;"> <input onChange="LaboInputResultOnChange();" onkeyup="LaboInputResultKeyUp(event, this)" onClick="LaboInputResultOnClick(this)" class="LaboInputResult" type="text" id="'+ C + 'Appreciation' + '" value="' + Data[C].Appreciation + '"></div>' +
			'<div class="LaboBoxResultatCell" style="width:19%; border-right-style: solid; border-right-width: 1px; border-right-color: black;"> <input onChange="LaboInputResultOnChange();" onkeyup="LaboInputResultKeyUp(event, this)" onClick="LaboInputResultOnClick(this)" class="LaboInputResult" type="text" id="'+ C + 'Reference' + '" value="' + Data[C].Reference + '"></div>' +
		'</div>';
	}
	return reponse;
}

function TemplateLaboResultFumure(Data) {
	var reponse = '';
	for (var C in Data){
		reponse = reponse + 
		'<div class="FlexRow FlexContentSpaceAround" style="width:100%;">' +
			'<div class="LaboBoxResultatCell" style="width:50%;">' + Data[C].Nom + '</div>' +
			'<div class="LaboBoxResultatCell" style="width:50%; border-right-style: solid; border-right-width: 1px; border-right-color: black;"> <input onChange="LaboInputResultOnChange();" onkeyup="LaboInputResultKeyUp(event, this)" onClick="LaboInputResultOnClick(this)" class="LaboInputResult" type="text" id="'+ C + 'FumureQuantite' + '" value="' + Data[C].Quantité + '"></div>' +
		'</div>';
	}
	return reponse;
}

function TemplateLaboListeData(Data) {
	var reponse = '<div class="SubTitre1 Color">Order to Labo</div>';
	for (var C in Data){
		reponse += TemplateLaboElementData(Data[C].IdCommande);
	}
	return reponse;
}

function TemplateLaboElementData(Data) {
	var reponse = '' +
		'<div class="LaboDataElement BorderColor" onclick="LaboElementDataClick(\''+ Data +'\')">' +
			'<div class="FlexRow">' +
				'<div class="LaboDataElementTitre Color">Labo Id:</div>' +
				'<div class="LaboDataElementValue">' + Data + '</div>' +
			'</div>' +
		'</div>' ;
	return reponse;
}

/*
* Variable blobal de la vue
*/
var LaboResutl = null;
var LaboListeAllData = null;

/*
* Fonction de la vue
*/
function LaboGetOpenData() {
	SendToServer("GetLaboData", "NoData", CallBackLaboGetOpenData, AppTimeOutCallBack);
}

function CallBackLaboGetOpenData(data) {
	if (data.IsValid) {
		if (data.Message != null) {
			LaboListeAllData = data.Message;
			LaboSetTemplateSearchScreen();
			LaboSetTemplateListeData(data.Message);
		} else {
			LaboListeAllData = null;
			LaboSetTemplateSearchScreen();
			LaboSetTemplateLaboNoData();
		}
	} else {
		LaboListeAllData = null;
		AppSetVue(AppTemplateScreenError(data.Message));
	}
}

function LaboInputKeyUp(event) {
	if(event.keyCode === 13){
    	LaboIdSearch();
    }
}

function LaboTextareaKeyUp() {
	var MyTextarea = document.getElementById('AvisTexte');
	if(MyTextarea.scrollTop != 0){
        MyTextarea.style.height = MyTextarea.scrollHeight + "px";
    }
}

function LaboInputResultKeyUp(event, element) {
	if(event.keyCode === 13){
    	element.blur();
    }
}

function LaboInputResultOnClick(element) {
	element.setSelectionRange(0, element.value.length);
}

function LaboInputResultOnChange() {
	// LaboResutl.Resultat.ElementsAnalyse
	for (var C in LaboResutl.Resultat.ElementsAnalyse){
		LaboResutl.Resultat.ElementsAnalyse[C].Teneur = document.getElementById(C + 'Teneur').value;
		LaboResutl.Resultat.ElementsAnalyse[C].Appreciation = document.getElementById(C + 'Appreciation').value;
		LaboResutl.Resultat.ElementsAnalyse[C].Reference = document.getElementById(C + 'Reference').value;
	}

	// LaboResutl.Resultat.AvisFumure
	for (var C in LaboResutl.Resultat.AvisFumure){
		LaboResutl.Resultat.AvisFumure[C].Quantité = document.getElementById(C + 'FumureQuantite').value;
	}

	// LaboResutl.Resultat.AvisTexte
	LaboResutl.Resultat.AvisTexte = encodeURIComponent(document.getElementById('AvisTexte').value);

	// Send LaboResutl
	LaboSaveResult(false);
}

function LaboSaveClick() {
	LaboSaveResult(true);
	AppSetVue(TemplateLaboScreen());
	LaboGetOpenData();
}

function LabobackClick() {
	AppSetVue(TemplateLaboScreen());
	LaboGetOpenData();
}

function LaboElementDataClick(Data) {
	for (var C in LaboListeAllData){
		if (LaboListeAllData[C].IdCommande == Data) {
			LaboSetTemplateLaboDataFound(LaboListeAllData[C]);
			break;
		}
	}
}

function LaboIdSearch() {
	var SearchData = document.getElementById('OrederSearch').value
	if (SearchData.length > 2) {
		SendToServer("SearchLaboId", SearchData, CallBackLaboIdSearch, AppTimeOutCallBack);
	} else {
		AppBuildWindow('<div style="text-align: center;">Search data must be greater than 2</div>', "50");
	}
}

function CallBackLaboIdSearch(data) {
	if (data.IsValid) {
		if (data.Message != null) {
			LaboSetTemplateLaboDataFound(data.Message);
		} else {
			LaboSetTemplateLaboIdNoDataFound();
			LaboResutl = null;
		}
	} else {
		AppSetVue(AppTemplateScreenError(data.Message));
		LaboResutl = null;
	}
}

function LaboSaveResult(LaboDone) {
	LaboResutlToSend = new Object();
	LaboResutlToSend.IdCommande = LaboResutl.IdCommande;
	LaboResutlToSend.Resultat = JSON.stringify(LaboResutl.Resultat);
	LaboResutlToSend.LaboDone = LaboDone;
	LaboResutlToSend.DateTime = LaboGetDateTime();
	SendToServer("SaveLaboResult", LaboResutlToSend, CallBackLaboSaveResult, AppTimeOutCallBack);
}

function CallBackLaboSaveResult(data) {
	if (data.IsValid) {
		console.log("Labo Result Saved.");
	} else {
		AppSetVue(AppTemplateScreenError(data.Message));
	}
}

function LaboSetTemplateSearchScreen() {
	document.getElementById("LaboContent").innerHTML = TemplateLaboSearchScreen();
}

function LaboSetTemplateLaboIdNoDataFound() {
	document.getElementById("DivNotFound").innerHTML = TemplateLaboDataNotFound();
}

function LaboSetTemplateLaboNoData() {
	document.getElementById("DivLaboData").innerHTML = TemplateLaboNoData();
}

function LaboSetTemplateLaboDataFound(data) {
	LaboResutl = new Object();
	LaboResutl.IdCommande = data.IdCommande;
	LaboResutl.Resultat = JSON.parse(data.Resultat);
	document.getElementById("LaboContent").innerHTML = TemplateLaboDataFound();
	document.getElementById("LaboInformation").innerHTML = TemplateLaboDataEchantillon(data);
	document.getElementById("LaboResult").innerHTML = TemplateLaboDataResult(LaboResutl.Resultat);
	// Auto resize Textarea
	var MyTextarea = document.getElementById('AvisTexte');
	MyTextarea.style.height = MyTextarea.scrollHeight + "px";
}

function LaboSetTemplateListeData(Data) {
	document.getElementById("DivLaboData").innerHTML = TemplateLaboListeData(Data);
}

function LaboGetDateTime(){
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();
    var HH = today.getHours();
    var MM = today.getMinutes();
    var SS = today.getSeconds();

    if(dd<10) {
        dd='0'+dd;
    } 
    if(mm<10) {
        mm='0'+mm;
    } 
    return yyyy+ "/" + mm + "/" + dd + " " + HH + ":" + MM + ":" + SS;
}