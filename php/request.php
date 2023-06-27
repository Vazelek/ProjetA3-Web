<?php
        require_once('database.php');

        // Enable all warnings and errors.
        ini_set('display_errors', 1);
        error_reporting(E_ALL);
        
        // Database connection.
        $db = dbConnect();

        $request = substr($_SERVER['PATH_INFO'], 1);
        $requestMethod = $_SERVER['REQUEST_METHOD'];
        $request = explode('/', $request);
		$requestRessource = array_shift($request);

        $data = false;

        if($requestRessource == "request"){
            $id = array_shift($request);
            if($id == ""){
                $id = NULL;
            }
            if($requestMethod == "GET" && $id == NULL){
                if(isset($_GET["age_min"]) && isset($_GET["age_max"]) && isset($_GET["annee"]) && isset($_GET["mois"]) && isset($_GET["jour"]) && isset($_GET["lat_min"]) && isset($_GET["lat_max"]) && isset($_GET["long_min"]) && isset($_GET["long_max"]) && isset($_GET["code_insee"]) && isset($_GET["id_lum"]) && isset($_GET["id_athmo"]) && isset($_GET["id_etat_surf"]) && isset($_GET["id_dispo_secu"]) && isset($_GET["id_grav"]) && isset($_GET["order_by"]) && isset($_GET["limit"]) && isset($_GET["offset"]) && isset($_GET["asc"])){
                    $age_min = NULL;
                    $age_max = NULL;
                    $annee = NULL;
                    $mois = NULL;
                    $jour = NULL;
                    $lat_min = NULL;
                    $lat_max = NULL;
                    $long_min = NULL;
                    $long_max = NULL;
                    $code_insee = NULL;
                    $id_lum = NULL;
                    $id_athmo = NULL;
                    $id_etat_surf = NULL;
                    $id_dispo_secu = NULL;
                    $id_grav = NULL;
                    $order_by = "id";
                    $limit = NULL;
                    $asc = true;
                    $offset = NULL;

                    if(!empty($_GET["age_min"])){
                        $age_min = $_GET["age_min"];
                    }
                    if(!empty($_GET["age_max"])){
                        $age_max = $_GET["age_max"];
                    }
                    if(!empty($_GET["annee"])){
                        $annee = $_GET["annee"];
                    }
                    if(!empty($_GET["mois"])){
                        $mois = $_GET["mois"];
                    }
                    if(!empty($_GET["jour"])){
                        $jour = $_GET["jour"];
                    }
                    if(!empty($_GET["lat_min"])){
                        $lat_min = $_GET["lat_min"];
                    }
                    if(!empty($_GET["lat_max"])){
                        $lat_max = $_GET["lat_max"];
                    }
                    if(!empty($_GET["long_min"])){
                        $long_min = $_GET["long_min"];
                    }
                    if(!empty($_GET["long_max"])){
                        $long_max = $_GET["long_max"];
                    }
                    if(!empty($_GET["code_insee"])){
                        $code_insee = $_GET["code_insee"];
                    }
                    if(!empty($_GET["id_lum"])){
                        $id_lum = $_GET["id_lum"];
                    }
                    if(!empty($_GET["id_athmo"])){
                        $id_athmo = $_GET["id_athmo"];
                    }
                    if(!empty($_GET["id_etat_surf"])){
                        $id_etat_surf = $_GET["id_etat_surf"];
                    }
                    if(!empty($_GET["id_dispo_secu"])){
                        $id_dispo_secu = $_GET["id_dispo_secu"];
                    }
                    if(!empty($_GET["id_grav"])){
                        $id_grav = $_GET["id_grav"];
                    }
                    if(!empty($_GET["order_by"])){
                        $order_by = $_GET["order_by"];
                    }
                    if(!empty($_GET["limit"])){
                        $limit = $_GET["limit"];
                    }
                    if(!empty($_GET["offset"])){
                        $offset = $_GET["offset"];
                    }
                    if(!empty($_GET["asc"])){
                        if($_GET["asc"] == "desc"){
                            $asc = false;
                        }
                    }

                    $data = getDataWithConstraint($db, $age_min = $age_min, $age_max = $age_max, $annee = $annee, $mois = $mois, $jour = $jour, $lat_min = $lat_min, $lat_max = $lat_max, $long_min = $long_min, $long_max = $long_max, $code_insee = $code_insee, $id_lum = $id_lum, $id_athmo = $id_athmo, $id_etat_surf = $id_etat_surf, $id_dispo_secu = $id_dispo_secu, $id_grav = $id_grav, $order_by = $order_by, $asc = $asc, $limit = $limit, $offset = $offset);
                }
                // elseif(isset($_GET["medid"]) && isset($_GET["all"]) && isset($_GET["begin"])){
                //     $data = getNextRDV($db, $_GET["medid"], $_GET["all"], $_GET["begin"]);
                // }
                // elseif(isset($_GET["medid"]) && isset($_GET["all"])){
                //     $data = getNextRDV($db, $_GET["medid"], $_GET["all"]);
                // }
                // elseif(isset($_GET["medid"])){
                //     $data = getNextRDV($db, $_GET["medid"], false);
                // }
                // elseif(isset($_GET["userid"])){
                //     $data = getUserRDV($db, $_GET["userid"]);
                // }
                
            }
            // elseif($requestMethod == "PUT" && $id != NULL){
            //     parse_str(file_get_contents("php://input"), $_PUT);
            //     if(isset($_PUT["disponibilite"]) && isset($_PUT["userid"])){
            //         if($_PUT["disponibilite"] == 0){
            //             $data = setRDVnotAvailable($db, $id, $_PUT["userid"]);
            //         }
            //     }
            //     elseif(isset($_PUT["disponibilite"])){
            //         if($_PUT["disponibilite"] == 1){
            //             $data = setRDVAvailable($db, $id);
            //         }
            //     }
            // }
        }
        elseif ($requestRessource == 'condition_athmo'){
                if($requestMethod == "GET"){
                    $data = dbGetAthmosphere($db);
                }
        }
        elseif ($requestRessource == 'luminosite'){
            if($requestMethod == "GET"){
                $data = dbGetLuminosite($db);
            }
        }
        elseif ($requestRessource == 'etat_route'){
            if($requestMethod == "GET"){
                $data = dbGetEtatRoute($db);
            }
        }
        elseif ($requestRessource == 'securite'){
            if($requestMethod == "GET"){
                $data = dbGetSecurite($db);
            }
        }
        elseif($requestMethod == 'POST'){
            if($requestRessource == 'add_accident'){
                if(isset($_POST['age']) && isset($_POST['date']) && isset($_POST['heure']) && isset($_POST['ville']) && isset($_POST['lat']) && isset($_POST['long']) && isset($_POST['athmo']) && isset($_POST['lum']) && isset($_POST['etat_surf']) && isset($_POST['secu'])){
                    $age = NULL;
                    $date = NULL;
                    $heure = NULL;
                    $ville = NULL;
                    $lat = NULL;
                    $long = NULL;
                    $athmo = NULL;
                    $lum = NULL;
                    $etat_surf = NULL;
                    $secu = NULL;
                    
                    if(!empty($_POST["age"])){
                        $age = $_POST["age"];
                    }
                    if(!empty($_POST["date"])){
                        $date = $_POST["date"];
                    }
                    if(!empty($_POST["heure"])){
                        $heure = $_POST["heure"];
                    }
                    if(!empty($_POST["ville"])){
                        $ville = $_POST["ville"];
                    }
                    if(!empty($_POST["lat"])){
                        $lat = $_POST["lat"];
                    }
                    if(!empty($_POST["long"])){
                        $long = $_POST["long"];
                    }
                    if(!empty($_POST["athmo"])){
                        $athmo = $_POST["athmo"];
                    }
                    if(!empty($_POST["lum"])){
                        $lum = $_POST["lum"];
                    }
                    if(!empty($_POST["etat_surf"])){
                        $etat_surf = $_POST["etat_surf"];
                    }
                    if(!empty($_POST["age"])){
                        $age = $_POST["age"];
                    }

                    
                }
            }
        }
        echo json_encode($data);
?>