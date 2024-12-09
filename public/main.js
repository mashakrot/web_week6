document.getElementById('offerForm').addEventListener('submit', async (event) => {
  event.preventDefault();

  const formData = new FormData(document.getElementById('offerForm'));

  try {
    const response = await fetch('/upload', {
      method: 'POST',
      body: formData,
    });

    const result = await response.json();

    if (response.ok) {
      alert('Offer saved successfully!');
      
      // Fetch the updated offers
      const offerResponse = await fetch("/offers");
      const offers = await offerResponse.json();

      // Re-render offers
      const offersContainer = document.getElementById("offersContainer");
      offersContainer.innerHTML = ""; // Clear existing offers
      offers.forEach((offer) => {
        const offerDiv = document.createElement("div");
        offerDiv.classList.add("offerDiv");

        const title = document.createElement("p");
        title.textContent = `Title: ${offer.title}`;
        
        const description = document.createElement("p");
        description.textContent = `Description: ${offer.description}`;

        const price = document.createElement("p");
        price.textContent = `Price: $${offer.price}`;

        const image = document.createElement("img");
        image.src = offer.imagePath ? offer.imagePath : "/path/to/default/image.png";
        image.alt = offer.title;

        offerDiv.appendChild(image);
        offerDiv.appendChild(title);
        offerDiv.appendChild(description);
        offerDiv.appendChild(price);

        offersContainer.appendChild(offerDiv);
      });
    } else {
      alert(result.message || 'Failed to save offer.');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred. Please try again.');
  }
});



document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch("/offers");
    const offers = await response.json();

    const offersContainer = document.getElementById("offersContainer");
    
    offersContainer.innerHTML = "";

    offers.forEach((offer) => {
      const offerDiv = document.createElement("div");
      offerDiv.classList.add("offerDiv");

      const title = document.createElement("p");
      title.textContent = `Title: ${offer.title}`;
      
      const description = document.createElement("p");
      description.textContent = `Description: ${offer.description}`;

      const price = document.createElement("p");
      price.textContent = `Price: $${offer.price}`;

      const image = document.createElement("img");
      image.src = offer.imagePath ? offer.imagePath : "/path/to/default/image.png";
      image.alt = offer.title;

      offerDiv.appendChild(image);
      offerDiv.appendChild(title);
      offerDiv.appendChild(description);
      offerDiv.appendChild(price);

      offersContainer.appendChild(offerDiv);
    });
  } catch (error) {
    console.error("Error loading offers:", error);
  }
});
