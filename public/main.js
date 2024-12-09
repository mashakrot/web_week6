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
      document.getElementById('offerForm').reset();
    } else {
      alert(result.message || 'Failed to save offer.');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred. Please try again.');
  }
});