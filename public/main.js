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
  
      document.getElementById('todoForm').reset();
    } catch (error) {
      console.error('Error:', error);
    }
});
  

  document.getElementById('searchForm').addEventListener('submit', async (event) => {
    event.preventDefault();
  
    const name = document.getElementById('searchInput').value.trim();
  
    try {
      const response = await fetch(`/todos/${name}`);
  
      const messageElement = document.getElementById('searchMessage');
      const todoList = document.getElementById('todoList');
      const deleteButton = document.getElementById('deleteUser');
  
      if (response.ok) {
        const { todos } = await response.json();
  
        messageElement.textContent = `Todos for user: ${name}`;
        todoList.innerHTML = '';
        deleteButton.style.display = 'block'; 

        todos.forEach((todo) => {
            const li = document.createElement('li');
            li.innerHTML = `<a href="#" class="delete-task">${todo}</a>`;
            todoList.appendChild(li);
        });
  
        deleteButton.dataset.userName = name;
      } else {
        const { message } = await response.json();
  
        messageElement.textContent = message;
        todoList.innerHTML = '';
        deleteButton.style.display = 'none'; 
      }
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  });
  

  document.getElementById('deleteUser').addEventListener('click', async (event) => {
    const name = event.target.dataset.userName;
  
    try {
      const response = await fetch('/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
      });
  
      const messageElement = document.getElementById('searchMessage');
      const todoList = document.getElementById('todoList');
      const deleteButton = document.getElementById('deleteUser');
  
      const result = await response.json();
  
      if (response.ok) {
        messageElement.textContent = result.message;
        todoList.innerHTML = ''; 
        deleteButton.style.display = 'none';
      } else {
        messageElement.textContent = result.message;
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  });

  document.getElementById('todoList').addEventListener('click', async (event) => {
    event.preventDefault();
  
    const target = event.target;
  
    if (target && target.classList.contains('delete-task')) {
      const todo = target.textContent;
      const name = document.getElementById('searchInput').value.trim();
  
      try {
        const response = await fetch('/update', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, todo }),
        });
  
        const result = await response.json();
        const messageElement = document.getElementById('searchMessage');
  
        if (response.ok) {
          messageElement.textContent = result.message;
  
          target.parentElement.remove();
        } else {
          messageElement.textContent = result.message;
        }
      } catch (error) {
        console.error('Error deleting todo:', error);
      }
    }
  });
  
  