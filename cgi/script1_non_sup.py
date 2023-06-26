import sys
import numpy as np
import pickle
import os.path
import json

# Vérification du nombre d'arguments
if len(sys.argv) != 3:
    # Vérification si help est demandé
    if len(sys.argv) == 2:
        if not (sys.argv[1] == "-h" or sys.argv[1] == "--help"):
            print("Erreur : Nombre incorrect d'arguments")
            print("Requis : 2, donnés : " + str(len(sys.argv) - 1))
            print("")
    else:
        print("Erreur : Nombre incorrect d'arguments")
        print("Requis : 2, donnés : " + str(len(sys.argv) - 1))
        print("")

    print("Format de la commande :")
    print("\t>>> python script1_non_sup.py <latitude> <longitude>")
    print("")
    print("<latitude> :\t\t{float}   [-90, 90]")
    print("<longitude> :\t\t{float}   [-180, 180]")
    print("")
    print("Aide :")
    print("\t>>> python script1_non_sup.py -h")
    print("\t>>> python script1_non_sup.py --help")

    # Arrêt de l'exécution du script 
    sys.exit()

# Vérification des arguments
if float(sys.argv[1]) < -90 or float(sys.argv[1]) > 90 or \
        float(sys.argv[2]) < -180 or float(sys.argv[2]) > 180:

    print("Erreur : Argument(s) invalide(s)")

    # Affichage des arguments posant problème
    if float(sys.argv[1]) < -90 or float(sys.argv[1]) > 90:
        print("-> latitude (" + str(float(sys.argv[1])) + ")")        
    if float(sys.argv[2]) < -180 or float(sys.argv[2]) > 180:
        print("-> longitude (" + str(float(sys.argv[2])) + ")")  
        
    print("")
    print("Format de la commande :")
    print("\t>>> python script1_non_sup.py <latitude> <longitude>")
    print("")
    print("<latitude> :\t\t{float}   [-90, 90]")
    print("<longitude> :\t\t{float}   [-180, 180]")
    print("")
    print("Aide :")
    print("\t>>> python script1_non_sup.py -h")
    print("\t>>> python script1_non_sup.py --help")

    # Arrêt de l'exécution du script 
    sys.exit()

# Calcul de la distance entre 2 points
def distance(p1, p2):
    return np.sqrt((p1[0] - p2[0]) ** 2 + (p1[1] - p2[1]) ** 2)

if os.path.isfile("variables/centroids"):

    # Lecture de la ligne de commande pour récupérer la latitude et la longitude renseignée
    lat = float(sys.argv[1])
    long = float(sys.argv[2])
    new_point = [long, lat]
    
    # Ouverture et lecture du fichier où les centroids sont stockés
    file = open("variables/centroids", "rb")
    centroids = pickle.load(file)
    file.close()

    # Calcul des distances entre le nouveau point et tous les centroids
    distances = [distance(new_point, centroids) for centroids in centroids]
    label = np.argmin(distances)

    #Création d'un dictionnaire pour l'export en JSON
    dic = {"num_cluster" : int(label)}

    # Ouverture du fichier json et écriture
    with open("json/cluster_non_sup.json", "w") as f:
        json.dump(dic, f)

else:
    print("Impossible d'ouvrir le fichier variables/centroids.")
    print("Exécuter save_centroids pour le générer")

