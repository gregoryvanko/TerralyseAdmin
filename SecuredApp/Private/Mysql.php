<?php

function GetServerConfiguration()
{
    $MonHost = $_SERVER['HTTP_HOST'];

    // définition du type de configuration
    if($MonHost=="localhost"){
        $Config = "ConfigLocalhost";
    } elseif ($MonHost=="deb1") {
        $Config = "ConfigDebian";
    } elseif ($MonHost=="www.gregvanko.com") {
        $Config = "ConfigDebian";
    } else {
        $Config= "ConfigOVH";
    }
    
    return $Config;
}

class MySqlConnection{
    var $servername;
    var $username;
    var $password;
    var $dbname;
    
    public function __construct($servername,$username,$password,$dbname){
        $this->servername = $servername;
        $this->username = $username;
        $this->password = $password;
        $this->dbname = $dbname;
    }
    
    public function Setdata($servername,$username,$password,$dbname){
        $this->servername = $servername;
        $this->username = $username;
        $this->password = $password;
        $this->dbname = $dbname;
    }
}

function GetConnection()
{
    $Config = GetServerConfiguration();
    
    $MyMysqlConnection = new MySqlConnection(null,null,null,null);

    global $RootPath;
    $ConfigJson = json_decode(file_get_contents( $RootPath ."SecuredApp/Private/Config.json"), true);
    $SQLConfigJson = $ConfigJson['SQLConfig'];

    foreach ($SQLConfigJson as $value) {
        if ($value['ConfigName'] == $Config){
            $MyMysqlConnection->Setdata($value['Server'], $value['Login'], $value['Password'], $value['DB']);
            break;
        }
    }
    return $MyMysqlConnection;
}

class ProcessSendSqlQuerry{
    var $IsValid;
    var $Message;
    var $Data;
    
    public function __construct($IsValid, $Message,$Data){
        $this->IsValid = $IsValid;
        $this->Message = $Message;
        $this->Data = $Data;
    }
    
    public function Setdata($IsValid, $Message,$Data){
        $this->IsValid = $IsValid;
        $this->Message = $Message;
        $this->Data = $Data;
    }
}

function SendSqlQuerry($MyQuerry){
    $MyProcessSendSqlQuerry = new ProcessSendSqlQuerry(null,null,null);
    
    $MyConn = GetConnection();

    if ($MyConn->servername == null) {
        $MyProcessSendSqlQuerry->Setdata(false, "ConfigNotFound", "ConfigNotFound");
    } else {
        // Create connection
        $conn = new mysqli($MyConn->servername, $MyConn->username, $MyConn->password, $MyConn->dbname);
        // Check connection
        if ($conn->connect_error) {
            $MyProcessSendSqlQuerry->Setdata(FALSE, "Error DB Connection failed: " . $conn->connect_error . " Sur la connection: " . $MyConn, NULL);
        } else {
            $conn->query("SET NAMES UTF8");
            $result = $conn->query($MyQuerry);
            if ($result)
            {
                $MyProcessSendSqlQuerry->Setdata(TRUE, "Process OK", $result);
            } else {
                $MyProcessSendSqlQuerry->Setdata(FALSE, "Error DB: " . $conn->error, NULL);
            }
        }
        $conn->close();
    }
    return $MyProcessSendSqlQuerry;
}

function ParseSqlDataToArray($SqlResult)
{
    $MyDataArray = array();
    if ($SqlResult->num_rows > 0){
        while($row = $SqlResult->fetch_assoc()){
            array_push($MyDataArray,$row); 
        }
    }
    return $MyDataArray;
}