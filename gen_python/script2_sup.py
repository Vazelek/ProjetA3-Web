import sys
import os.path
import json
import pandas as pd
from sklearn.neighbors import KNeighborsClassifier
from sklearn.model_selection import train_test_split

from F1_preparation import *
from F2_reduc_dimension import *
from F3_knn import *

#------------------------------------------------------------------
#------------------------Début du script---------------------------
#------------------------------------------------------------------

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
    print("\t>>> python script2_sup.py <latitude> <longitude> <descre_athmo> <descr_lum> <descr_etat_surf> <age> <descr_dispo_secu> <descr_type_col> <filename>")
    print("")
    print("<latitude> :\t\t{float}   [-90, 90]")
    print("<longitude> :\t\t{float}   [-180, 180]")
    print("<descr_athmo> :\t\t{int}     [1, 9]")
    print("<descr_lum> :\t\t{int}     [1, 5]")
    print("<descr_etat_surf> :\t{int}     [1, 9]")
    print("<age> :\t\t\t{int}     [0, +inf]")
    print("<descr_dispo_secu> :\t{int}     [1, 15]")
    print("<descr_type_col> :\t{int}     [1, 7]")
    print("<filename> :\t\t{string}  \"path_to_csv\"")
    print("")
    print("Aide :")
    print("\t>>> python script2_sup.py -h")
    print("\t>>> python script2_sup.py --help")

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
        data_csv["descr_type_col"][0] < 1 or data_csv["descr_type_col"][0] > 7:

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
        
    print("")
    print("Format de la commande :")
    print("\t>>> python script2_sup.py <latitude> <longitude> <descre_athmo> <descr_lum> <descr_etat_surf> <age> <descr_dispo_secu> <descr_type_col> <filename>")
    print("")
    print("<latitude> :\t\t{float}   [-90, 90]")
    print("<longitude> :\t\t{float}   [-180, 180]")
    print("<descr_athmo> :\t\t{int}     [1, 9]")
    print("<descr_lum> :\t\t{int}     [1, 5]")
    print("<descr_etat_surf> :\t{int}     [1, 9]")
    print("<age> :\t\t\t{int}     [0, +inf]")
    print("<descr_dispo_secu> :\t{int}     [1, 15]")
    print("<descr_type_col> :\t{int}     [1, 7]")
    print("<filename> :\t\t{string}  \"path_to_csv\"")
    print("")
    print("Aide :")
    print("\t>>> python script2_sup.py -h")
    print("\t>>> python script2_sup.py --help")

    # Arrêt de l'exécution du script 
    sys.exit()

#On récupère le fichier csv avec 
csv_file = sys.argv[9]

#On vérifie si le fichier éxiste
if os.path.isfile(csv_file):

    #On récupère les information de l'accident
    data_csv = {
    'latitude': [sys.argv[1]],
    'longitude': [sys.argv[2]],
    'descr_athmo': [sys.argv[3]],
    'descr_lum': [sys.argv[4]],
    'descr_etat_surf': [sys.argv[5]],
    'age': [sys.argv[6]],
    'descr_dispo_secu': [sys.argv[7]],
    'descr_type_col': [sys.argv[8]]
    }
    accident = pd.DataFrame(data = data_csv)
    # Ouverture et lecture du fichier CSV contenant la liste des accidents
    # file = pd.read_csv('resources/export.csv', sep=';')
    file = pd.read_csv(csv_file, sep=';')
    #On prépare la base de données
    df = prepaDB(file)
    #On réduit la base de données
    df_reduced = reducDim(df)
    #On sépare la valeur cible et les features
    x = df_reduced.drop(columns=['descr_grav'])
    y = df_reduced['descr_grav']

    x_train, x_test, y_train, y_test = train_test_split(x, y, train_size=0.80, test_size=0.20)
        
    #On prédit la gravité de l'accident
    y_pred = KNN_Scikit_learn(15,accident, x_train, y_train, 'none')

    #Création d'un dictionnaire pour l'export en JSON
    dic = {"gravite" : int(y_pred)}

    # Ouverture du fichier json et écriture
    with open("json/gravite_knn.json", "w") as f:
        json.dump(dic, f)
else :
    print("Impossible d'ouvrir le fichier \"" + csv_file + "\"")
    print("Vérifier si le chemin d'accès est correct")