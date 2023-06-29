<?php
    require "request.php";

    function getScore($db,$idPOST){
        $data = getAllData($db);
        $id = $idPOST-1;

        $latitude = $data[$id]["latitude"];
        $longitude = $data[$id]["longitude"];
        $descre_athmo = $data[$id]["id_athmo"];
        $descr_lum = $data[$id]["id_lum"];
        $descr_etat_surf = $data[$id]["id_etat_surf"];
        $age = $data[$id]["age"];
        $descr_dispo_secu = $data[$id]["id_dispo_secu"];

        $request = "python ../gen_python/pred_grav.py $latitude $longitude $descre_athmo $descr_lum $descr_etat_surf $age  $descr_dispo_secu";

        $request_knn = "python ../gen_python/pred_grav_KNN.py $latitude $longitude $descre_athmo $descr_lum $descr_etat_surf $age  $descr_dispo_secu ../gen_python/resources/export.csv";

        // print_r("Les information de l'accident : <br>");
        // print_r("Latitude : ");
        // print_r($latitude);
        
        // print_r("<br>");

        // print_r("Longitude : ");
        // print_r($longitude);

        // print_r("<br>");

        // print_r("descre_athmo : ");
        // print_r($descre_athmo);

        // print_r("<br>");

        // print_r("descr_lum : ");
        // print_r($descr_lum);

        // print_r("<br>");

        // print_r("descr_etat_surf : ");
        // print_r($descr_etat_surf);

        // print_r("<br>");

        // print_r("age : ");
        // print_r($age);

        // print_r("<br>");

        // print_r("descr_dispo_secu : ");
        // print_r($descr_dispo_secu);

        // print_r("<br>");
        // print_r("<br>");
        
        // affichage de la gravité

        exec($request_knn, $output);
        $score_knn = $output[0];
        // print_r("La gravité avec KNN est de : ");
        // print_r($output[0]);
        // print_r("<br>");

        exec("$request SVM", $output);
        $score_svm = $output[0];
        // print_r("La gravité avec SVM est de : ");
        // // print_r($output[0]);
        // print_r($output[0]);

        // print_r("<br>");

        exec("$request RF", $output);
        $score_rf = $output[0];
        // print_r("La gravité avec RF est de : ");
        // // print_r($output[0]);
        // print_r($output[0]);

        // print_r("<br>");

        exec("$request MLP", $output);
        $score_mlp = $output[0];
        // print_r("La gravité avec MLP est de : ");
        // // print_r($output[0]);
        // print_r($output[0]);

        return [$score_knn,$score_svm,$score_rf,$score_mlp];
    }

    
?>