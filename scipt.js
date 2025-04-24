const list = document.getElementById("list");
const spellistor = [];

function läggTillSpellista() {
  const genre = document.getElementById("genre").value;
  const artist = document.getElementById("artist").value;
  const låtarInput = document.getElementById("låtar").value;

  const låtar = låtarInput.split(",").map((titel) => ({
    titel: titel.trim(),
    länk: "#" // Lägg riktiga länkar om du vill
  }));

  const ny = { genre, artist, låtar };
  spellistor.push(ny);
  renderSpellistor();

  // Rensa formuläret
  document.getElementById("genre").value = "";
  document.getElementById("artist").value = "";
  document.getElementById("låtar").value = "";
}

function renderSpellistor() {
  list.innerHTML = "";
  spellistor.forEach((s) => {
    const li = document.createElement("li");
    const låtHtml = s.låtar
      .map((låt) => `<a href="${låt.länk}" target="_blank">${låt.titel}</a>`)
      .join(", ");

    li.innerHTML = `<strong>${s.genre}</strong> ${s.artist} ${låtHtml}`;
    list.appendChild(li);
  });
}
