<!DOCTYPE html>
<html lang="fr">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Test</title>
        <style>
            td {
                padding: 20px;
                border: solid black 1px;
                text-align: center;
            }
        </style>
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

        ?>

        <form action="<?php echo $_SERVER['PHP_SELF'];?>" method="post">
			<h1>Inscription</h1>

			<p>Age min</p>
			<input type="text" name="age_min" >
            <p>Age max</p>
			<input type="text" name="age_max" >
			<p>Année</p>
			<input type="text" name="annee">
			<p>Mois</p>
			<input type="text" name="mois" >
			<p>jour</p>
			<input type="text" name="jour" >
			<p>lat min</p>
			<input type="text" name="lat_min">
			<p>lat max</p>
			<input type="text" name="lat_max">
			<p>luminosite</p>
			<input type="text" name="lum">
            <p>limit</p>
			<input type="text" name="limit">
            <br>

            <label for="order_by">Order by:</label>
            <select name="order_by" id="order_by">
                <option value="id">ID</option>
                <option value="age">Âge</option>
                <option value="date">Date</option>
            </select>
            <br>
            <input type="radio" id="asc" name="asc" value="asc">
            <label for="asc">ASC</label><br>
            <input type="radio" id="desc" name="asc" value="desc">
            <label for="desc">DESC</label><br>

            <p>PS : Le order by sera sous forme de flêche en haut des catégories plutôt</p>

			<button>Envoyer</button>
            <br><br>
        </form>

        <?php
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
            $limit = 100;
            $asc = true;
            if(!empty($_POST["age_min"])){
                $age_min = $_POST["age_min"];
            }
            if(!empty($_POST["age_max"])){
                $age_max = $_POST["age_max"];
            }
            if(!empty($_POST["annee"])){
                $annee = $_POST["annee"];
            }
            if(!empty($_POST["mois"])){
                $mois = $_POST["mois"];
            }
            if(!empty($_POST["jour"])){
                $jour = $_POST["jour"];
            }
            if(!empty($_POST["lat_min"])){
                $lat_min = $_POST["lat_min"];
            }
            if(!empty($_POST["lat_max"])){
                $lat_max = $_POST["lat_max"];
            }
            if(!empty($_POST["long_min"])){
                $long_min = $_POST["long_min"];
            }
            if(!empty($_POST["long_max"])){
                $long_max = $_POST["long_max"];
            }
            if(!empty($_POST["code_insee"])){
                $code_insee = $_POST["code_insee"];
            }
            if(!empty($_POST["id_lum"])){
                $id_lum = $_POST["id_lum"];
            }
            if(!empty($_POST["id_athmo"])){
                $id_athmo = $_POST["id_athmo"];
            }
            if(!empty($_POST["id_etat_surf"])){
                $id_etat_surf = $_POST["id_etat_surf"];
            }
            if(!empty($_POST["id_dispo_secu"])){
                $id_dispo_secu = $_POST["id_dispo_secu"];
            }
            if(!empty($_POST["id_grav"])){
                $id_grav = $_POST["id_grav"];
            }
            if(!empty($_POST["order_by"])){
                $order_by = $_POST["order_by"];
            }
            if(!empty($_POST["limit"])){
                $limit = $_POST["limit"];
            }
            if(!empty($_POST["asc"])){
                if($_POST["asc"] == "desc"){
                    $asc = false;
                }
            }

            $data = getDataWithConstraint($db, $age_min = $age_min, $age_max = $age_max, $annee = $annee, $mois = $mois, $jour = $jour, $lat_min = $lat_min, $lat_max = $lat_max, $long_min = $long_min, $long_max = $long_max, $code_insee = $code_insee, $id_lum = $id_lum, $id_athmo = $id_athmo, $id_etat_surf = $id_etat_surf, $id_dispo_secu = $id_dispo_secu, $id_grav = $id_grav, $order_by = $order_by, $asc = $asc, $limit = $limit);

            echo "<table>\n";

            foreach($data as $val){
                echo " <tr>\n";
                echo "  <td>".$val["id"]."</td>";
                echo "  <td>".$val["age"]."</td>";
                echo "  <td>".$val["date"]."</td>";
                echo "  <td>".$val["heure"]."</td>";
                echo "  <td>".$val["nom_ville"]."</td>";
                echo "  <td>".$val["latitude"]."</td>";
                echo "  <td>".$val["longitude"]."</td>";
                echo "  <td>".$val["descr_lum"]."</td>";
                echo "  <td>".$val["descr_etat_surf"]."</td>";
                echo "  <td>".$val["descr_athmo"]."</td>";
                echo "  <td>".$val["descr_dispo_secu"]."</td>";
                echo " </tr>\n";
            }

            echo "</table>\n";
        ?>
        
    </body>
</html>