--Skapa ny gren 
git branch development

-- Byt till den nya grenen
git checkout development

-- Byt till development-grenen
git checkout development

-- Slå ihop features-grenen
git merge features


-- När utvecklingen är klar i development och jag vill uppdatera main, gör jag:
git checkout main
git merge development

--Hantera konflikter
<<<<< HEAD
------ Kod ------
=======
Kod från grenen som slås in
>>>>> features

-- Så här hanterade jag konflikter:
1. Öppnade filen i VS Code där konflikten fanns.

2. Läste igenom båda versionerna av koden.

3. Bestämde vilken kod som skulle behållas.

4. Tog bort konfliktmarkeringarna (<<<<<<<, =======, >>>>>>>).

5. Sparade filen.

6. Markerade att konflikten var löst med:

git add <filnamn>
git commit


En merge-konflikt i Git uppstår när samma del av en fil har ändrats i två olika grenar, och Git kan inte avgöra vilken ändring som ska användas. För att lösa konflikten öppnade jag filen i VS Code och jämförde ändringarna. Jag valde sedan vilken kod som skulle vara kvar, eller kombinerade båda om det behövdes. Efter det tog jag bort de konfliktmarkeringar som Git hade lagt till, sparade filen och markerade konflikten som löst i Git.