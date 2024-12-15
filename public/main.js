// function renderOffer(offer) {
//   const offerDiv = document.createElement("div");
//   offerDiv.classList.add("offerDiv", "col", "s12", "m6", "l4");

//   const card = document.createElement("div");
//   card.classList.add("card", "hoverable");

//   const cardImage = document.createElement("div");
//   cardImage.classList.add("card-image");

//   const image = document.createElement("img");
//   image.src = offer.imagePath ? offer.imagePath : "/path/to/default/image.png";
//   image.alt = offer.title;
//   image.classList.add("responsive-img");

//   const cardTitle = document.createElement("span");
//   cardTitle.textContent = offer.title;
//   cardTitle.classList.add("card-title");

//   cardImage.appendChild(image);
//   cardImage.appendChild(cardTitle);

//   const cardContent = document.createElement("div");
//   cardContent.classList.add("card-content");

//   const price = document.createElement("p");
//   price.textContent = `Price: $${offer.price}`;

//   const description = document.createElement("p");
//   description.textContent = offer.description;

//   cardContent.appendChild(price);
//   cardContent.appendChild(description);

//   card.appendChild(cardImage);
//   card.appendChild(cardContent);

//   offerDiv.appendChild(card);

//   return offerDiv;
// }

// async function fetchAndRenderOffers() {
//   try {
//     const response = await fetch("/offers");
//     const offers = await response.json();

//     const offersContainer = document.getElementById("offersContainer");
//     offersContainer.innerHTML = ""; 

//     offers.forEach((offer) => {
//       const offerDiv = renderOffer(offer);
//       offersContainer.appendChild(offerDiv);
//     });
//   } catch (error) {
//     console.error("Error loading offers:", error);
//   }
// }

// document.getElementById("offerForm").addEventListener("submit", async (event) => {
//   event.preventDefault();

//   const formData = new FormData(document.getElementById("offerForm"));

//   try {
//     const response = await fetch("/upload", {
//       method: "POST",
//       body: formData,
//     });

//     const result = await response.json();

//     if (response.ok) {
//       alert("Offer saved successfully!");

//       await fetchAndRenderOffers();
//     } else {
//       alert(result.message || "Failed to save offer.");
//     }
//   } catch (error) {
//     console.error("Error:", error);
//     alert("An error occurred. Please try again.");
//   }
// });

// document.addEventListener("DOMContentLoaded", fetchAndRenderOffers);


document.addEventListener('DOMContentLoaded', () => {
  const offerForm = document.getElementById('offerForm');

  const offersContainer = document.getElementById('offersContainer');

  const fetchOffers = async () => {
      try {
          const response = await fetch('/offers');
          const offers = await response.json();

          offersContainer.innerHTML = '';

          offers.forEach(offer => {
              const offerDiv = document.createElement('div');
              offerDiv.classList.add('col', 's12', 'm6', 'l4');

              const card = document.createElement('div');
              card.classList.add('card', 'hoverable');

              if (offer.imagePath) {
                  const cardImage = document.createElement('div');
                  cardImage.classList.add('card-image');

                  const img = document.createElement('img');
                  img.src = offer.imagePath;
                  img.alt = offer.title;
                  img.classList.add('responsive-img');

                  console.log(img);
                  
                  cardImage.appendChild(img);
                  console.log(cardImage);

                  card.appendChild(cardImage);
              }

              const cardContent = document.createElement('div');
              cardContent.classList.add('card-content');

              const cardTitle = document.createElement('span');
              cardTitle.classList.add('card-title');

              cardTitle.textContent = offer.title;

              const priceParagraph = document.createElement('p');
              priceParagraph.textContent = `Price: $${offer.price}`;

              console.log(priceParagraph);
              

              const descriptionParagraph = document.createElement('p');
              descriptionParagraph.textContent = offer.description;

              cardContent.appendChild(cardTitle);
              cardContent.appendChild(priceParagraph);
              cardContent.appendChild(descriptionParagraph);
              card.appendChild(cardContent);

              offerDiv.appendChild(card);
              offersContainer.appendChild(offerDiv);
              
          });
      } catch (error) {
          console.error('Error fetching offers:', error);
      }
  };

  fetchOffers();

  offerForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const formData = new FormData(offerForm);

      try {
          const response = await fetch('/upload', {
              method: 'POST',
              body: formData
          });

          if (response.ok) {
              M.toast({ html: 'Offer created successfully!' });
              offerForm.reset();
              fetchOffers();
          } else {
              M.toast({ html: 'Error creating offer. Please try again.' });
          }
      } catch (error) {
          console.error('Error submitting form:', error);
          M.toast({ html: 'Error submitting form. Please try again.' });
      }
  });
});
