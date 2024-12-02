import express, {Request, Response, Router} from "express"
import fs from "fs"
import path from "path"
import { compile } from "morgan"
import { User, ITodo } from "./models/User";

const router: Router = Router()

// type TUser = {
//     name: string;
//     todos: string[];
// };  


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
    const { id } = req.params;
  
    let user = await User.findOne({ id });

    if (user) {        
        res.json({ todos: user.todos });
    } else {
        res.json({ message: 'User not found' });
    }
  });


// router.delete('/delete', (req: Request, res: Response) => {
//     const { name } = req.body;
  
//     const userIndex = users.findIndex((u) => u.name === name);
  
//     users.splice(userIndex, 1);
  
//     saveUsers(users);
  
//     res.json({ message: 'User deleted successfully' });
// });

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
      }
  
      res.json({ message: `Todo deleted successfully for user ${name}.` });
    } catch (error) {
      res.json({ message: "Error deleting todo.", error });
    }
  });

export default router
