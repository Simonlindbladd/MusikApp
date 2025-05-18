-Skapa en ny feature-branch från development
git checkout development
git checkout -b features/lägga-till-knapp

-Lägga till ändringar och commit
git add index.html
git add script.js
git add songs.js
git add style.css
git commit -m "Lade till funktion för att skapa knapp"

-Ladda upp ny branch till GitHub
git push origin features/lägga-till-knapp

-Byt till development och slå ihop feature-branchen
git checkout development
git merge features/lägga-till-spellista

-Hantera konflikt
git add script.js
git commit

-Mergar development till main
git checkout main
git merge development
git push origin main
