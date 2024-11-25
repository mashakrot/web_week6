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


// router.use((req, res, next) => {
//     express.json()(req, res, next);
// });

// router.get('/hello', (req: Request, res: Response) => {
//     res.json({ msg: "Hello world!" });
// });

// router.get('/echo/:id', (req: Request, res: Response) => {
//     const { id } = req.params;
//     res.json({ id });
// });


// router.post("/sum", (req: Request, res: Response) => {
//     const numbers: number[] = req.body.numbers
//     console.log(numbers)
//     const sum: number = numbers.reduce((total, num) => total + num, 0);
//     res.json({ sum });
// });


// router.post("/users", (req: Request, res: Response) => {
//     const { name, email } = req.body

//     const newUser: TUser = { name: name, email: email.trim() }

//     users.push(newUser)

//     res.json({ message: `User successfully added` });
// });


// router.get("/users", (req: Request, res: Response) => {
//     // let users: any = req.params
//     console.log(users);
    
//     res.status(201).json({ users });
// })



export default router
