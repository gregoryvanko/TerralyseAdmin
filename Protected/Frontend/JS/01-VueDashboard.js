/*
* Ajout de la Page Build de cette vue
*/
AppAddPage("Dashboard", "BuildDashboardVue()", "IconeVueDashboard");

/*
* Construction de la vue
*/
function BuildDashboardVue() {
	// Add action
	AppAddAction("Retry", "GetDasboardData()");
	// Get Dashboard Data before construct vue
	GetDasboardData();
}

/*
* Template de la vue
*/
function TemplateDashbordScreen(data) {
	var convinced = "Na";
	if (data.NumPageIndex != 0) {
		convinced = data.NumPageQuest / data.NumPageIndex * 100;
		convinced = Math.round(convinced * 100) / 100;
	}

	var winW = window.innerWidth;
	if (winW > 1200) {
		winW = 1200 * 80 / 100;
	} else {
		winW = winW * 80 / 100;
	}


	if (winW > 700) {
		winH = 400;
	} else {
		winH = 200;
	}


	var reponse ='' +
					'<div id="Titre" class="Color">Dashboard</div>' +
					'<div class="DivWitheSpace"></div>' +
					'<div class="FlexRow FlexWrap FlexContentCenter">' +
					 	TemplateDashbordElement("List", "ToDo", data.PaypalVal + data.LaboDone) +
					 	TemplateDashbordElement("InProgress", "Process", data.Waiting) +
				 	'</div>' +
				 	'<div class="DivWitheSpace"></div>' +
				 	'<div class="FlexRow FlexWrap FlexContentCenter">' +
				 		TemplateDashbordElement("Done", "Done", data.Close) +
					 	TemplateDashbordElement("Drop", "Drop", data.Other + data.Init + data.PaypalInit + data.PaypalCancel) +
					 	TemplateDashbordElement("Convinced", "Convinced", convinced + "%") +
					'</div>' +
					'<div class="DivWitheSpace"></div>' +
					'<div class="DashboardChart BorderColor FlexRow FlexWrap FlexContentCenter ct-chart ct-major-tenth"></div>' +
					'<div class="DivWitheSpace"></div>' ;
	return reponse;
}

function TemplateDashbordElement(Image, Titre, Valeur) {
	var ElemImg = AppCreateImage(Image);
	ElemImg.setAttribute("class", "DashboardElementImg");
	var reponse ='' +
					'<div class="DashboardElement BorderColor FlexRow FlexContentCenter">' +
						'<div class="FlexColumn FlexContentSpaceAround" style="width: 50%;">' +
							'<div class="DashboardElementDivImg">' + ElemImg.outerHTML + '</div>' +
							'<div class="DashboardElementTitre">' + Titre + '</div>' +
						'</div>' +
						'<div class="FlexColumn FlexContentSpaceAround DashboardElementValue">' + Valeur + '</div>' +
					'</div>';
	return reponse;
}

/*
* Fonction de la vue
*/
function GetDasboardData() {
	SendToServer("GetDasboardData", "NoData", CallBackGetDasboardData, AppTimeOutCallBack);
}

function CallBackGetDasboardData(data) {
	if (data.IsValid) {
		AppSetVue(TemplateDashbordScreen(data.Message));
		BuildChartUserCount(data.Message);
	} else {
		AppSetVue(AppTemplateScreenError(data.Message));
	}
}

function BuildChartUserCount(data){
	var InputData = data.Utilisation;
	
	var NumberofMonth = 13;

	var today = new Date();
	today.setMonth( today.getMonth() +1 - NumberofMonth );
	var StartMonth = today.getMonth()+1;
	var StartYear = today.getFullYear();

	var AllLabel = [];
	var Alldata = [];
	var calcmont = Number(StartMonth);
	var CalcYear = Number(StartYear);
	for (i = 0; i < NumberofMonth; i++) {
		if (calcmont >= 13) {
			calcmont = 1;
			CalcYear +=1;
		}
		AllLabel.push(CalcYear + " " + Digit2(calcmont) );
		var data = GetChartUserCountData(InputData, CalcYear, calcmont);
		Alldata.push(data);
		calcmont += 1;
	}

	var data = {
	  labels: AllLabel,
	  series: [
	    Alldata
	  ]
	};

	var Opt = {
		axisY: {
			onlyInteger: true
		}
	};

	var OptResponsive = [
	  ['screen and (min-width: 700px)', {
	    axisX: {
	      labelInterpolationFnc: function (value) {
	        return value;
	      }
	    }
	  }],
	  ['screen and (max-width: 700px)', {
	    axisX: {
	      labelInterpolationFnc: function (value) {
	      	var data = value[2].toString() + value[3].toString() + value[4].toString() + value[5].toString() + value[6].toString();
	        return data;
	      }
	    }
	  }]
	];

	new Chartist.Line('.ct-chart', data, Opt, OptResponsive);
}

function GetChartUserCountData(InputData, Year, Month) {
	var reponse = "0";
	for (var C in InputData){
		if ((InputData[C].Year == Year) && (InputData[C].Month == Month)) {
			reponse = Number(InputData[C].CountUserId);
			break;
		}
	}

	return reponse;
}

function Digit2(number) {
     return (number < 10 ? '0' : '') + number  
}