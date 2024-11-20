document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll(".section");
  const cardsContainer = document.querySelector(".cards-container");
  
  const ranges = {
    "1-5": [1, 5],
    "6-11": [6, 11],
    "12-17": [12, 17],
  };

  const sectionColors = {
    "1-5": "orange",
    "6-11": "green",
    "12-17": "blue",
  };

  sections.forEach((section) => {
    let currentIndex = 0;
    const maxCards = 6;
    const range = section.dataset.range;
    const [start, end] = ranges[range];
    
    const characterIDs = [];
    for (let i = start; i <= end; i++) {
      characterIDs.push(i);
    }

    section.addEventListener("mouseenter", async () => {
      if (currentIndex < maxCards) {
        const characterID = characterIDs[currentIndex];
        await loadCharacter(characterID, range);
        currentIndex++;
      }
    });
  });

  async function loadCharacter(characterID, range) {
    try {
      const response = await fetch(`https://swapi.dev/api/people/${characterID}/`);
      const character = await response.json();
      createCard(character, range);
    } catch (error) {
      console.error("Error al obtener el personaje:", error);
    }
  }

  function createCard(character, range) {
    const card = document.createElement("div");
    card.classList.add("card");

    const header = document.createElement("div");
    header.classList.add("card-header");
    header.innerText = character.name;

    const body = document.createElement("div");
    body.classList.add("card-body");

    const circle = document.createElement("div");
    circle.style.width = "20px";
    circle.style.height = "20px";
    circle.style.borderRadius = "50%";
    circle.style.backgroundColor = sectionColors[range];
    circle.style.margin = "0 auto 10px";

    body.appendChild(circle);
    body.innerHTML += `
      <p>Altura: ${character.height} cm</p>
      <p>Peso: ${character.mass} kg</p>
    `;

    card.appendChild(header);
    card.appendChild(body);
    cardsContainer.appendChild(card);
  }
});
