import express, {Request, Response, Router} from "express"
import fs from "fs"
import path from "path"
import { compile } from "morgan"
import { User, ITodo } from "./models/User";

const router: Router = Router()

const filePath = path.join(__dirname, '../../data.json');

// const loadUsers = (): TUser[] => {
//   if (!fs.existsSync(filePath)) {
//     return [];
//   }
//   const data = fs.readFileSync(filePath, 'utf-8');
//   return JSON.parse(data) as TUser[];
// };

// const saveUsers = (data: TUser[]) => {
//   fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
// };

// let users: TUser[] = loadUsers();

router.post('/add', async (req: Request, res: Response) => {
  const { name, todo } = req.body;

  try {
    let user = await User.findOne({ name });
    if (user) {
      user.todos.push({ todo } as ITodo);
    } else {
      user = new User({ name, todos: [{ todo }] });
    }

    await user.save();
    res.json({ message: `Todo added successfully for user ${name}.` });
  } catch (err) {
    res.status(500).json({ message: 'Error adding todo', error: err });
  }
});


router.get('/todos/:id', async (req: Request, res: Response) => {
    const { name, id } = req.params;
  
    // let user = await User.findOne({ name });
    const user = await User.findOne({ name: id });


    console.log(user)

    if (user) {        
        res.json({ todos: user.todos });
        console.log(user.todos);
        
    } else {
        res.json({ message: 'User not found' });
    }
  });


  router.delete('/delete', async (req: Request, res: Response) => {
    const { name } = req.body;
  
    if (!name) {
      res.json({ message: "Name is required." });
    }
  
    try {
      if (name) {
        const result = await User.findOneAndDelete({ name });
        
        if (!result) {
          res.json({ message: "User not found." });
        }
        
        res.json({ message: 'User deleted successfully.' });
      }
    } catch (error) {
      res.json({ message: 'Error deleting user.', error });
    }
  });
  

router.put('/update', async (req: Request, res: Response) => {
  const { name, todo }: { name: string; todo: string } = req.body;
  
    if (!name || !todo) {
      res.json({ message: 'Name and todo are required' });
    }
  
    try {
      const user = await User.findOne({ name });
  
      if (!user) {
        res.json({ message: "User not found" });
      }
  
      if (user) {

        const originalTodosLength = user.todos.length;
        user.todos = user.todos.filter((t) => t.todo !== todo);
        
        if (user.todos.length === originalTodosLength) {
          res.json({ message: "Todo not found" });
        }
        
        await user.save();
        
        res.json({ message: `Todo deleted successfully for user ${name}.` });
      }
    } catch (error) {
      res.json({ message: "Error deleting todo.", error });
    }
  });

  router.put("/updateTodo", async (req: Request, res: Response) => {
    const { name, todo, checked }: { name: string; todo: string; checked: boolean } = req.body;
  
    if (!name || !todo || typeof checked !== "boolean") {
      res.json({ message: "Name, todo, and checked are required." });
    }
  
    try {
      const user = await User.findOne({ name });
  
      if (!user) {
        res.json({ message: "User not found." });
      }
  
      if (user) {
        
        const targetTodo = user.todos.find((t) => t.todo === todo);
        
        if (!targetTodo) {
          res.json({ message: "Todo not found." });
        }
        
        if (targetTodo) {
          targetTodo.checked = checked;
        }
        
        // Save the user
        await user.save();
        
        res.json({ message: "Todo updated successfully." });
      }
    } catch (error) {
      res.json({ message: "Error updating todo.", error });
    }
  });
    


export default router
