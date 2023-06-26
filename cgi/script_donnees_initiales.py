import mysql.connector
import sys


try:
   conn = mysql.connector.connect(host="127.0.0.1", 
                                  user="georges", password="what-else?", 
                                  database="magasin")
   cursor = conn.cursor()

   try:
      
      reference = (554871, "Confiture de fraise 250g", 10, 4.8) 
      cursor.execute("""INSERT INTO Produits (latitude, longitude, stock, prix) VALUES(%s, %s, %s, %s)""", reference)
      conn.commit()
   except:
      # En cas d'erreur on annule les modifications
      conn.rollback()
   
except mysql.connector.errors.InterfaceError as e:
   print("Error %d: %s" % (e.args[0],e.args[1]))
   sys.exit(1)
finally:
   # On ferme la connexion
   if conn:
      conn.close()