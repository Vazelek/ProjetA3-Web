import pandas as pd

villes = pd.read_csv("gen_python/resources/commune2021.csv", sep = ",").drop(labels = ["TYPECOM", "REG", "DEP", "CTCD", "ARR", "TNCC", "NCC", "NCCENR", "CAN", "COMPARENT"], axis = 1).values.tolist()

file = open("sql/gen_villes.sql", "w", encoding='utf-8')

file.write("""-- Table Gravité
DELETE FROM gravite;
ALTER TABLE gravite AUTO_INCREMENT = 1;

INSERT INTO gravite (descr_grav) VALUES \n\n""")

for ville in villes:
    if ville == villes[-1]:
        file.write(("(\"" + str(ville[0]) + "\", \"" + str(ville[1]) + "\");\n"))
    else:
        file.write(("(\"" + str(ville[0]) + "\", \"" + str(ville[1]) + "\"),\n"))

print("end")

file.close()