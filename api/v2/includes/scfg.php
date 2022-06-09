<?php 
//mysql://b6e038dc526164:9ee0c2b4@us-cdbr-east-03.cleardb.com/heroku_4508b8af49308d8?reconnect=true
$h_s='apirestsys.herokuapp.com';
if($_SERVER['HTTP_HOST']==$h_s || $_SERVER['HTTP_HOST']=='www.'.$h_s){
    // Localhost Production
    $db_host = "us-cdbr-east-03.cleardb.com";
    // Database Name      
    $db_base = "heroku_4508b8af49308d8"; 
    // Database Username     
    $db_user = "b6e038dc526164";
    // Database Password       
    $db_pass = "9ee0c2b4";
}else{
    // Localhost Development
    $db_host = "localhost";
    $db_base = "apirest";
    $db_user = "root"; 
    $db_pass = "";     	        
}
// Settings
$config = [
    "driver" => "mysql",
    "host" => $db_host,
    "database" => $db_base,
    "username" => $db_user,
    "password" => $db_pass,
    "port" => "3306",
    "charset" => "utf8mb4"
];
// Prefix for the database tables.
$DBprefix = "";
//Api Type ['public','rest','restfull']
$apiType = ['public','rest','restfull'];
$sel_apiType = $apiType[0];
//Session Token ['sesion','localStorage']
$sesionToken = ['sesion','localStorage'];
$sel_sesionToken = $sesionToken[0];
// Project root path		
$path_root = ($_SERVER['HTTP_HOST']=='localhost')?'MisSitios/apirest/':'';
// Database name and path for sqlite
$rut = (basename($_SERVER['PHP_SELF'])=='index.php')?'../':'../../';
$dbSQLite=$rut.'db/'.$config['database'].'.db';

/*DEFINITION OF VARIABLES FOR PHP7*/
define('DB_DRIVER',$config['driver']);
define('DB_HOST',$config['host']);
define('DB_USER',$config['username']);
define('DB_PASSWORD',$config['password']);
define('DB_DB',$config['database']);
define('DB_PORT',$config['port']);
define('DB_CHARSET',$config['charset']);
?>