<?php 
/*
* Ajout des services
*/
AddProtectedFunction("GetDasboardData");
AddProtectedFunction("GetControllerData");
AddProtectedFunction("GetLaboData");
AddProtectedFunction("ModifyOrder");
AddProtectedFunction("ActionToOrder");
AddProtectedFunction("SearchOrder");
AddProtectedFunction("SearchLaboId");
AddProtectedFunction("SaveLaboResult");


/*
* Definition des services
*/
function GetDasboardData($MyData)
{
	$Reponse = new Process(FALSE, "NoMsgId", "Fonction Init GetDasboardData");

	$SqlReponse = SendSqlQuerry("SELECT Status from Commande");
	if ($SqlReponse->IsValid) {
		$Data = new stdClass;
	    $Data->Init = 0;
	    $Data->PaypalInit = 0;
	    $Data->PaypalCancel = 0;
	    $Data->PaypalVal = 0;
	    $Data->Waiting = 0;
	    $Data->LaboDone = 0;
	    $Data->Close = 0;
	    $Data->Other = 0;
	    $Data->NumPageIndex = 0;
	    $Data->NumPageQuest = 0;
	    $Data->Utilisation = 0;

		$SqlResult = $SqlReponse->Data;
		if ($SqlResult->num_rows > 0){
	        while($row = $SqlResult->fetch_assoc()){
	        	switch ($row["Status"]) {
	        		case "Init":
	        			$Data->Init += 1;
	        			break;
	        		case "PaypalInitDone":
	        			$Data->PaypalInit += 1;
	        			break;
        			case "PaypalCancel":
	        			$Data->PaypalCancel += 1;
	        			break;
        			case "PaypalValDone":
	        			$Data->PaypalVal += 1;
	        			break;
	        		case "Waiting":
	        			$Data->Waiting += 1;
	        			break;
        			case "LaboDone":
	        			$Data->LaboDone += 1;
	        			break;
	        		case "Close":
	        			$Data->Close += 1;
	        			break;
        			default:
        				$Data->Other += 1;
	        	}
	        }
	    }

	    $SqlReponse1 = SendSqlQuerry("SELECT COUNT(Page) as NumIndex FROM LogBrowserInfo where Page like '%index%'");
	    if ($SqlReponse1->IsValid) {
	    	$SqlResult = $SqlReponse1->Data;
	    	if ($SqlResult->num_rows > 0){
	    		$row = $SqlResult->fetch_assoc();
	    		$Data->NumPageIndex = $row["NumIndex"];
	    	}

	    	$SqlReponse2 = SendSqlQuerry("SELECT COUNT(Page) as NumQuest FROM LogBrowserInfo where Page like '%Questionnaire%'");
	    	if ($SqlReponse2->IsValid) {
	    		$SqlResult = $SqlReponse2->Data;
	    		if ($SqlResult->num_rows > 0){
		    		$row = $SqlResult->fetch_assoc();
		    		$Data->NumPageQuest = $row["NumQuest"];
		    	}

		    	$SqlReponse3 = SendSqlQuerry("SELECT Year(Date) as Year, Month(Date) as Month, COUNT(DISTINCT(UserId)) as Count FROM LogBrowserInfo GROUP BY YEAR(Date), MONTH(Date) ORDER BY Year DESC LIMIT 13"); // Attention, on limite le nombre de mois a 13 car il y a un affichage de 13 coté client NumberofMonth
		    	if ($SqlReponse3->IsValid){
		    		$SqlResult = $SqlReponse3->Data;
		    		if ($SqlResult->num_rows > 0){
		    			$AllUtilisation = array();
		    			while($row = $SqlResult->fetch_assoc()){
		    				$Usage = new stdClass;
	    					$Usage->Year = $row["Year"];
	    					$Usage->Month = $row["Month"];
	    					$Usage->CountUserId = $row["Count"];
	    					array_push($AllUtilisation,$Usage);
		    			}
		    			$Data->Utilisation = $AllUtilisation;
		    		}
		    		$Reponse->Set(true, "ValideGetData", $Data);
		    	} else {
			    	$Reponse->Set(false, "ErrorGetData", $SqlReponse3->Message);
			    }

    		} else {
		    	$Reponse->Set(false, "ErrorGetData", $SqlReponse2->Message);
		    }

	    } else {
	    	$Reponse->Set(false, "ErrorGetData", $SqlReponse1->Message);
	    }

	} else {
		$Reponse->Set(false, "ErrorGetData", $SqlReponse->Message);
	}
	return $Reponse;
}

function GetControllerData($MyData)
{
	$Reponse = new Process(FALSE, "NoMsgId", "Fonction Init GetControllerData");
	$Reponse = GetAllDataForControllerVue();
	return $Reponse;
}

function GetLaboData($MyData)
{
	$Reponse = new Process(FALSE, "NoMsgId", "Fonction Init GetLaboData");
	$Reponse = GetAllDataForLaboVue();
	return $Reponse;
}

function ModifyOrder($MyData)
{
	$Reponse = new Process(FALSE, "NoMsgId", "Fonction Init ModifyOrder");
	$OrderId = $MyData->OrderId;
	$Action = $MyData->Action;
	switch ($Action){
		case "OrderToDone":
			$SqlReponse = SendSqlQuerry("UPDATE Commande SET Status='Waiting' WHERE IdCommande = '$OrderId'");
			if ($SqlReponse->IsValid){
				$Reponse = GetAllDataForControllerVue();
			} else {
				$Reponse->Set(false, "ErrorModifyOrder", $SqlReponse->Message);
			}
			break;
		case "OrderToClose":
			$SqlReponse = SendSqlQuerry("UPDATE Commande SET Status='Close' WHERE IdCommande = '$OrderId'");
			if ($SqlReponse->IsValid){
				$Reponse = GetAllDataForControllerVue();
			} else {
				$Reponse->Set(false, "ErrorModifyOrder", $SqlReponse->Message);
			}
			break;
		default:
			$Reponse->Set(false, "ErrorModifyOrder", "Action not found: '" . $Action ."'");
	}

	return $Reponse;
}

function ActionToOrder($MyData)
{
	$Reponse = new Process(FALSE, "NoMsgId", "Fonction Init ActionToOrder");
	$OrderId = $MyData->OrderId;
	$Action = $MyData->Action;
	$ResponseData = new stdClass;
	$ResponseData->Action = $Action;
	$ResponseData->Data = null;
	switch ($Action){
		case "Print":
			$ResponseData->Data = "Print action done";
			$Reponse->Set(true, "ValideActionToOrder", $ResponseData);
			break;
		case "ViewResult":
			// génération du fichier pdf
			if (GeneratePdfResultat($OrderId)) {
				$ResponseData->Data = true;
			} else {
				$ResponseData->Data = false;
			}
			$Reponse->Set(true, "ValideActionToOrder", $ResponseData);
			break;
		default:
			$Reponse->Set(false, "ErrorActionToOrder", "Action not found: '" . $Action ."'");
	}

	return $Reponse;
}

function SearchOrder($MyData)
{
	$Reponse = new Process(FALSE, "NoMsgId", "Fonction Init SearchOrder");
	$SearchReponse = array();
	$Reponse = SearchOrderByValue($MyData, $SearchReponse, "IdCommande", "Order_Id");
	if ($Reponse->IsValid) {
		$Reponse = SearchOrderByValue($MyData, $Reponse->Message, "IdPaypal", "Paypal_Id");
		if ($Reponse->IsValid){
			$Reponse = SearchOrderByValue($MyData, $Reponse->Message, "Status", "Status");
			if ($Reponse->IsValid){
				$Reponse = SearchOrderByValue($MyData, $Reponse->Message, "Nom", "Nom");
				if ($Reponse->IsValid){
					$Reponse = SearchOrderByValue($MyData, $Reponse->Message, "Prenom", "Prenom");
					if ($Reponse->IsValid){
						$Reponse = SearchOrderByValue($MyData, $Reponse->Message, "Email", "Email");
						if ($Reponse->IsValid){
							$Reponse = SearchOrderByValue($MyData, $Reponse->Message, "Rue", "Rue");
							if ($Reponse->IsValid){
								$Reponse = SearchOrderByValue($MyData, $Reponse->Message, "Zip", "Ville");
								if ($Reponse->IsValid){
									$Reponse = SearchOrderByValue($MyData, $Reponse->Message, "Ville", "Ville");
								}
							}
						}
					}
				}
			}
		}
	}
	return $Reponse;
}

function SearchLaboId($MyData)
{
	$Reponse = new Process(FALSE, "NoMsgId", "Fonction Init SearchLaboId");
	$SqlReponse = SendSqlQuerry("SELECT * FROM Commande where IdCommande like '%$MyData%'");
	if ($SqlReponse->IsValid) {
		$SqlResult = $SqlReponse->Data;
		if ($SqlResult->num_rows == 1){
			while($row = $SqlResult->fetch_assoc()){
				$Reponse->Set(true, "ValideSearchLaboId", SearchLaboResultData($row));
			}
		} else {
			$Reponse->Set(true, "ValideSearchLaboId", null);
		}
	} else {
		$Reponse->Set(false, "ErrorSearchLaboId", $SqlReponse->Message);
	}
	return $Reponse;
}

function SaveLaboResult($MyData)
{
	date_default_timezone_set("Europe/Brussels");
	$Reponse = new Process(FALSE, "NoMsgId", "Fonction Init SaveLaboResult");
	$IdCommande = $MyData->IdCommande;
	$Resultat = addslashes($MyData->Resultat);
	// Sauver les donnees
	$SqlReponse = SendSqlQuerry("UPDATE Commande SET Resultat='$Resultat', LaboSaveDate='$MyData->DateTime' WHERE IdCommande = '$IdCommande'");
	if ($SqlReponse->IsValid){
		$Reponse->Set(true, "ValideSaveLaboResult", "Valide SaveLaboResult");
	} else {
		$Reponse->Set(false, "ErrorSaveLaboResult", $SqlReponse->Message);
	}
	// si LaboDone == true alors on change le statut de la commande
	if ($MyData->LaboDone) {
		$SqlReponse1 = SendSqlQuerry("UPDATE Commande SET Status='LaboDone' WHERE IdCommande = '$IdCommande'");
		if ($SqlReponse1->IsValid){
			$Reponse->Set(true, "ValideSaveLaboResult", "Valide SaveLaboResult and Status set to LaboDone");
		} else {
			$Reponse->Set(false, "ErrorSaveLaboResult", $SqlReponse1->Message);
		}
	}
	// Si premiere fois que l'on sauvegarde alors on enregistre la date
	$SqlReponse2 = SendSqlQuerry("SELECT LaboInitDate FROM Commande where IdCommande like '%$IdCommande%'");
	if ($SqlReponse2->IsValid) {
		$SqlResult = $SqlReponse2->Data;
		if ($SqlResult->num_rows == 1){
			while($row = $SqlResult->fetch_assoc()){
				if (is_null($row["LaboInitDate"])) {
					$SqlReponse3 = SendSqlQuerry("UPDATE Commande SET LaboInitDate='$MyData->DateTime' WHERE IdCommande = '$IdCommande'");
				}
			}
		}
	}

	return $Reponse;
}

/*
* Definition des fonction
*/
// Recuperer toutes les valeur pour la vue controleur
function GetAllDataForControllerVue()
{
	$Reponse = new Process(FALSE, "NoMsgId", "Fonction Init GetControllerData");
	$Data = new stdClass;
	$Data->ToSend = null;
	$Data->ToClose = null;

	$SqlReponse = SendSqlQuerry("SELECT * from Commande WHERE Status = 'PaypalValDone'");
	if ($SqlReponse->IsValid) {
		$SqlResult = $SqlReponse->Data;
		if ($SqlResult->num_rows > 0){
			$AllToSend = array();
			while($row = $SqlResult->fetch_assoc()){
				$ToSend = new stdClass;
				$ToSend->IdCommande = $row["IdCommande"];
				$ToSend->Panier = ConvertPanierToString($row["Panier"]);
				$ToSend->Nom = $row["Nom"] . " " . $row["Prenom"];
				$ToSend->Email = $row["Email"];
				$ToSend->Adresse1 = $row["Rue"];
				$ToSend->Adresse2 = $row["Zip"] . " " . $row["Ville"];
				$ToSend->Adresse3 = $row["Pays"];

				array_push($AllToSend,$ToSend);
			}
			$Data->ToSend = $AllToSend;
		}

		$SqlReponse1 = SendSqlQuerry("SELECT * from Commande WHERE Status = 'LaboDone'");
		if ($SqlReponse1->IsValid) {
			$SqlResult = $SqlReponse1->Data;
			if ($SqlResult->num_rows > 0){
				$AllToClose = array();
				while($row = $SqlResult->fetch_assoc()){
					$ToClose = new stdClass;
					$ToClose->IdCommande = $row["IdCommande"];
					$ToClose->Panier = ConvertPanierToString($row["Panier"]);
					$ToClose->Nom = $row["Nom"] . " " . $row["Prenom"];
					$ToClose->Email = $row["Email"];

					array_push($AllToClose,$ToClose);
				}
				$Data->ToClose = $AllToClose;
			}
			$Reponse->Set(true, "ValideGetData", $Data);
		} else {
			$Reponse->Set(false, "ErrorGetAllDataForControllerVue", $SqlReponse1->Message);
		}
	} else {
		$Reponse->Set(false, "ErrorGetAllDataForControllerVue", $SqlReponse->Message);
	}
	return $Reponse;
}

// Recuperer toutes les valeur pour la vue Labo
function GetAllDataForLaboVue()
{
	$Reponse = new Process(FALSE, "NoMsgId", "Fonction Init GetAllDataForLaboVue");
	$AllLaboData = array();
	$SqlReponse = SendSqlQuerry("SELECT * from Commande WHERE Status = 'Waiting'");
	if ($SqlReponse->IsValid) {
		$SqlResult = $SqlReponse->Data;
		if ($SqlResult->num_rows > 0){
			while($row = $SqlResult->fetch_assoc()){
				$ToLabo = SearchLaboResultData($row);
				array_push($AllLaboData,$ToLabo);
			}
			$Reponse->Set(true, "ValideGetAllDataForLaboVue", $AllLaboData);
		} else {
			$Reponse->Set(true, "ValideGetAllDataForLaboVue", null);
		}
		
	} else {
		$Reponse->Set(false, "ErrorGetAllDataForLaboVue", $SqlReponse->Message);
	}
	return $Reponse;
}

// Chercher les commande via une valeur
function SearchOrderByValue($MyData, $SearchReponse, $SearchCol, $SearchType)
{
	$Reponse = new Process(FALSE, "NoMsgId", "Fonction SearchOrderByValue");
	$SqlReponse = SendSqlQuerry("SELECT * FROM Commande where $SearchCol like '%$MyData%'");
	if ($SqlReponse->IsValid) {
		$SqlResult = $SqlReponse->Data;
		if ($SqlResult->num_rows > 0){
			while($row = $SqlResult->fetch_assoc()){
				$Search = new stdClass;
				$Search->SearchType = $SearchType;
				$Search->SearchValue = $row[$SearchCol];
				$Search->SearchId = $row["IdCommande"];
				$Search->SearchData = SearchResultData($row);
				array_push($SearchReponse,$Search);
			}
		}
		$Reponse->Set(true, "ValideSearchOrderIdCommande", $SearchReponse);
	} else {
		$Reponse->Set(false, "ErrorSearchOrderIdCommande", $SqlReponse->Message);
	}
	return $Reponse;
}

// Set SearchResultData
function SearchResultData($Row)
{
	$SearchData = new stdClass;
	$SearchData->IdCommande = $Row["IdCommande"];
	$SearchData->IdPaypal = $Row["IdPaypal"];
	$SearchData->Status = $Row["Status"];
	$SearchData->Panier = ConvertPanierToString($Row["Panier"]);
	$SearchData->Nom = $Row["Nom"];
	$SearchData->Prenom = $Row["Prenom"];
	$SearchData->Email = $Row["Email"];
	$SearchData->Rue = $Row["Rue"];
	$SearchData->ZipVille = $Row["Zip"] . " " . $Row["Ville"];
	$SearchData->Pays = $Row["Pays"];
	$SearchData->Superficie = $Row["Superficie"];
	$SearchData->CulturePrecedente = CulturePrecedenteToString($Row["CulturePrecedente"]);
	$SearchData->CultureProjetee = CultureProjeteeToString($Row["CultureProjetee"]);
	$SearchData->ApportOrganique = YesNoToString($Row["ApportOrganique"]);
	$SearchData->ApportEngrais = YesNoToString($Row["ApportEngrais"]);
	$SearchData->TypeConseils = TypeConseilsToString($Row["TypeConseils"]);
	$SearchData->Remaque = $Row["Remaque"];
	$SearchData->QuestDate = $Row["QuestDate"];
	if ($Row["Resultat"] == null) {
		$SearchData->Resultat = BuidlResultTemplate();
	} else {
		$SearchData->Resultat = $Row["Resultat"];
	}
	return $SearchData;
}

// Set SearchLaboResultData
function SearchLaboResultData($Row)
{
	$SearchData = new stdClass;
	$SearchData->IdCommande = $Row["IdCommande"];
	$SearchData->Panier = ConvertPanierToString($Row["Panier"]);
	$SearchData->Rue = $Row["Rue"];
	$SearchData->ZipVille = $Row["Zip"] . " " . $Row["Ville"];
	$SearchData->Pays = $Row["Pays"];
	$SearchData->Superficie = $Row["Superficie"];
	$SearchData->CulturePrecedente = CulturePrecedenteToString($Row["CulturePrecedente"]);
	$SearchData->CultureProjetee = CultureProjeteeToString($Row["CultureProjetee"]);
	$SearchData->ApportOrganique = YesNoToString($Row["ApportOrganique"]);
	$SearchData->ApportEngrais = YesNoToString($Row["ApportEngrais"]);
	$SearchData->TypeConseils = TypeConseilsToString($Row["TypeConseils"]);
	$SearchData->Remaque = $Row["Remaque"];
	if (($Row["Resultat"] == null) ||($Row["Resultat"] == "")) {
		$SearchData->Resultat = BuidlResultTemplate();
	} else {
		$SearchData->Resultat = $Row["Resultat"];
	}
	return $SearchData;
}

// Convertir un panier de Json en String
function ConvertPanierToString($PanierJson)
{
	$PanierInString = '';
	$Panier = json_decode($PanierJson);
	foreach($Panier as $item) {
	    $Id = $item->Id;
	    $Quantite = $item->Quantite;
	    $PanierInString .= $Id . ' (' . $Quantite . ')';
	}

	return $PanierInString;
}

// CulturePrecedente to string
function CulturePrecedenteToString($Value)
{
	$reponse ='';
	switch ($Value) {
		case "1":
			$reponse = "Pelouse";
			break;
		case "2":
			$reponse = "Parterre de fleurs";
			break;
		case "3":
			$reponse = "Prairie";
			break;
		case "4":
			$reponse = "Champs";
			break;
		case "5":
			$reponse = "Potager";
			break;
		default:
			$reponse = "Votre choix...";
	}
	return $reponse;
}

// CultureProjetee to string
function CultureProjeteeToString($Value)
{
	$reponse ='';
	switch ($Value) {
		case "1":
			$reponse = "Pelouse";
			break;
		case "2":
			$reponse = "Parterre de fleurs";
			break;
		case "3":
			$reponse = "Potager";
			break;
		default:
			$reponse = "Votre choix...";
	}
	return $reponse;
}

// YesNo to string
function YesNoToString($Value)
{
	$reponse ='';
	switch ($Value) {
		case "1":
			$reponse = "Oui";
			break;
		case "2":
			$reponse = "Non";
			break;
		default:
			$reponse = "Votre choix...";
	}
	return $reponse;
}

// TypeConseils to string
function TypeConseilsToString($Value)
{
	$reponse ='';
	switch ($Value) {
		case "1":
			$reponse = "Conventionnel";
			break;
		case "2":
			$reponse = "Bio";
			break;
		default:
			$reponse = "Votre choix...";
	}
	return $reponse;
}

// Creation de la strucutre de résultat
function BuidlResultTemplate()
{
	$Result = new stdClass;
	$Result->Version = "1";
	$Result->ElementsAnalyse = BuildElementAnalyseArray();
	$Result->AvisFumure = BuildAvisFumureArray();
	$Result->AvisTexte = " ";

	return json_encode($Result);
}

// Creation de la strucutre des Elements analysés du résultat
function BuildElementAnalyseArray()
{
	$ArryElementAnalyse = array();
	array_push($ArryElementAnalyse,BuildElementAnalyseTemplate("pH_KCI", "Unité"));
	array_push($ArryElementAnalyse,BuildElementAnalyseTemplate("Carbone", "%C"));
	array_push($ArryElementAnalyse,BuildElementAnalyseTemplate("Humus", "%"));
	array_push($ArryElementAnalyse,BuildElementAnalyseTemplate("Azote org.", "‰N"));
	array_push($ArryElementAnalyse,BuildElementAnalyseTemplate("Phosphore", "mg/100g"));
	array_push($ArryElementAnalyse,BuildElementAnalyseTemplate("Potassium", "mg/100g"));
	array_push($ArryElementAnalyse,BuildElementAnalyseTemplate("Magnésium", "mg/100g"));
	array_push($ArryElementAnalyse,BuildElementAnalyseTemplate("Calcium", "mg/100g"));
	array_push($ArryElementAnalyse,BuildElementAnalyseTemplate("Sodium", "mg/100g"));

	return $ArryElementAnalyse;
}

// Creation d'un element resultat de l'analyse
function BuildElementAnalyseTemplate($Nom, $Unite)
{
	$Element = new stdClass;
	$Element->Nom = $Nom;
	$Element->Unite = $Unite;
	$Element->Teneur = "0";
	$Element->Appreciation = "0"; // 0=undef, 1=TrésFaible, 2=Faible, 3=Normal, 4=Elevé, 5=Très elevé
	$Element->Reference = "0";

	return $Element;
}

// Creation de la strucutre des Element de fumure du resultat
function BuildAvisFumureArray()
{
	$ArryAvisFumure = array();
	array_push($ArryAvisFumure,BuildAvisFumureTemplate("Azote (N)"));
	array_push($ArryAvisFumure,BuildAvisFumureTemplate("Phosphore (P2O5)"));
	array_push($ArryAvisFumure,BuildAvisFumureTemplate("Potasse (K2O)"));
	array_push($ArryAvisFumure,BuildAvisFumureTemplate("Magnésium (MgO)"));
	array_push($ArryAvisFumure,BuildAvisFumureTemplate("Soufre (SO3)"));

	return $ArryAvisFumure;
}

// Creation d'un element de fumure
function BuildAvisFumureTemplate($Nom)
{
	$Element = new stdClass;
	$Element->Nom = $Nom;
	$Element->Quantité = "0";

	return $Element;
}

// Generation du fichier PDF de resultat
function GeneratePdfResultat($OrderId)
{
	// recuperer toutes les data pour cet order
	$SqlReponse = SendSqlQuerry("SELECT * FROM Commande where IdCommande like '%$OrderId%'");
	$SqlResult = $SqlReponse->Data;
	while($row = $SqlResult->fetch_assoc()){
		$DataOrder= SearchResultData($row);
	}

	
	$GenerationDone = false;
	$FileName ="../../Protected/Backend/TempFiles/TempRapport.pdf";
	
	// Si un fichier existe on le detruit
	if (file_exists($FileName)) {
	    unlink($FileName);
	}
	require_once( '../../Protected/Backend/mpdf60/mpdf.php'); // Include mdpf
	require_once( '../../Protected/Backend/BuildRapport.php'); 
    $mpdf = new mPDF('utf-8', 'A4-P');
    $mpdf->setAutoTopMargin = 'stretch';
    $mpdf->setAutoBottomMargin = 'stretch';
    $mpdf->WriteHTML(GeneratePage0($DataOrder)); 
    $mpdf->AddPage();
	$mpdf->WriteHTML(GeneratePage1($DataOrder));
	$mpdf->AddPage();
	$mpdf->WriteHTML(GeneratePage2($DataOrder));
    $mpdf->Output($FileName,'F'); 
    if (file_exists($FileName)) {
	    $GenerationDone = true;
	}
	return $GenerationDone;
}

?>