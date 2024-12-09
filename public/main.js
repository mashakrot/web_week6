document.getElementById('offerForm').addEventListener('submit', async (event) => {
  event.preventDefault();

  const title = document.getElementById('title').value.trim();
  const description = document.getElementById('description').value.trim();
  const price = parseFloat(document.getElementById('price').value);

  try {
    const response = await fetch('/upload', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, description, price }),
    });

    const result = await response.json();

    if (response.ok) {
      alert('Offer saved successfully!');
      document.getElementById('offerForm').reset();
    } else {
      alert(result.message || 'Failed to save offer. Please try again.');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred while saving the offer. Please try again.');
  }
});
