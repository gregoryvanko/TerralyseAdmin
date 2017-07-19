<?php
session_start ();

/*
 * variable global contenant le chemin absolu
 */
if (($_SERVER['HTTP_HOST'] == "deb1")or(($_SERVER['HTTP_HOST'] == "www.gregvanko.com"))) {
    $RootPath = $_SERVER['DOCUMENT_ROOT'] . "/TerralyseAdmin/";
} else {
    $RootPath = $_SERVER['DOCUMENT_ROOT'] . "/";
}


require_once  $RootPath . 'SecuredApp/Private/Global.php';
require_once  $RootPath . 'SecuredApp/Private/Mysql.php';

$ProtectedPHPFileIncluded = false;
$Config = json_decode(file_get_contents($RootPath . "SecuredApp/Private/Config.json"), true);
if ((array_key_exists('ProtectedPHPFile', $Config)) and ($Config['ProtectedPHPFile']!= "")) {
    $ProtectedPHPFile = $Config['ProtectedPHPFile'];
    $ProtectedPhpPath = $RootPath . $ProtectedPHPFile;
    if (file_exists($ProtectedPhpPath)) {
        require_once $ProtectedPhpPath;
        $ProtectedPHPFileIncluded = true;
    }
}


$JSonData = filter_input(INPUT_POST, 'Data');
$DataServeur = json_decode($JSonData);
$Token = $DataServeur->token;
$MyFct = $DataServeur->fct;
$MyDataFct = $DataServeur->datafct;
$MyData = json_decode($MyDataFct);

$Reponse = new Process(FALSE, "NoMsgId", "Empty");

if (ValideUser($Token)) {
    switch ($MyFct) {
        case "GetSources":
            $Reponse = GetSources($MyData);
            break;
        default :
            if ($ProtectedPHPFileIncluded) {
                $FctNotFind = true;
                global $ProtectedFctArray;
                foreach ($ProtectedFctArray as $value) {
                    if ($value === $MyFct) {
                        $ProtectedPHPFct = $value;
                        $param = array($MyData);
                        $Reponse = call_user_func_array($ProtectedPHPFct, $param);
                        $FctNotFind = false;
                        break;
                    }
                }
                if ($FctNotFind) {
                    $Reponse->Set(FALSE, "ErrorFctNotFound", "Erreur fonction inexistante: " . $MyFct);
                }
            } else {
                $Reponse->Set(FALSE, "ErrorFctNotFound", "Erreur fonction inexistante: " . $MyFct);
            }
    }
} else {
    if ($Token == "" AND $MyFct == "Login") {
        $Reponse = Login($MyData);
    } else {
        $Reponse->Set(FALSE, "ErrorNotValidUser", "Erreur user non valide");
    }
}

print json_encode($Reponse);