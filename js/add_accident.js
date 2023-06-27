//get liste des conditions athmosphériques, 
ajaxRequest("GET","request.php/condition_athmo/", displayConditionAthmo);
ajaxRequest("GET","request.php/luminosite/", displayLuminosite);
ajaxRequest("GET","request.php/etat_route/", displayEtatRoute);
ajaxRequest("GET","request.php/securite/", displaySecurite);
    
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


// Déclenche un événement quand le formulaire est soumis
const form = document.getElementById('form');
form.addEventListener('submit', (event) => {

    let age = document.getElementById('age').values
    let date = document.getElementById('date').values
    let heure = document.getElementById('heure').values
    let ville = document.getElementById('ville').values
    let lat = document.getElementById('lat').values
    let long = document.getElementById('long').values
    let athmo = document.getElementById('id_athmo').values
    let lum = document.getElementById('id_lum').values
    let etat_surf = document.getElementById('id_etat_surf').values
    let secu = document.getElementById('id_secu').values

    if(!Number.isInteger(age)){
        console.error("Age mal rentré");
    }
    // Envoie les données à la data base
   ajaxRequest('POST', '../php/request.php/add_accident',NULL, '&age=' + age + '&date=' + data + '&heure=' + heure + '&ville=' + ville + '&lat=' + lat + '&long=' + long + '&athmo=' + athmo + '&lum=' + lum + '&etat_surf=' + etat_surf + '&secu=' + secu);


    // Empèche l'envoi du formulaire HTML par le navigateur (c-a-d le comportement par défaut)
    event.preventDefault();
});