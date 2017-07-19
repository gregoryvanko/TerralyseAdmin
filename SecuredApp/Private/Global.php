<?php

/*
 * Objet de process d'une fonction
 */
class Process{
    var $IsValid= false;
    var $MessageID = "Empty message ID";
    var $Message = "Empty message";
    
    function __construct($IsValid,$MessageID, $Message){
        $this->IsValid = $IsValid;
        $this->MessageID = $MessageID;
        $this->Message = $Message;
    }
    
    function Set($IsValid, $MessageID, $Message){
        $this->IsValid = $IsValid;
        $this->MessageID = $MessageID;
        $this->Message = $Message;
    }
}

/*
 * Validation du user
 */
function ValideUser($Token){
    $valide = FALSE;
    if (($Token != "") and (isset($_SESSION['Token'])) ) {
        if ($Token == $_SESSION["Token"]) {
            $valide = TRUE;
        }
    }
    return $valide;
}

/*
 * Liste des fonction externe a l application
 */
$ProtectedFctArray = array();

/*
 * ajouter une fonction externe a l'application
 */
function AddProtectedFunction($FctName){
    global $ProtectedFctArray;
    array_push($ProtectedFctArray, $FctName);
}

/*
 * Validation du login 
 */
function Login($MyData){
    $MyProcess = new Process(FALSE, "NoMsgId", "Empty");
    global $RootPath;
    $Config = json_decode(file_get_contents($RootPath ."SecuredApp/Private/Config.json"), true);
    $UserLogin = $Config['UserLogin'];
    foreach ($UserLogin as $value) {
        if ($value['Login'] == $MyData->login){
            if ($value['Password'] == $MyData->psw){
                $Guid = uniqid();
                $_SESSION["Token"] = $Guid;
                foreach ($Config['Groupe'] as $MyGroupe) {
                    if ($value['Groupe'] == $MyGroupe['Name']) {
                        $_SESSION["GroupeType"] = $MyGroupe['Type'];
                        $_SESSION["GroupeFilesJs"] = $MyGroupe['FilesJs'];
                        $_SESSION["GroupeFilesCss"] = $MyGroupe['FilesCss'];
                        $_SESSION["GroupeFilesImg"] = $MyGroupe['FilesImg'];
                        break;
                    }
                }
                $MyProcess->Set(TRUE, "ValidLogin",$Guid);
            } else {
                $MyProcess->Set(FALSE, "UnValidLogin","Login or password not correct");
            }
            break;
        } else {
            $MyProcess->Set(FALSE, "UnValidLogin","Login or password not correct");
        }
    }
    return $MyProcess;
}

/*
 * Get source
 */
function GetSources($MyData){
    $MyProcess = new Process(FALSE, "NoMsgId", "Empty");

    $GroupeType =null;
    if (isset($_SESSION['GroupeType'])) {
        $GroupeType = $_SESSION["GroupeType"];
    }
    $GroupeFilesJs =null;
    if (isset($_SESSION['GroupeFilesJs'])) {
        $GroupeFilesJs = $_SESSION["GroupeFilesJs"];
    }
    $GroupeFilesCss =null;
    if (isset($_SESSION['GroupeFilesCss'])) {
        $GroupeFilesCss = $_SESSION["GroupeFilesCss"];
    }
    $GroupeFilesImg =null;
    if (isset($_SESSION['GroupeFilesImg'])) {
        $GroupeFilesImg = $_SESSION["GroupeFilesImg"];
    }
    
    global $RootPath;
    $Config = json_decode(file_get_contents($RootPath ."SecuredApp/Private/Config.json"), true);
    $AppFiles = $Config['AppFiles'];
    $Path = "../../";
    $CodeJS = file_get_contents($RootPath ."SecuredApp/Private/App.js");
    $CodeCSS = file_get_contents($RootPath ."SecuredApp/Private/App.css");
    $CodeImg = array();
    $HomeImg = new stdClass;
    $HomeImg->Nom = "HomeImg";
    $HomeImg->Ext = "jpg";
    $HomeImg->Img = base64_encode(file_get_contents($RootPath ."SecuredApp/Private/HomeImg.jpg"));
    array_push($CodeImg, $HomeImg);
    if (is_dir($Path . $AppFiles)) {
        $di = new RecursiveDirectoryIterator($Path . $AppFiles, RecursiveDirectoryIterator::SKIP_DOTS);
        foreach (new RecursiveIteratorIterator($di) as $filename => $file) {
            $path_parts = pathinfo($filename);


            // AdminGroupe Type = All
            if ($GroupeType == "All") {
                if ($path_parts['extension'] === "js") {
                    $CodeJS = $CodeJS . file_get_contents($filename);              
                } elseif ($path_parts['extension'] === "css") {
                    $CodeCSS = $CodeCSS . file_get_contents($filename);
                } elseif (($path_parts['extension'] === "png") or ($path_parts['extension'] === "jpg")) {
                    $MyImg = new stdClass;
                    $MyImg->Nom = $path_parts['filename'];
                    $MyImg->Ext = $path_parts['extension'];
                    $MyImg->Img = base64_encode(file_get_contents($filename));
                    array_push($CodeImg, $MyImg);
                }
            // AdminGroupe Type = Only
            } elseif ($GroupeType == "Only") {
                if ($path_parts['extension'] === "js") {
                    if (in_array($path_parts['filename'], $GroupeFilesJs)){
                        $CodeJS = $CodeJS . file_get_contents($filename);
                    }         
                } elseif ($path_parts['extension'] === "css") {
                    if (in_array($path_parts['filename'], $GroupeFilesCss)){
                        $CodeCSS = $CodeCSS . file_get_contents($filename);
                    } 
                } elseif (($path_parts['extension'] === "png") or ($path_parts['extension'] === "jpg")) {
                    if (in_array($path_parts['filename'], $GroupeFilesImg)){
                        $MyImg = new stdClass;
                        $MyImg->Nom = $path_parts['filename'];
                        $MyImg->Ext = $path_parts['extension'];
                        $MyImg->Img = base64_encode(file_get_contents($filename));
                        array_push($CodeImg, $MyImg);
                    } 
                }
            // AdminGroupe Type = Exept
            } elseif ($GroupeType == "Exept") {
                if ($path_parts['extension'] === "js") {
                    if (!in_array($path_parts['filename'], $GroupeFilesJs)){
                        $CodeJS = $CodeJS . file_get_contents($filename);
                    }         
                } elseif ($path_parts['extension'] === "css") {
                    if (!in_array($path_parts['filename'], $GroupeFilesCss)){
                        $CodeCSS = $CodeCSS . file_get_contents($filename);
                    } 
                } elseif (($path_parts['extension'] === "png") or ($path_parts['extension'] === "jpg")) {
                    if (!in_array($path_parts['filename'], $GroupeFilesImg)){
                        $MyImg = new stdClass;
                        $MyImg->Nom = $path_parts['filename'];
                        $MyImg->Ext = $path_parts['extension'];
                        $MyImg->Img = base64_encode(file_get_contents($filename));
                        array_push($CodeImg, $MyImg);
                    } 
                }
            }
        }
        $Code = array("JS" => $CodeJS, "CSS" => $CodeCSS, "IMG" => $CodeImg);
        $MyProcess->Set(TRUE, "AllSources",json_encode($Code));
    } else {
        $MyProcess->Set(FALSE, "UserDirectoryNotFound","Repertoire des sources non trouve : " . $Path . $AppFiles);
    }
    
    return $MyProcess;
}