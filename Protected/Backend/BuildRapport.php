<?php 
// Page 0 du resultat d analyse
function GeneratePage0($Data)
{
	$message = '
	<!DOCTYPE html>
    <html>
    <head>
    </head>
    <body style="margin: 15px; font-size:12px;>
		<img src="../../Protected/Backend/IMG/Logo.png" alt="Logo" height="150">
		<div style="text-align: right; margin-top: 250px; font-size:40px; color: rgb(178,214,38);">
			Rapport d\'analyse de terre
		</div>
		<div style="text-align: right; margin-top: 20px; font-size:20px; color: rgb(178,214,38);">
			ID: ' . $Data->IdCommande . '
		</div>
    </body>
	</html>';
	return $message;
}

// Page 1 du resultat d analyse
function GeneratePage1($Data)
{
	$StyleTitre = 'style="margin-top: 4%; margin-bottom: 2%; font-size:16px; color: rgb(178,214,38);"';
	$StyleTableRenseignement1 = 'style="width: 20%; text-align: right; padding-right:1%; color: rgb(122,92,106); font-size:14px;"';
	$StyleTableRenseignement2 = 'style="width: 60%;"';

	$StyleTableAnalyseTh1 = 'style="width: 25%; border: 1px solid black; border-collapse: collapse; background-color: rgb(122,92,106); color: white;"';
	$StyleTableAnalyseTh2 = 'style="width: 15%; border: 1px solid black; border-collapse: collapse; background-color: rgb(122,92,106); color: white;"';
	$StyleTableAnalyseTh3 = 'style="width: 15%; border: 1px solid black; border-collapse: collapse; background-color: rgb(122,92,106); color: white;"';
	$StyleTableAnalyseTh4 = 'style="width: 45%; border: 1px solid black; border-collapse: collapse; background-color: rgb(122,92,106); color: white;"';
	
	$message = '
	<!DOCTYPE html>
    <html>
    <head>
    </head>
    <body style="margin: 10px; font-size:12px;">
    	<img src="../../Protected/Backend/IMG/Logo.png" alt="Logo" height="50" style="margin-bottom: 1%;">
    	<div style="text-align: center; padding:1%; margin-left: auto; margin-right: auto; font-size:30px; color: rgb(122,92,106); border-style: solid; border-color: rgb(122,92,106); border-top-width: 1px; border-bottom-width: 2px;">
    		Bulletin d’analyse chimique de terre
    	</div>

    	<div style="width: 95%; margin-left: auto; margin-right: auto;">
	    	<div '. $StyleTitre. '>
	    		Renseignement concernant l’échantillonnage
	    	</div>
    		<table style=" ">
    			<tr>
				    <td '. $StyleTableRenseignement1. '>Nom :</td>
				    <td '. $StyleTableRenseignement2. ' >' . $Data->Nom . '</td> 
			  	</tr>
			  	<tr>
				    <td '. $StyleTableRenseignement1. '>Prénom :</td>
				    <td '. $StyleTableRenseignement2. '>' . $Data->Prenom . '</td> 
			  	</tr>
			  	<tr>
				    <td '. $StyleTableRenseignement1. '>Adresse parcelle :</td>
				    <td '. $StyleTableRenseignement2. '>' . $Data->Rue . ', '.$Data->ZipVille.', '.$Data->Pays.'</td> 
			  	</tr>
			  	<tr>
				    <td '. $StyleTableRenseignement1. '>Culture précédente :</td>
				    <td '. $StyleTableRenseignement2. '>' . $Data->CulturePrecedente . '</td> 
			  	</tr>
			  	<tr>
				    <td '. $StyleTableRenseignement1. '>Culture projetée :</td>
				    <td '. $StyleTableRenseignement2. '>' . $Data->CultureProjetee . '</td> 
			  	</tr>
    		</table>
    		<div '. $StyleTitre. '>
	    		Tableau de résultats de l\'analyse
	    	</div>
	    	<div style="margin-bottom: 2%;">
	    		Voici le résultat de l\'analyse de la composition chimique de votre échantillon de terre. Pour chaque éléments, la référence correspond à la valeur théorique à atteindre, tandis que la teneur indique la valeur de votre échantillon.
	    	</div>
	    	<table style="width: 80%;margin-left: auto; margin-right: auto; border: 1px solid black; border-collapse: collapse;">
	    		<tr>
			    	<th '. $StyleTableAnalyseTh1. '>Elément</th> 
			    	<th '. $StyleTableAnalyseTh2. '>Teneur</th>
			    	<th '. $StyleTableAnalyseTh3. '>Référence</th>
			    	<th '. $StyleTableAnalyseTh4. '>Appréciation</th> 
			  	</tr>
			  	'. GeneratePage1TableResultat($Data->Resultat) .'
	    	</table>

		</div>
    </body>
	</html>';
	return $message;
}

function GeneratePage1TableResultat($Data)
{
	$Analyse = json_decode($Data);

	$message='';

	foreach ($Analyse->ElementsAnalyse as $value) {
		$message= $message . GeneratePage1TableResultatElement($value);
	}

	return $message;
}

function GeneratePage1TableResultatElement($Data)
{
	$StyleTableAnalyseTdGauche = 'style="border: 1px solid black; border-collapse: collapse; text-align:left;"';
	$StyleTableAnalyseTdCenter = 'style="border: 1px solid black; border-collapse: collapse; text-align:center;"';

	$message = '
		<tr>
		    <td '. $StyleTableAnalyseTdGauche. '>' . $Data->Nom . '</td> 
		    <td '. $StyleTableAnalyseTdCenter. '>' . $Data->Teneur . '</td>
		    <td '. $StyleTableAnalyseTdCenter. '>' . $Data->Reference . '</td> 
		    <td '. $StyleTableAnalyseTdCenter. '>' . GeneratePage1TableGraph($Data->Appreciation) . '</td> 
	  	</tr>
	';
	return $message;
}

function GeneratePage1TableGraph($Appreciation)
{
	$StyleGraph = 'style="font-size:7px; padding:1px; width: 20%;"';

	$message = '
		<table style="width: 90%; border-collapse: collapse;">
		    <tr>
		    	<td bgcolor="#FF0000" '. $StyleGraph. '>Tres Faible</td>
			    <td bgcolor="#FFA500" '. $StyleGraph. '>Faible</td>
			    <td bgcolor="#00FF00" '. $StyleGraph. '>Normal</td>
			    <td bgcolor="#FFA500" '. $StyleGraph. '>Elevé</td>
			    <td bgcolor="#FF0000" '. $StyleGraph. '>Tres Elevé</td>
		    </tr>
		    <tr>
			    <td style="color: rgb(122,92,106);">&#9650</td>
			    <td></td>
			    <td></td>
			    <td></td>
			    <td></td>
		    </tr>
		</table>
	';
	return $message;
}

// Page 2 du résultat d'analyse
function GeneratePage2($Data)
{
	$StyleTitre = 'style="margin-top: 4%; margin-bottom: 2%; font-size:16px; color: rgb(178,214,38);"';
	$StyleTableAnalyseTh1 = 'style="width: 30%; border: 1px solid black; border-collapse: collapse; background-color: rgb(122,92,106); color: white;"';
	$StyleTableAnalyseTh2 = 'style="width: 10%; border: 1px solid black; border-collapse: collapse; background-color: rgb(122,92,106); color: white;"';

	$message = '
	<!DOCTYPE html>
    <html>
    <head>
    </head>
    <body style="margin: 10px; font-size:12px;">
    	<img src="../../Protected/Backend/IMG/Logo.png" alt="Logo" height="50" style="margin-bottom: 1%;">
    	<div style="width: 95%; margin-left: auto; margin-right: auto;">
    		<div '. $StyleTitre. '>
	    		Avis de fumure
	    	</div>
	    	<div style="margin-bottom: 2%;">
	    		Voici la composition des angrais qui permettront d\'améliorer la qualtité de votre sol.
	    	</div>
	    	<table style="width: 80%;margin-left: auto; margin-right: auto; border: 1px solid black; border-collapse: collapse; table-layout: auto;">
	    		<tr>
			    	<th '. $StyleTableAnalyseTh1. '>Type d\'élément</th> 
			    	<th '. $StyleTableAnalyseTh2. '>Quantité (g/100m<sup>2</sup>)</th>
			  	</tr>
			  	'. GeneratePage2TableResultat($Data->Resultat) .'
	    	</table>
	    	<div '. $StyleTitre. '>
	    		Recommandations du laboratoire
	    	</div>
	    	<div style="margin-bottom: 2%;">
	    		'.GeneratePage2RecomLabo($Data->Resultat).'
	    	</div>
	    	<div '. $StyleTitre. '>
	    		Information sur le choix de vos engrais
	    	</div>
	    	<div style="margin-bottom: 2%;">
	    		Les engrais sont caractérisés par leur composition en Azote, Phosphore et Potasse (valeur N/P/K) représentée sous forme de 3 chiffres (pourcentage du mélange).
	    		<br>Les engrais "triples" sont constitués de ces trois éléments. Les engrais "simples" ne sont constitués que d\'un seul de ces trois composants. Les engrais "triples" ou "simples" peuvent facilement se trouver en jardinerie.
	    		<br>Prenons l\'exemple d\'un engrais organique ayant une composition N-P-K de 6-3-12. Cet engrais dit "triple" est donc composé de 6% d\'Azote, de 3% de Phosphore et 12% de Potasse. Dans un sac de 750g de cet engrais, il y a 45g d\'Azote (6% de 750g = 45g), 22,5g de Phosphore(3% de 750g = 22,5g) et 90g de Potasse (12% de 750g = 90g).
	    		<br><br>Pour plus de conseils, n\'hésitez pas à consulter notre site web WWW.Terralyse.com
	    	</div>
    	</div>
    </body>
	</html>';
	return $message;
}

function GeneratePage2TableResultat($Data)
{
	$Analyse = json_decode($Data);

	$message='';

	foreach ($Analyse->AvisFumure as $value) {
		$message= $message . GeneratePage2TableResultatElement($value);
	}

	return $message;
}

function GeneratePage2TableResultatElement($Data)
{
	$StyleTableAnalyseTdGauche = 'style="border: 1px solid black; border-collapse: collapse; text-align:left;"';
	$StyleTableAnalyseTdCentre = 'style="border: 1px solid black; border-collapse: collapse; text-align:center;"';

	$message = '
		<tr>
		    <td '. $StyleTableAnalyseTdGauche. '>' . $Data->Nom . '</td> 
		    <td '. $StyleTableAnalyseTdCentre. '>' . $Data->Quantité . '</td>
	  	</tr>
	';
	return $message;
}

function GeneratePage2RecomLabo($Data)
{
	$Analyse = json_decode($Data);
	$message= urldecode($Analyse->AvisTexte);
	return $message;
}