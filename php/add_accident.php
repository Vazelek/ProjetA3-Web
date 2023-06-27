<!--
\\Author: Prenom NOM
\\Login : etuXXX
\\Groupe: ISEN X GROUPE Y
\\Annee:
-->

<!doctype html>
<html lang="fr">
  <head>
    <!-- Meta tags -->

    <!-- CSS Style -->
    <link href="../css/style.css" rel="stylesheet" />
    <!-- JS -->
    <script src="https://kit.fontawesome.com/fc034126a9.js" crossorigin="anonymous"></script>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="../js/utils.js" defer></script>
    <script src="../js/ajax.js" defer></script>
    <script src="../js/add_accident.js" defer></script>
    <!-- Font -->

    <!-- Title -->

  </head>
  <body>
    <!-- Header -->
    <nav>
      <ul>
        <li>
          <picture>
            <a href="../index.html" class="active">
              <img src="../img/logo.png" alt="logo_isen">
            </a>
          </picture>
        </li>
        <li><a href="../index.html" class="active">Acceuil</a></li>
        <li><a href="php/visualisation.php">Visualisation</a></li>
        <li><a href="php/add_accident.php">Ajouter un accident</a></li>
        <li><a href="#">Se connecter <i class="fa-regular fa-user"></i></a></li>
        <li><button>Créer un compte <i class="fas fa-user-plus"></i></button></li>
      </ul>
    </nav>
    <!-- Home -->
    <!-- <li> -->
    <div class="Vcontainer">
        <div style="color: black; font-size: 160px; font-family: Bebas Neue; font-weight: 400; line-height: 140px;">
            Ajouter un accident
        </div>

        <div class="Hcontainer">
            <div class="Yrect">
            </div>
            <input type="text" id="age" name="age" placeholder="Age du conducteur" required>
        </div>

        <div class="Hcontainer">
            <div class="Yrect">
            </div>
            <input type="date" id="date" name="date" placeholder="Date" required>
            <div class="Yrect">
            </div>
            <input type="text" id="heure" name="heure" placeholder="Heure" required>
        </div>

        <div class="Hcontainer">
            <div class="Yrect">
            </div>
            <input type="text" id="ville" name="ville" placeholder="Ville" required>
        </div>

        <div class="Hcontainer">
            <div class="Yrect">
            </div>
            <input type="text" id="latitude" name="latitude" placeholder="Latitude" required>
            <div class="Yrect">
            </div>
            <input type="text" id="longitude" name="longitude" placeholder="Longitude" required>
        </div>

        <div class="Hcontainer">
            <div class="Yrect">
            </div>
            <select name="condition_athmo" id="condition_athmo" required>
                <option value="">--Choisir une condition athmosphérique--</option>
            </select>
        </div>

        <div class="Hcontainer">
            <div class="Yrect">
            </div>
            <select name="luminosite" id="luminosite" required>
                <option value="">--Choisir la luminosité de la scène--</option>
            </select>
        </div>

        <div class="Hcontainer">
            <div class="Yrect">
            </div>
            <select name="etat_route" id="etat_route" required>
                <option value="">--Choisir l'état de la route--</option>
            </select>
        </div>

        <div class="Hcontainer">
            <div class="Yrect">
            </div>
            <select name="securite" id="securite" required>
                <option value="">--Choisir l'état d'utilisation de la ceinture de sécurité--</option>
            </select>
        </div>

        <a class="button" href="">
            <i class="fa-solid fa-check">Ajouter un accident</i>
        </a>

    </div>
        <!-- Footer -->
        <footer>
            <hr>
            <p>
            Nous sommes une équipe d’étudiants en troisième année à l’ISEN (école d’ingénieur). 
            Notre projet est de réaliser un site web pour visualisation une base de données d’accidents de la route de 2009.
            </p>

            <hr>
            <span>
            <picture>
                <a href="../index.html" class="active">
                <img src="../img/logo.png" alt="logo_isen">
                </a>
            </picture>
            <!-- <div>Logo</div> -->
            <div>© 2023 Projet A3 ISEN Nantes</div>
            <div>
                <p>Valentin<br> Hervé <i class="far fa-envelope" style="color: #ffc40c;"></i></p>
                <p>Maxence<br> Rogerieux<i class="far fa-envelope" style="color: #ffc40c;"></i></p>
                <p>Antoine<br> Esnault<i class="far fa-envelope" style="color: #ffc40c;"></i></p>
                
            </div>
            </span>
        </footer>
    </body>
</html>
