import express, {Request, Response, Router} from "express"
import fs from "fs"
import path from "path"
import { compile } from "morgan"
import { Offer, IOffer } from "./models/Offer";

const router: Router = Router()

const filePath = path.join(__dirname, '../../data.json');

router.get("/", (req: Request, res: Response) => {
  res.sendFile(__dirname + "/index.html");
});

router.post('/upload', async (req: Request, res: Response) => {
  const { title, description, price } = req.body;

  try {
    const newOffer: IOffer = new Offer({ title, description, price });
        await newOffer.save();

        res.status(201).send("Offer saved successfully!");
  } catch (error) {
    res.json({ message: 'Error saving offer.', error });
  }
});


// router.get('/todos/:id', async (req: Request, res: Response) => {
//     const { name, id } = req.params;
  
//     // let user = await User.findOne({ name });
//     const user = await User.findOne({ name: id });


//     console.log(user)

//     if (user) {        
//         res.json({ todos: user.todos });
//         console.log(user.todos);
        
//     } else {
//         res.json({ message: 'User not found' });
//     }
//   });


//   router.delete('/delete', async (req: Request, res: Response) => {
//     const { name } = req.body;
  
//     if (!name) {
//       res.json({ message: "Name is required." });
//     }
  
//     try {
//       if (name) {
//         const result = await User.findOneAndDelete({ name });
        
//         if (!result) {
//           res.json({ message: "User not found." });
//         }
        
//         res.json({ message: 'User deleted successfully.' });
//       }
//     } catch (error) {
//       res.json({ message: 'Error deleting user.', error });
//     }
//   });
  

// router.put('/update', async (req: Request, res: Response) => {
//   const { name, todo }: { name: string; todo: string } = req.body;
  
//     if (!name || !todo) {
//       res.json({ message: 'Name and todo are required' });
//     }
  
//     try {
//       const user = await User.findOne({ name });
  
//       if (!user) {
//         res.json({ message: "User not found" });
//       }
  
//       if (user) {

//         const originalTodosLength = user.todos.length;
//         user.todos = user.todos.filter((t) => t.todo !== todo);
        
//         if (user.todos.length === originalTodosLength) {
//           res.json({ message: "Todo not found" });
//         }
        
//         await user.save();
        
//         res.json({ message: `Todo deleted successfully for user ${name}.` });
//       }
//     } catch (error) {
//       res.json({ message: "Error deleting todo.", error });
//     }
//   });

//   router.put("/updateTodo", async (req: Request, res: Response) => {
//     const { name, todo, checked }: { name: string; todo: string; checked: boolean } = req.body;
  
//     if (!name || !todo || typeof checked !== "boolean") {
//       res.json({ message: "Name, todo, and checked are required." });
//     }
  
//     try {
//       const user = await User.findOne({ name });
  
//       if (!user) {
//         res.json({ message: "User not found." });
//       }
  
//       if (user) {
        
//         const targetTodo = user.todos.find((t) => t.todo === todo);
        
//         if (!targetTodo) {
//           res.json({ message: "Todo not found." });
//         }
        
//         if (targetTodo) {
//           targetTodo.checked = checked;
//         }
        
//         await user.save();
        
//         res.json({ message: "Todo updated successfully." });
//       }
//     } catch (error) {
//       res.json({ message: "Error updating todo.", error });
//     }
//   });
    


export default router
