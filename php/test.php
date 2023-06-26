<!DOCTYPE html>
<html lang="fr">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Test</title>
    </head>
    <body>

        <?php
            require_once('database.php');

            // Enable all warnings and errors.
            ini_set('display_errors', 1);
            error_reporting(E_ALL);

            // // Database connection.
            $db = dbConnect();
            
            // addAccident($db, 12, "2023-06-26", "15:37:00", -12, 50, "54395", 2, 3, 1, 7)

            // $data = getAllData($db);
            // foreach($data as $val){
            //     echo "<p>Id de l'accident : ".$val["id"]." / Ville : ".$val["nom_ville"]." / Luminosité : ".$val["descr_lum"];
            // }

            // getDataWithConstraint($db, $age_min = 12, $age_max = 15, $annee= 2009, $mois= 5, $jour= 7, $lat_min= 12, $lat_max= 40, $long_min= 5, $long_max= 10, $code_insee= 15521, $id_lum= 2, $id_athmo= 3, $id_etat_surf= 5, $id_dispo_secu= 4, $id_grav= 1)

            getDataWithConstraint($db, $age_min = NULL, $age_max = NULL, $annee = NULL, $mois = NULL, $jour = NULL, $lat_min = NULL, $lat_max = NULL, $long_min = NULL, $long_max = NULL, $code_insee = NULL, $id_lum = NULL, $id_athmo = NULL, $id_etat_surf = NULL, $id_dispo_secu = NULL, $id_grav = 2);
        ?>
        
    </body>
</html>