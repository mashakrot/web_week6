// Function to render an offer
function renderOffer(offer) {
  const offerDiv = document.createElement("div");
  offerDiv.classList.add("offerDiv", "col", "s12", "m6", "l4");

  const card = document.createElement("div");
  card.classList.add("card", "hoverable");

  const cardImage = document.createElement("div");
  cardImage.classList.add("card-image");

  const image = document.createElement("img");
  image.src = offer.imagePath ? offer.imagePath : "/path/to/default/image.png";
  image.alt = offer.title;
  image.classList.add("responsive-img");

  const cardTitle = document.createElement("span");
  cardTitle.textContent = offer.title;
  cardTitle.classList.add("card-title");

  cardImage.appendChild(image);
  cardImage.appendChild(cardTitle);

  const cardContent = document.createElement("div");
  cardContent.classList.add("card-content");

  const price = document.createElement("p");
  price.textContent = `Price: $${offer.price}`;

  const description = document.createElement("p");
  description.textContent = offer.description;

  cardContent.appendChild(price);
  cardContent.appendChild(description);

  card.appendChild(cardImage);
  card.appendChild(cardContent);

  offerDiv.appendChild(card);

  return offerDiv;
}

// Function to fetch and display offers
async function fetchAndRenderOffers() {
  try {
    const response = await fetch("/offers");
    const offers = await response.json();

    const offersContainer = document.getElementById("offersContainer");
    offersContainer.innerHTML = ""; // Clear existing offers

    offers.forEach((offer) => {
      const offerDiv = renderOffer(offer);
      offersContainer.appendChild(offerDiv);
    });
  } catch (error) {
    console.error("Error loading offers:", error);
  }
}

// Form submission handler
document.getElementById("offerForm").addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(document.getElementById("offerForm"));

  try {
    const response = await fetch("/upload", {
      method: "POST",
      body: formData,
    });

    const result = await response.json();

    if (response.ok) {
      alert("Offer saved successfully!");

      // Fetch and re-render offers
      await fetchAndRenderOffers();
    } else {
      alert(result.message || "Failed to save offer.");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("An error occurred. Please try again.");
  }
});

// Fetch and render offers on page load
document.addEventListener("DOMContentLoaded", fetchAndRenderOffers);
