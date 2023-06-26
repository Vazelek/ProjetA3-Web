import sys
import json
import pandas as pd
import os.path
import pickle


# Vérification du nombre d'arguments
if len(sys.argv) != 10:
    # Vérification si help est demandé
    if len(sys.argv) == 2:
        if not (sys.argv[1] == "-h" or sys.argv[1] == "--help"):
            print("Erreur : Nombre incorrect d'arguments")
            print("Requis : 9, donnés : " + str(len(sys.argv) - 1))
            print("")
    else:
        print("Erreur : Nombre incorrect d'arguments")
        print("Requis : 9, donnés : " + str(len(sys.argv) - 1))
        print("")

    print("Format de la commande :")
    print("\t>>> python script3_classification.py <latitude> <longitude> <descre_athmo> <descr_lum> <descr_etat_surf> <age> <descr_dispo_secu> <descr_type_col> <methode>")
    print("")
    print("<latitude> :\t\t{float}   [-90, 90]")
    print("<longitude> :\t\t{float}   [-180, 180]")
    print("<descr_athmo> :\t\t{int}     [1, 9]")
    print("<descr_lum> :\t\t{int}     [1, 5]")
    print("<descr_etat_surf> :\t{int}     [1, 9]")
    print("<age> :\t\t\t{int}     [0, +inf]")
    print("<descr_dispo_secu> :\t{int}     [1, 15]")
    print("<descr_type_col> :\t{int}     [1, 7]")
    print("<methode> :\t\t{string}  {\"SVM\", \"RF\", \"MLP\"}")
    print("")
    print("Aide :")
    print("\t>>> python script3_classification.py -h")
    print("\t>>> python script3_classification.py --help")

    # Arrêt de l'exécution du script 
    sys.exit()

# Récupération des entrées du script 
data_csv = {
    'latitude': [float(sys.argv[1])],
    'longitude': [float(sys.argv[2])],
    'descr_athmo': [int(sys.argv[3])],
    'descr_lum': [int(sys.argv[4])],
    'descr_etat_surf': [int(sys.argv[5])],
    'age': [int(sys.argv[6])],
    'descr_dispo_secu': [int(sys.argv[7])],
    'descr_type_col': [int(sys.argv[8])]
}

# Récupération de la méthode de classification : {SVM, RF, MLP}
method = sys.argv[9]

# Vérification des arguments
if data_csv["latitude"][0] < -90 or data_csv["latitude"][0] > 90 or \
        data_csv["longitude"][0] < -180 or data_csv["longitude"][0] > 180 or \
        data_csv["descr_athmo"][0] < 1 or data_csv["descr_athmo"][0] > 9 or \
        data_csv["descr_lum"][0] < 1 or data_csv["descr_lum"][0] > 5 or \
        data_csv["descr_etat_surf"][0] < 1 or data_csv["descr_etat_surf"][0] > 9 or \
        data_csv["age"][0] < 0 or \
        data_csv["descr_dispo_secu"][0] < 1 or data_csv["descr_dispo_secu"][0] > 15 or \
        data_csv["descr_type_col"][0] < 1 or data_csv["descr_type_col"][0] > 7 or \
        (method != "SVM" and method != "RF" and method != "MLP"):

    print("Erreur : Argument(s) invalide(s)")

    # Affichage des arguments posant problème
    if data_csv["latitude"][0] < -90 or data_csv["latitude"][0] > 90:
        print("-> latitude (" + str(data_csv["latitude"][0]) + ")")        
    if data_csv["longitude"][0] < -180 or data_csv["longitude"][0] > 180:
        print("-> longitude (" + str(data_csv["longitude"][0]) + ")")        
    if data_csv["descr_athmo"][0] < 1 or data_csv["descr_athmo"][0] > 9:
        print("-> descr_athmo (" + str(data_csv["descr_athmo"][0]) + ")")        
    if data_csv["descr_lum"][0] < 1 or data_csv["descr_lum"][0] > 5:
        print("-> descr_lum (" + str(data_csv["descr_lum"][0]) + ")")        
    if data_csv["descr_etat_surf"][0] < 1 or data_csv["descr_etat_surf"][0] > 9:
        print("-> descr_etat_surf (" + str(data_csv["descr_etat_surf"][0]) + ")")        
    if data_csv["age"][0] < 0:
        print("-> age (" + str(data_csv["age"][0]) + ")")        
    if data_csv["descr_dispo_secu"][0] < 1 or data_csv["descr_dispo_secu"][0] > 15:
        print("-> descr_dispo_secu (" + str(data_csv["descr_dispo_secu"][0]) + ")")        
    if data_csv["descr_type_col"][0] < 1 or data_csv["descr_type_col"][0] > 7:
        print("-> descr_type_col (" + str(data_csv["descr_type_col"][0]) + ")")        
    if method != "SVM" and method != "RF" and method != "MLP":
        print("-> methode (" + method + ")")    
        
    print("")
    print("Format de la commande :")
    print("\t>>> python script3_classification.py <latitude> <longitude> <descre_athmo> <descr_lum> <descr_etat_surf> <age> <descr_dispo_secu> <descr_type_col> <methode>")
    print("")
    print("<latitude> :\t\t{float}   [-90, 90]")
    print("<longitude> :\t\t{float}   [-180, 180]")
    print("<descr_athmo> :\t\t{int}     [1, 9]")
    print("<descr_lum> :\t\t{int}     [1, 5]")
    print("<descr_etat_surf> :\t{int}     [1, 9]")
    print("<age> :\t\t\t{int}     [0, +inf]")
    print("<descr_dispo_secu> :\t{int}     [1, 15]")
    print("<descr_type_col> :\t{int}     [1, 7]")
    print("<methode> :\t\t{string}  {\"SVM\", \"RF\", \"MLP\"}")
    print("")
    print("Aide :")
    print("\t>>> python script3_classification.py -h")
    print("\t>>> python script3_classification.py --help")

    ## Arrêt de l'exécution du script
    sys.exit()

# Conversion des entrées en dataframe
accident = pd.DataFrame(data = data_csv)

model = None

if method == "SVM":
    if os.path.isfile("variables/svm"):
        file = open("variables/svm", "rb")
        model = pickle.load(file)
        file.close()
    else:
        print("Le fichier variables/svm n'existe pas")
        print("Exécuter SVM_Ameliored pour le générer")
        sys.exit()
elif method == "RF":
    if os.path.isfile("variables/rf"):
        file = open("variables/rf", "rb")
        model = pickle.load(file)
        file.close()
    else:
        print("Le fichier variables/rf n'existe pas")
        print("Exécuter RandomForest_Ameliored pour le générer")
        sys.exit()
else:
    if os.path.isfile("variables/mlp"):
        file = open("variables/mlp", "rb")
        model = pickle.load(file)
        file.close()
    else:
        print("Le fichier variables/mlp n'existe pas")
        print("Exécuter MLP_Ameliored pour le générer")
        sys.exit()

y_pred = model.predict(accident)

# Création d'un dictionnaire pour l'export en JSON
dic = {"gravite" : int(y_pred)}

# Ouverture du fichier json et écriture
with open("json/gravite_class.json", "w") as f:
    json.dump(dic, f)