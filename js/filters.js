const page_len = 20;
var page = 1;
var page_max = 20;
var total_size = 200;
var go_to_href = "#content_map";
var filters_shown = false;
var order_header = null;
var order_direction_top = false;
var order_by = "";
const order_by_array = ["id", "date", "", "age", "ville", "lat", "long", "lum", "atmo", "surf", "secu", "grav"];
var order_by_index = 1;
var first_ask = true;
var reorder = false;

const submitBtn = document.getElementById('submit_btn');
const prevBtn = document.getElementsByClassName('left-arrow');
const nextBtn = document.getElementsByClassName('right-arrow');
// const indexPage = document.getElementById('index_page');
const firstBtn = document.getElementsByClassName('page_min');
const lastBtn = document.getElementsByClassName('page_max');
const pageSelec = document.getElementsByClassName('page_selec');
// const showTableBtn = document.getElementById('show_table');
// const hideTableBtn = document.getElementById('hide_table');
const goToBtn = document.getElementById('go_to_btn');


submitBtn.addEventListener('click', () => {
    // Retour à la première page
    page = 1;
    popup.style.display = "none";
    filters_shown = false;

	setFilters();
});

for(i = 0; i < prevBtn.length; i++){
    prevBtn[i].addEventListener('click', () => {
        if(page > 1){
            page--;
        }
        setFilters();
    });
}

for(i = 0; i < nextBtn.length; i++){
    nextBtn[i].addEventListener('click', () => {
        if(page < page_max){
            page++;
        }
        setFilters();
    });
}

for(i = 0; i < firstBtn.length; i++){
    firstBtn[i].addEventListener('click', () => {
        page = 1;
        setFilters();
    });
}

for(i = 0; i < lastBtn.length; i++){
    lastBtn[i].addEventListener('click', () => {
        page = page_max;
        setFilters();
    });
}

goToBtn.addEventListener('click', () => {
    // Retour à la première page
    window.location.href = go_to_href;
    if(go_to_href == "#content_map"){
        document.getElementById("go_to_btn").src = "../img/table.png";
        go_to_href = "#header";
    }
    else{
        go_to_href = "#content_map";
        document.getElementById("go_to_btn").src = "../img/france.png";
    }
});

// showTableBtn.addEventListener('click', () => {
// 	document.getElementById("big_table").style["display"] = "block";
// });

// hideTableBtn.addEventListener('click', () => {
// 	document.getElementById("big_table").style["display"] = "none";
// });

// Détecte quand on presse la touche entrée sur l'input des pages
selec1 = document.getElementById("page_selec_1");
selec1.addEventListener('keydown', function(event) {
    if (event.keyCode === 13) {
        if(parseInt(selec1.value) < 1){
            page = 1;
            setFilters();
        }
        else if(parseInt(selec1.value) > page_max){
            page = page_max;
            setFilters();
        }
        else{
            page = parseInt(selec1.value);
            setFilters();
        }
    }
});

selec2 = document.getElementById("page_selec_2");
selec2.addEventListener('keydown', function(event) {
    if (event.keyCode === 13) {
        if(parseInt(selec2.value) < 1){
            page = 1;
            setFilters();
        }
        else if(parseInt(selec2.value) > page_max){
            page = page_max;
            setFilters();
        }
        else{
            page = parseInt(selec2.value);
            setFilters();
        }
    }
});

function displayArray(data){
    let table = document.getElementById("data-array");
    table.innerHTML = `<thead>
        <tr>
            <th>
                
            </th>
            <th class="table_header" id="th_left">
                <div class="container th_container">
                    ID
                </div>
            </th>
            <th class="table_header">
                <div class="container th_container">
                    Date
                </div>
            </th>
            <th class="table_header">
                <div class="container th_container">
                    Heure
                </div>
            </th>
            <th class="table_header">
                <div class="container th_container">
                    Âge
                </div>
            </th>
            <th class="table_header">
                <div class="container th_container">
                    Ville
                </div>
            </th>
            <th class="table_header">
                <div class="container th_container">
                    Latitude
                </div>
            </th>
            <th class="table_header">
                <div class="container th_container">
                    Longitude
                </div>
            </th>
            <th class="table_header">
                <div class="container th_container">
                    Luminosité
                </div>
            </th>
            <th class="table_header">
                <div class="container th_container">
                    Conditions atmosphériques
                </div>
            </th>
            <th class="table_header">
                <div class="container th_container">
                    État de la surface
                </div>
            </th>
            <th class="table_header">
                <div class="container th_container">
                    Dispositifs de sécurité
                </div>
            </th>
            <th class="table_header" id="th_right">
                <div class="container th_container">
                    Gravité
                </div>
            </th>
            <th>

            </th>
        </tr>
    </thead>`;

    let tbody = document.createElement("tbody");

    let i = (page - 1) * page_len + 1;

    data.forEach(element => {
        let tr = document.createElement("tr");
        tr.setAttribute("class", "table_row");

        let grav = element["descr_grav"];
        if(grav == null){
            grav = "X"
        }

        fl = "";
        if(i == (page - 1) * page_len + 1){
            fl = " row_selec_first";
        }
        
        if((i == (page - 1) * page_len + 1 + 19) || (i == total_size)){
            fl += " row_selec_last";
        }

        tr.innerHTML = `<td class="row_num">
            ${i}
        </td>
        <td class="table_content">
            ${element["id"]}
        </td>
        <td class="table_content">
            ${element["date"]}
        </td>
        <td class="table_content">
            ${element["heure"]}
        </td>
        <td class="table_content">
            ${element["age"]}
        </td>
        <td class="table_content">
            ${element["nom_ville"]}
        </td>
        <td class="table_content">
            ${element["latitude"]}
        </td>
        <td class="table_content">
            ${element["longitude"]}
        </td>
        <td class="table_content">
            ${element["descr_lum"]}
        </td>
        <td class="table_content">
            ${element["descr_athmo"]}
        </td>
        <td class="table_content">
            ${element["descr_etat_surf"]}
        </td>
        <td class="table_content">
            ${element["descr_dispo_secu"]}
        </td>
        <td class="table_content">
            ${grav}
        </td>
        <td class="row_selec${fl}">
            <input type="radio" name="acc_selector" data-id="${element["id"]}">
        </td>
        `;

        // for(let key in element){
        //     let td = document.createElement("td");
        //     td.innerHTML = element[key];
        //     tr.appendChild(td);
        // }
        tbody.appendChild(tr);

        i++;
    });

    table.appendChild(tbody);

    // Récupération de la ligne du tableau sur laquelle on a cliqué
    var table_rows = table.getElementsByTagName('tr');

    for (var j = 1; j < table_rows.length; j++) {
        table_rows[j].addEventListener('click', function() {
            var table2 = document.getElementById("data-array");
            var table_rows2 = table.getElementsByTagName('tr');
            // Suppression du background de la précédente ligne sélectionnée
            for (var k = 1; k < table_rows2.length; k++) {
                table_rows2[k].setAttribute("class", "table_row");
            }

            this.setAttribute("class", "table_row row_selected");

            radio_btn = this.getElementsByClassName("row_selec")[0].getElementsByTagName("input")[0];
            radio_btn.checked = true;
            var rowIndex = this.rowIndex;
        });
    }

    var table_headers = table.getElementsByTagName('th');
    if(first_ask){
        order_by = "id";
        order_header = table_headers[1]; // ID comme premier définisseur d'ordre
        order_header.getElementsByClassName("th_container")[0].innerHTML = order_header.getElementsByClassName("th_container")[0].innerHTML + `<span class="material-symbols-outlined order_arrow">
            south
        </span>`;
        first_ask = false;
    }
    else{
        order_header = table_headers[order_by_index];
        if(order_direction_top){
            order_header.getElementsByClassName("th_container")[0].innerHTML = order_header.getElementsByClassName("th_container")[0].innerHTML + `<span class="material-symbols-outlined order_arrow">
                north
            </span>`;
        }
        else{
            order_header.getElementsByClassName("th_container")[0].innerHTML = order_header.getElementsByClassName("th_container")[0].innerHTML + `<span class="material-symbols-outlined order_arrow">
                south
            </span>`;
        }
    }

    for (var j = 1; j < table_headers.length - 1; j++) {
        if(j == 3){
            continue;
        }
        
        table_headers[j].addEventListener('click', function() {
            
            if(order_header == this){
                if(order_direction_top){
                    order_direction_top = false;
                }
                else{
                    order_direction_top = true;
                }
            }
            else{
                // Supprime la flèche de l'ancien header
                order_header.getElementsByClassName("th_container")[0].removeChild(order_header.getElementsByClassName("th_container")[0].getElementsByClassName("order_arrow")[0]);
                
                order_header = this;
                order_direction_top = false;
                // order_header.getElementsByClassName("th_container")[0].innerHTML = order_header.getElementsByClassName("th_container")[0].innerHTML + `<span class="material-symbols-outlined order_arrow">
                //     south
                // </span>`;

                // Récupère l'indice du sélectionné
                var table_headers2 = table.getElementsByTagName('th');
                for(var k = 1; k < table_headers2.length; k++){
                    if(table_headers2[k] == this){
                        order_by_index = k;
                    }
                }
            }

            order_by = order_by_array[order_by_index - 1];
            page = 1;
            setFilters();
        });
    }
}

function getDataSize(data){
    page_max = Math.ceil(parseInt(data[0]["COUNT(*)"]) / page_len);
    total_size = parseInt(data[0]["COUNT(*)"]);
    for(i = 0; i < lastBtn.length; i++){
        lastBtn[i].innerHTML = page_max;
    }
    for(i = 0; i < pageSelec.length; i++){
        pageSelec[i].value = page;
    }
    document.getElementById("nb_result").innerHTML = data[0]["COUNT(*)"] + " résultat(s)";
}

function setFilters(){
    // Récupération des filtres
    let age_min = document.getElementById("age_min").value;
    let age_max = document.getElementById("age_max").value;
    let annee = document.getElementById("annee").value;
    let mois = document.getElementById("mois").value;
    let jour = document.getElementById("jour").value;
    let lat_min = document.getElementById("lat_min").value;
    let lat_max = document.getElementById("lat_max").value;
    let long_min = document.getElementById("long_min").value;
    let long_max = document.getElementById("long_max").value;
    // let code_insee = document.getElementById("code_insee").value;
    let id_lum = document.getElementById("id_lum").value;
    let id_athmo = document.getElementById("id_athmo").value;
    let id_etat_surf = document.getElementById("id_etat_surf").value;
    let id_dispo_secu = document.getElementById("id_dispo_secu").value;
    let id_grav = document.getElementById("id_grav").value;
    // let order_by = document.getElementById("order_by").value;
    // let asc_radios = document.getElementsByName("asc");
    let asc = "asc";
    if(order_direction_top){
        asc = "desc";
    }

    let input_ville = document.getElementById("code_insee")
    resetIfInvalid(input_ville);
    let code_insee = "";
    if(input_ville.value != ""){
        code_insee = input_ville.value.substring(input_ville.value.indexOf("(") + 1, input_ville.value.indexOf(")"));
    }

    // Retourne et affiche les données correspondantes aux filtres (limitée à 20)
    ajaxRequest('GET', '../php/request.php/request/?age_min=' + age_min + '&age_max=' + age_max + '&annee=' + annee + '&mois=' + mois + '&jour=' + jour + '&lat_min=' + lat_min + '&lat_max=' + lat_max + '&long_min=' + long_min + '&long_max=' + long_max + '&code_insee=' + code_insee + '&id_lum=' + id_lum + '&id_athmo=' + id_athmo + '&id_etat_surf=' + id_etat_surf + '&id_dispo_secu=' + id_dispo_secu + '&id_grav=' + id_grav + '&order_by=' + order_by + '&limit=' + page_len + '&offset=' + (page - 1) * page_len + '&asc=' + asc, displayArray);
    ajaxRequest('GET', '../php/request.php/request/?age_min=' + age_min + '&age_max=' + age_max + '&annee=' + annee + '&mois=' + mois + '&jour=' + jour + '&lat_min=' + lat_min + '&lat_max=' + lat_max + '&long_min=' + long_min + '&long_max=' + long_max + '&code_insee=' + code_insee + '&id_lum=' + id_lum + '&id_athmo=' + id_athmo + '&id_etat_surf=' + id_etat_surf + '&id_dispo_secu=' + id_dispo_secu + '&id_grav=' + id_grav + '&order_by=' + order_by + '&limit=' + 10000 + '&offset=' + '&asc=' + asc, displayMap);
    
    // Retourne la taille des données totale
    ajaxRequest('GET', '../php/request.php/request/?age_min=' + age_min + '&age_max=' + age_max + '&annee=' + annee + '&mois=' + mois + '&jour=' + jour + '&lat_min=' + lat_min + '&lat_max=' + lat_max + '&long_min=' + long_min + '&long_max=' + long_max + '&code_insee=' + code_insee + '&id_lum=' + id_lum + '&id_athmo=' + id_athmo + '&id_etat_surf=' + id_etat_surf + '&id_dispo_secu=' + id_dispo_secu + '&id_grav=' + id_grav + '&order_by=' + order_by + '&limit=' + '&offset=' + '&asc=' + asc, getDataSize);
}

// Affichage initial (sans filtres)
setFilters();

function getDocumentHeight() {
    var body = document.body;
    var html = document.documentElement;
  
    return Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    );
  }
  
// Fonction pour détecter le scroll
function detectScrollPercentage() {
    var scrollPosY = window.pageYOffset || document.documentElement.scrollTop;
    var documentHeight = getDocumentHeight();
    var windowHeight = window.innerHeight;
    var scrollPercentage = (scrollPosY / (documentHeight - windowHeight)) * 100;
  
    if (scrollPercentage >= 60) {
        // On est proche de la map, donc on modifie le go to
        go_to_href = "#header";
        document.getElementById("go_to_btn").src = "../img/table.png";
    }
    else{
        go_to_href = "#content_map";
        document.getElementById("go_to_btn").src = "../img/france.png";
    }
}
  
// Détecte le scroll pour modifier le go to en fonction
window.addEventListener("scroll", detectScrollPercentage);


const popup = document.getElementById("filters");
const openFiltersBtn = document.getElementById("set_filters");
const closeBtn = document.getElementById("close-popup");

// When the user clicks the button, open the modal 
openFiltersBtn.onclick = function() {
  popup.style.display = "block";
  filters_shown = true;
}

// When the user clicks on <span> (x), close the modal
closeBtn.onclick = function() {
  popup.style.display = "none";
  filters_shown = false;
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == popup) {
    popup.style.display = "none";
    filters_shown = false;
  }
}

// Détecte la touche entrée si les filtres sont affichés
document.addEventListener('keydown', function(event) {
    if (event.keyCode === 13) {
        if(filters_shown){
            // Retour à la première page
            page = 1;
            popup.style.display = "none";
            filters_shown = false;

            setFilters();
        }
    }
});
    
function displayConditionAthmo(data){
    for (let i = 0; i < data.length; i++){
        $('#id_athmo').append('<option value="'+data[i].id+'">'+data[i].descr_athmo +'</option>');
    } 
}

function displayLuminosite(data){
    for (let i = 0; i < data.length; i++){
        $('#id_lum').append('<option value="'+data[i].id+'">'+data[i].descr_lum  +'</option>');
    } 
}

function displayEtatRoute(data){
    for (let i = 0; i < data.length; i++){
        $('#id_etat_surf').append('<option value="'+data[i].id+'">'+data[i].descr_etat_surf +'</option>');
    } 
}


function displaySecurite(data){
    for (let i = 0; i < data.length; i++){
        $('#id_dispo_secu').append('<option value="'+data[i].id+'">'+data[i].descr_dispo_secu +'</option>');
    } 
}

function displayGravite(data){
    for (let i = 0; i < data.length; i++){
        $('#id_grav').append('<option value="'+data[i].id+'">'+data[i].descr_grav +'</option>');
    } 
}

function displayVilles(data){
    for (let i = 0; i < data.length; i++){
        // document.getElementById("code_insee_l").innerHTML += ('<option value="' + data[i].nom_ville + ' ('+ data[i].code_insee +')">');
        $('#code_insee_l').append('<option value="' + data[i].nom_ville + ' ('+ data[i].code_insee +')"/>');
    } 
}

// Source :
// https://stackoverflow.com/questions/30499199/html5-datalist-to-select-only-predefined-options
// Supprime l'input si il n'est pas dans la liste des options
function resetIfInvalid(el){
    //just for beeing sure that nothing is done if no value selected
    if (el.value == "")
        return;
    var options = el.list.options;
    for (var i = 0; i< options.length; i++) {
        if (el.value == options[i].value)
            //option matches: work is done
            return;
    }
    //no match was found: reset the value
    el.value = "";
 }

ajaxRequest("GET","../php/request.php/condition_athmo/", displayConditionAthmo);
ajaxRequest("GET","../php/request.php/luminosite/", displayLuminosite);
ajaxRequest("GET","../php/request.php/etat_route/", displayEtatRoute);
ajaxRequest("GET","../php/request.php/securite/", displaySecurite);
ajaxRequest("GET","../php/request.php/gravite/", displayGravite);
ajaxRequest("GET","../php/request.php/villes/", displayVilles);