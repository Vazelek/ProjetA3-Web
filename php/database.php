<?php
    require "constants.php";

    function dbConnect(){
        try
        {
            $db = new PDO('mysql:host='.constant('DB_SERVER').';port='.constant('DB_PORT').';dbname='.constant('DB_NAME').';charset=utf8', constant('DB_USER'), constant('DB_PASSWORD'));
            $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        }
        catch (PDOException $exception)
        {
            error_log('Connection error: '.$exception->getMessage());
            return false;
        }
        return $db;
    }

    function addAccident($db, $age, $date, $heure, $latitude, $longitude, $id_ville, $id_lum, $id_athmo, $id_etat_surf, $id_dispo_secu){
        $request = "INSERT INTO accident (age, date, heure, latitude, longitude, id_ville, id_lum, id_athmo, id_etat_surf, id_dispo_secu) VALUES (\"$age\", \"$date\", \"$heure\", \"$latitude\", \"$longitude\", \"$id_ville\", \"$id_lum\", \"$id_athmo\", \"$id_etat_surf\", \"$id_dispo_secu\")";
        if($db->query($request) === TRUE){
            echo "Error when executing \"addAccident\" db request";
        }
        return $request;
    }

    function getAllData($db){ // Delete WHERE
        $request = "SELECT a.id, a.age, a.date, a.heure, a.latitude, a.longitude, a.id_ville, v.nom_ville, a.id_lum, l.descr_lum, a.id_athmo, c.descr_athmo, a.id_etat_surf, e.descr_etat_surf, a.id_dispo_secu, s.descr_dispo_secu FROM accident a 
            LEFT JOIN ville v ON a.id_ville = v.code_insee
            LEFT JOIN luminosite l ON a.id_lum = l.id
            LEFT JOIN conditions_atmospheriques c ON a.id_athmo = c.id
            LEFT JOIN securite s ON a.id_dispo_secu = s.id
            LEFT JOIN etat_surface e ON a.id_etat_surf = e.id
            WHERE a.id > 73600
            ORDER BY a.id;";

        $statement = $db->query($request);

        return $statement->fetchAll(PDO::FETCH_ASSOC);
    }

    function getDataWithConstraint($db, $age_min = NULL, $age_max = NULL, $annee = NULL, $mois = NULL, $jour = NULL, $lat_min = NULL, $lat_max = NULL, $long_min = NULL, $long_max = NULL, $code_insee = NULL, $id_lum = NULL, $id_athmo = NULL, $id_etat_surf = NULL, $id_dispo_secu = NULL, $id_grav = NULL){
        $request = "SELECT a.id, a.age, a.date, a.heure, a.latitude, a.longitude, a.id_ville, v.nom_ville, a.id_lum, l.descr_lum, a.id_athmo, c.descr_athmo, a.id_etat_surf, e.descr_etat_surf, a.id_dispo_secu, s.descr_dispo_secu FROM accident a 
        LEFT JOIN ville v ON a.id_ville = v.code_insee
        LEFT JOIN luminosite l ON a.id_lum = l.id
        LEFT JOIN conditions_atmospheriques c ON a.id_athmo = c.id
        LEFT JOIN securite s ON a.id_dispo_secu = s.id
        LEFT JOIN etat_surface e ON a.id_etat_surf = e.id";

        $first = true;
        if($age_min != NULL && $age_max != NULL){
            if($first){
                $request = $request." WHERE ";
                $first = false;
            }
            else{
                $request = $request." AND ";
            }
            $request = $request."a.age >= $age_min AND a.age <= $age_max";
        }

        if($annee != NULL){
            if($first){
                $request = $request." WHERE ";
                $first = false;
            }
            else{
                $request = $request." AND ";
            }
            if($mois != NULL){
                if($jour != NULL){
                    $request = $request."a.date = '$annee-$mois-$jour'";
                }
                else{
                    $request = $request."a.date BETWEEN '$annee-$mois-01' AND '$annee-$mois-31"; // A TEST
                }
            }
            else{
                $request = $request."a.date BETWEEN '$annee-01-01' AND '$annee-12-31";
            }
        }

        if($lat_min != NULL && $lat_max != NULL){
            if($first){
                $request = $request." WHERE ";
                $first = false;
            }
            else{
                $request = $request." AND ";
            }
            $request = $request."a.latitude >= $lat_min AND a.latitude <= $lat_max";
        }

        if($long_min != NULL && $long_max != NULL){
            if($first){
                $request = $request." WHERE ";
                $first = false;
            }
            else{
                $request = $request." AND ";
            }
            $request = $request."a.longitude >= $long_min AND a.longitude <= $long_max";
        }

        if($code_insee != NULL){
            if($first){
                $request = $request." WHERE ";
                $first = false;
            }
            else{
                $request = $request." AND ";
            }
            $request = $request."a.id_ville = $code_insee";
        }

        if($id_lum != NULL){
            if($first){
                $request = $request." WHERE ";
                $first = false;
            }
            else{
                $request = $request." AND ";
            }
            $request = $request."a.id_lum = $id_lum";
        }

        if($id_athmo != NULL){
            if($first){
                $request = $request." WHERE ";
                $first = false;
            }
            else{
                $request = $request." AND ";
            }
            $request = $request."a.id_athmo = $id_athmo";
        }
        
        if($id_etat_surf != NULL){
            if($first){
                $request = $request." WHERE ";
                $first = false;
            }
            else{
                $request = $request." AND ";
            }
            $request = $request."a.id_etat_surf = $id_etat_surf";
        }

        if($id_dispo_secu != NULL){
            if($first){
                $request = $request." WHERE ";
                $first = false;
            }
            else{
                $request = $request." AND ";
            }
            $request = $request."a.id_dispo_secu = $id_dispo_secu";
        }

        if($id_grav != NULL){
            if($first){
                $request = $request." WHERE ";
                $first = false;
            }
            else{
                $request = $request." AND ";
            }
            $request = $request."a.id_grav = $id_grav";
        }
        $request = $request.";";

        echo $request;
    }
?>
