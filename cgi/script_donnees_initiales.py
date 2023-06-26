import sys
import pandas as pd
import os.path

def prepaDB(df):
    # split la colonne date en deux colonnes date et hour
    df[['date', 'hour']] = df['date'].str.split(' ', expand=True)

    # enleve les - dans la colonne date et les : dans la colonne hour
    df['date'] = df['date'].str.replace('-', '')
    df['hour'] = df['hour'].str.replace(':', '')

    # convertir la colonne date en int
    df['date'] = df['date'].astype(int)
    df['hour'] = df['hour'].astype(int)

    return df

def reducDim(df):
    #Variable ne déterminant pas la gravité de l'accident
    df_reduced = df.drop(columns=[ 'num_veh', 'ville', 'Num_Acc','id_usa', 'place', 'descr_agglo', 'descr_cat_veh', 'an_nais', 'descr_motif_traj', 'description_intersection', 'descr_type_col'])
    
    return df_reduced

csv_file = sys.argv[1]
file = pd.read_csv(csv_file, sep=';')
df = prepaDB(file)
df_reduced  = reducDim(df)
list_df = df_reduced.values.tolist()

file = open("data_init.sql", "w")
if os.path.isfile("data_init.sql"):
   file.write('-- Table Gravité\n')
   file.write('DELETE FROM gravite;\n')
   file.write('ALTER TABLE gravite AUTO_INCREMENT = 1;\n\n')
   file.write('INSERT INTO gravite (descr_grav) VALUES \n("Indemne"),\n("Blessé léger"),\n("Blessé hospitalisé"),\n("Tué");\n\n')

   file.write('-- Table Etat de la surface\n')
   file.write('DELETE FROM etat_surface;\n')
   file.write('ALTER TABLE etat_surface AUTO_INCREMENT = 1;\n\n')
   file.write('INSERT INTO etat_surface (descr_etat_surf) VALUES \n("Normale"),\n("Mouillée"),\n("Flaques"),\n("Inondée"),\n("Enneigée"),\n("Boue"),\n("Verglacée"),\n("Corps gras - huile"),\n("Autre");\n\n')

   file.write('-- Table Conditions athmosphériques\n')
   file.write('DELETE FROM conditions_atmospheriques;\n')
   file.write('ALTER TABLE conditions_atmospheriques\n AUTO_INCREMENT = 1;\n\n')
   file.write('INSERT INTO conditions_atmospheriques (descr_athmo) VALUES \n("Normale"),\n("Pluie légère"),\n("Pluie forte"),\n("Neige - grêle"),("Brouillard - fumée"),\n("Vent fort - tempête"),\n("Temps éblouissant"),\n("Temps couvert"),\n("Autre");\n\n')

   file.write('-- Table Luminosité\n')
   file.write('DELETE FROM luminosite;\n')
   file.write('ALTER TABLE luminosite AUTO_INCREMENT = 1;\n\n')
   file.write('INSERT INTO luminosite (descr_lum) VALUES \n("Plein jour"),\n("Crépuscule ou aube"),\n("Nuit sans éclairage public"),\n("Nuit avec éclairage public non allumé"),\n("Nuit avec éclairage public allumé");\n\n')

   file.write('-- Table Utilisation de dispositif de sécurité\n')
   file.write('DELETE FROM securite;\n')
   file.write('ALTER TABLE securite AUTO_INCREMENT = 1;\n\n')
   file.write('INSERT INTO securite (descr_dispo_secu) VALUES \n("Utilisation d\'une ceinture de sécurité "),\n("Utilisation d\'un casque "),\n("Présence d\'une ceinture de sécurité - Utilisation non déterminable"),\n("Présence de ceinture de sécurité non utilisée "),\n("Autre - Non déterminable"),\n("Présence d\'un équipement réfléchissant non utilisé"),\n("Présence d\'un casque non utilisé "),\n("Utilisation d\'un dispositif enfant"),\n ("Présence d\'un casque - Utilisation non déterminable"),\n("Présence dispositif enfant - Utilisation non déterminable"),\n("Autre - Utilisé"), \n("Utilisation d\'un équipement réfléchissant "),\n("Autre - Non utilisé"), \n("Présence équipement réfléchissant - Utilisation non déterminable"),\n("Présence d\'un dispositif enfant non utilisé")\n;\n\n')

   file.write('INSERT INTO accident (age, date, heure, latitude, longitude, id_ville, id_lum, id_athmo, id_etat_surf, id_dispo_secu) VALUES\n')

   for list in list_df:
      if list == list_df[-1]:
         file.write('('+ str(list[7]) + ',' + str(list[0]) + ',' + str(list[10]) + ',' + str(list[2]) + ',' + str(list[3]) + ',' + str(list[1]) + ',' + str(list[5]) + ',' + str(list[4]) + ',' + str(list[6]) + ',' + str(list[8]) +');')
      else :
          file.write('('+ str(list[7]) + ',' + str(list[0]) + ',' + str(list[10]) + ',' + str(list[2]) + ',' + str(list[3]) + ',' + str(list[1]) + ',' + str(list[5]) + ',' + str(list[4]) + ',' + str(list[6]) + ',' + str(list[8]) +'),\n')
file.close()
