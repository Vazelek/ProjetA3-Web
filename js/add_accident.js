//get liste des conditions athmosphériques, 
ajaxRequest("GET","../php/request.php/condition_athmo/", displayConditionAthmo);
ajaxRequest("GET","../php/request.php/luminosite/", displayLuminosite);
ajaxRequest("GET","../php/request.php/etat_route/", displayEtatRoute);
ajaxRequest("GET","../php/request.php/securite/", displaySecurite);
ajaxRequest("GET","../php/request.php/villes/", displayVilles);
    
function displayConditionAthmo(data){
    for (let i = 0; i < data.length; i++){
        $('#condition_athmo').append('<option value="'+data[i].id+'">'+data[i].descr_athmo +'</option>');
    } 
}

function displayLuminosite(data){
    for (let i = 0; i < data.length; i++){
        $('#luminosite').append('<option value="'+data[i].id+'">'+data[i].descr_lum  +'</option>');
    } 
}

function displayEtatRoute(data){
    for (let i = 0; i < data.length; i++){
        $('#etat_route').append('<option value="'+data[i].id+'">'+data[i].descr_etat_surf +'</option>');
    } 
}


function displaySecurite(data){
    for (let i = 0; i < data.length; i++){
        $('#securite').append('<option value="'+data[i].id+'">'+data[i].descr_dispo_secu +'</option>');
    } 
}

function displayVilles(data){
    for (let i = 0; i < data.length; i++){
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


// Déclenche un événement quand le formulaire est soumis
const form = document.getElementById('form');
form.addEventListener('submit', (event) => {

    let age = document.getElementById("age").value;
    let date = document.getElementById("date").value;
    let heure = document.getElementById("heure").value;
    // let ville = document.getElementById("ville").value;
    let lat = document.getElementById("lat").value;
    let long = document.getElementById("long").value;
    let athmo = document.getElementById("condition_athmo").value;
    let lum = document.getElementById("luminosite").value;
    let etat_surf = document.getElementById("etat_route").value;
    let secu = document.getElementById("securite").value;

    let input_ville = document.getElementById("ville")
    resetIfInvalid(input_ville);
    let ville = "";
    if(input_ville.value != ""){
        ville = input_ville.value.substring(input_ville.value.indexOf("(") + 1, input_ville.value.indexOf(")"));
    }

    console.log(ville);

    lat = Number.parseFloat(lat);
    long = Number.parseFloat(long);

    if(age <=150 && age >= 0 && lat != 'NaN' && lat <= 90 && lat >= -90 && long != 'NaN' && long >= -180 && long <= 180 && ville != ""  && athmo != "" && lum != "" && etat_surf != "" && secu != ""){
        // Envoie les données à la data base
        ajaxRequest('POST', '../php/request.php/add_accident',displayLog, '&age=' + age + '&date=' + date + '&heure=' + heure + '&ville=' + ville + '&lat=' + lat + '&long=' + long + '&athmo=' + athmo + '&lum=' + lum + '&etat_surf=' + etat_surf + '&secu=' + secu);
        document.getElementById("age").value = "";
        document.getElementById("date").value = "";
        document.getElementById("heure").value = "";
        document.getElementById("ville").value = "";
        document.getElementById("lat").value = "";
        document.getElementById("long").value = "";
        document.getElementById("condition_athmo").value = "";
        document.getElementById("luminosite").value = "";
        document.getElementById("etat_route").value = "";
        document.getElementById("securite").value = "";
        document.getElementById("warning").style.display = "none";
    }
    else{
        document.getElementById("warning").style.display = "block";
    }
    
    // Empèche l'envoi du formulaire HTML par le navigateur (c-a-d le comportement par défaut)
    event.preventDefault();
});

function displayLog(){
    console.log("Ajout d'un accident !");
}