<?php 
session_start ();

$filePath = '../../Protected/Backend/TempFiles/';

if( isset($_GET["FileName"])) {
	$filename = $_GET["FileName"] . ".pdf";
} else {
	$filename = 'TempRapport1.pdf';
}


if( isset($_GET["Token"])) {
	$Token = $_GET["Token"];
	if (isset($_SESSION['Token'])) {
        if ($Token == $_SESSION["Token"]) {
			header('Content-type: application/pdf');
			header('Content-Disposition: inline; filename="' . $filename . '"');
			header('Content-Transfer-Encoding: binary');
			header('Accept-Ranges: bytes');
			@readfile($filePath . $filename);
        } else {
        	echo '<div style="text-align: center; margin-top: 10%;">Token pas correcte..</div>';
        }
    } else {
    	echo '<div style="text-align: center; margin-top: 10%;">Veuillez vous connecter...</div>';
    }
} else {
	echo '<div style="text-align: center; margin-top: 10%;">Token pas présent...</div>';
}

?>