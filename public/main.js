document.getElementById('todoForm').addEventListener('submit', async (event) => {
    event.preventDefault(); 
  
    const name = document.getElementById('userInput').value.trim();
    const todo = document.getElementById('todoInput').value.trim();
  
    console.log(name, todo);
    console.log(JSON.stringify({ name, todo }));
    
    try {
      const response = await fetch('/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, todo }),
      });
  
      const result = await response.json();

      console.log(result);
      
      const messageElement = document.getElementById('responseMessage');
  
      if (response.ok) {
        messageElement.textContent = result.message;
      } else {
        messageElement.textContent = result.error || 'Something went wrong.';
      }
  
      // Clear form inputs
      document.getElementById('todoForm').reset();
    } catch (error) {
      console.error('Error:', error);
    }
  });
  