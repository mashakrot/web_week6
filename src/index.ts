import express, {Request, Response, Router} from "express"
import fs from "fs"
import path from "path"
import { compile } from "morgan"

const router: Router = Router()

type TUser = {
    name: string;
    todos: string[];
};  


const filePath = path.join(__dirname, '../../data/users.json');

const loadUsers = (): TUser[] => {
  if (!fs.existsSync(filePath)) {
    return [];
  }
  const data = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(data) as TUser[];
};

const saveUsers = (data: TUser[]) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
};

let users: TUser[] = loadUsers();

router.post('/add', (req: Request, res: Response) => {
  const { name, todo } = req.body;

  let user = users.find((u) => u.name === name);
  if (user) {
    user.todos.push(todo);
  } else {
    const newUser: TUser = { name, todos: [todo] };
    users.push(newUser);
  }

  saveUsers(users);
  res.json({ message: `Todo added successfully for user ${name}.` });
});


router.get('/todos/:id', (req: Request, res: Response) => {
    const { id } = req.params;
  
    const user = users.find((u) => u.name === id);

    if (user) {        
        res.json({ todos: user.todos });
    } else {
        res.json({ message: 'User not found' });
    }
  });


router.delete('/delete', (req: Request, res: Response) => {
    const { name } = req.body;
  
    const userIndex = users.findIndex((u) => u.name === name);
  
    users.splice(userIndex, 1);
  
    saveUsers(users);
  
    res.json({ message: 'User deleted successfully' });
});

router.put('/update', (req: Request, res: Response) => {
    const { name, todo } = req.body;
  
    if (!name || !todo) {
      res.json({ message: 'Name and todo are required' });
    }
  
    const user = users.find((u) => u.name === name);
  
    if (!user) {
      res.json({ message: 'User not found' });
    }
  
    if (user) {
        const todoIndex = user.todos.indexOf(todo);

        
        if (todoIndex === -1) {
            res.json({ message: 'Todo not found' });
        }
        
        user.todos.splice(todoIndex, 1);
    }
  
    saveUsers(users);
  
    res.json({ message: 'Todo deleted successfully' });
  });

export default router
