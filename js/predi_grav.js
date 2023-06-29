/*------------------------------------------------
*
*       Modal prediction
*
*-------------------------------------------------
*/

const popup_predi = document.getElementById("predictions");
const openPrediBtn = document.getElementById("pred_grav");
const closePrediBtn = document.getElementById("close_popup_predi");

// When the user clicks the button, open the modal 
openPrediBtn.onclick = function() {
    popup_predi.style.display = "block";

    var id_line = getSelectedAccident();
    console.log(id_line);
    ajaxRequest('GET', `../php/pred_grav.php/getScore?id=${id_line}`, updateScores);

    // ajaxRequest('GET',...,updateScores)
}
  
// When the user clicks on <span> (x), close the modal
closePrediBtn.onclick = function() {
    document.getElementById("tabScore").innerHTML = '';

    popup_predi.style.display = "none";
}

function updateScores(data){
    let knn = data[0];
    let svm = data[1];
    let rf = data[2];
    let mlp = data[3];

    if (knn == '1'){
        knn = 'Indemne';
    }
    if (knn == '2'){
        knn = 'Blessé léger';
    }
    if (knn == '3'){
        knn = 'Blessé hospitalisé';
    }
    if (knn == '4'){
        knn = 'Tué';
    }

    if (svm == '1'){
        svm = 'Indemne';
    }
    if (svm == '2'){
        svm = 'Blessé léger';
    }
    if (svm == '3'){
        svm = 'Blessé hospitalisé';
    }
    if (svm == '4'){
        svm = 'Tué';
    }

    if (rf == '1'){
        rf = 'Indemne';
    }
    if (rf == '2'){
        rf = 'Blessé léger';
    }
    if (rf == '3'){
        rf = 'Blessé hospitalisé';
    }
    if (rf == '4'){
        rf = 'Tué';
    }

    if (mlp == '1'){
        mlp = 'Indemne';
    }
    if (mlp == '2'){
        mlp = 'Blessé léger';
    }
    if (mlp == '3'){
        mlp = 'Blessé hospitalisé';
    }
    if (mlp == '4'){
        mlp = 'Tué';
    }

    document.getElementById("tabScore").innerHTML = '<table id="table_predi" cellspacing="0"><thead><tr><th id="th_left_pred">KNN</th><th>SVM</th><th>RF</th><th id="th_right_pred">MLP</th></tr></thead><tbody><tr><td>'+knn+'</td><td>'+svm+'</td><td>'+rf+'</td><td>'+mlp+'</td></tr></tbody></table>';
}

function getSelectedAccident(){
    let radios = document.getElementsByName("acc_selector");
    let selected_id = null;
    for(i = 0; i < radios.length; i++){
        if(radios[i].checked){
            selected_id = radios[i].getAttribute("data-id");
        }
    }

    return selected_id
}
