const page_len = 20;
var page = 1;
var page_max = 20;
var total_size = 200;

const submitBtn = document.getElementById('submit_btn');
const prevBtn = document.getElementsByClassName('left-arrow');
const nextBtn = document.getElementsByClassName('right-arrow');
// const indexPage = document.getElementById('index_page');
const firstBtn = document.getElementsByClassName('page_min');
const lastBtn = document.getElementsByClassName('page_max');
const pageSelec = document.getElementsByClassName('page_selec');
// const showTableBtn = document.getElementById('show_table');
// const hideTableBtn = document.getElementById('hide_table');


submitBtn.addEventListener('click', () => {
    // Retour à la première page
    page = 1;

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
                ID
            </th>
            <th class="table_header">
                Date
            </th>
            <th class="table_header">
                Heure
            </th>
            <th class="table_header">
                Ville
            </th>
            <th class="table_header">
                Latitude
            </th>
            <th class="table_header">
                Longitude
            </th>
            <th class="table_header">
                Luminosité
            </th>
            <th class="table_header">
                Conditions atmosphériques
            </th>
            <th class="table_header">
                État de la surface
            </th>
            <th class="table_header">
                Dispositifs de sécurité
            </th>
            <th class="table_header" id="th_right">
                Gravité
            </th>
            <th>

            </th>
        </tr>
    </thead>`;

    let tbody = document.createElement("tbody");

    let i = (page - 1) * page_len + 1;

    data.forEach(element => {
        let tr = document.createElement("tr");

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
            <input type="radio">
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
    // document.getElementById("nb_result").innerHTML = data[0]["COUNT(*)"] + " résultat(s) trouvés";
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
    let code_insee = document.getElementById("code_insee").value;
    let id_lum = document.getElementById("id_lum").value;
    let id_athmo = document.getElementById("id_athmo").value;
    let id_etat_surf = document.getElementById("id_etat_surf").value;
    let id_dispo_secu = document.getElementById("id_dispo_secu").value;
    let id_grav = document.getElementById("id_grav").value;
    let order_by = document.getElementById("order_by").value;
    let limit = document.getElementById("limit").value;
    let asc_radios = document.getElementsByName("asc");
    let asc = "";
    for(i = 0; i < asc_radios.length; i++){
        if(asc_radios[i].checked){
            asc = asc_radios[i].value;
        }
    }

    // Retourne et affiche les données correspondantes aux filtres (limitée à 20)
    ajaxRequest('GET', '../php/request.php/request/?age_min=' + age_min + '&age_max=' + age_max + '&annee=' + annee + '&mois=' + mois + '&jour=' + jour + '&lat_min=' + lat_min + '&lat_max=' + lat_max + '&long_min=' + long_min + '&long_max=' + long_max + '&code_insee=' + code_insee + '&id_lum=' + id_lum + '&id_athmo=' + id_athmo + '&id_etat_surf=' + id_etat_surf + '&id_dispo_secu=' + id_dispo_secu + '&id_grav=' + id_grav + '&order_by=' + order_by + '&limit=' + page_len + '&offset=' + (page - 1) * page_len + '&asc=' + asc, displayArray);
    // ajaxRequest('GET', '../php/request.php/request/?age_min=' + age_min + '&age_max=' + age_max + '&annee=' + annee + '&mois=' + mois + '&jour=' + jour + '&lat_min=' + lat_min + '&lat_max=' + lat_max + '&long_min=' + long_min + '&long_max=' + long_max + '&code_insee=' + code_insee + '&id_lum=' + id_lum + '&id_athmo=' + id_athmo + '&id_etat_surf=' + id_etat_surf + '&id_dispo_secu=' + id_dispo_secu + '&id_grav=' + id_grav + '&order_by=' + order_by + '&limit=' + 10000 + '&offset=' + '&asc=' + asc, displayMap);
    
    // Retourne la taille des données totale
    ajaxRequest('GET', '../php/request.php/request/?age_min=' + age_min + '&age_max=' + age_max + '&annee=' + annee + '&mois=' + mois + '&jour=' + jour + '&lat_min=' + lat_min + '&lat_max=' + lat_max + '&long_min=' + long_min + '&long_max=' + long_max + '&code_insee=' + code_insee + '&id_lum=' + id_lum + '&id_athmo=' + id_athmo + '&id_etat_surf=' + id_etat_surf + '&id_dispo_secu=' + id_dispo_secu + '&id_grav=' + id_grav + '&order_by=' + order_by + '&limit=' + '&offset=' + '&asc=' + asc, getDataSize);
}

// Affichage initial (sans filtres)
setFilters();