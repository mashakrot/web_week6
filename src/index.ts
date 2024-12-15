// import express, {Request, Response, Router} from "express"
// import fs from "fs"
// import path from "path"
// import { compile } from "morgan"
// import { Offer, IOffer } from "./models/Offer";
// import { Image, IImage } from "./models/Image";
// import upload from "./middlewares/multer";

// const router: Router = Router()

// const filePath = path.join(__dirname, '../../data.json');

// router.get("/", (req: Request, res: Response) => {
//   res.sendFile(__dirname + "/index.html");
// });

// // router.post("/upload", upload.single("image"), async (req: Request, res: Response) => {
// //   try {
// //     const { title, description, price } = req.body;

// //     if (!title || !description || !price) {
// //       res.status(400).json({ message: "Title, description, and price are required." });
// //     }

// //     let imageId = null;

// //     if (req.file) {
// //       const filename = req.file.filename;
// //       const filepath = `public/images/${filename}`;

// //       const newImage: IImage = new Image({ filename, path: filepath });
// //       const savedImage = await newImage.save();
// //       imageId = savedImage._id.toString(); 
// //     }

// //     const newOffer: IOffer = new Offer({ title, description, price: Number(price), imageId });
// //     await newOffer.save();

// //     res.status(201).json({ message: "Offer saved successfully!" });
// //   } catch (error) {
// //     console.error("Error saving offer:", error);
// //     res.status(500).json({ message: "Internal server error. Failed to save offer." });
// //   }
// // });

// router.post('/upload', upload.single('image'), async (req: Request, res: Response) => {
//   const { title, description, price } = req.body;

//   if (!title || !description || typeof price !== 'number' || price <= 0) {
//     res.status(400).json({ message: 'Invalid input. Please provide valid title, description, and price.' });
//   }

//   try {
//     const imagePath = req.file?.path || ''; // Path to the uploaded image file

//     // Create and save a new offer
//     const newOffer: IOffer = new Offer({ title, description, price, image: imagePath });
//     await newOffer.save();

//     res.status(201).json({ message: 'Offer saved successfully!' });
//   } catch (error) {
//     console.error('Error saving offer:', error);
//     res.status(500).json({ message: 'Internal server error. Failed to save offer.' });
//   }
// });



// // router.get('/todos/:id', async (req: Request, res: Response) => {
// //     const { name, id } = req.params;
  
// //     // let user = await User.findOne({ name });
// //     const user = await User.findOne({ name: id });


// //     console.log(user)

// //     if (user) {        
// //         res.json({ todos: user.todos });
// //         console.log(user.todos);
        
// //     } else {
// //         res.json({ message: 'User not found' });
// //     }
// //   });


// //   router.delete('/delete', async (req: Request, res: Response) => {
// //     const { name } = req.body;
  
// //     if (!name) {
// //       res.json({ message: "Name is required." });
// //     }
  
// //     try {
// //       if (name) {
// //         const result = await User.findOneAndDelete({ name });
        
// //         if (!result) {
// //           res.json({ message: "User not found." });
// //         }
        
// //         res.json({ message: 'User deleted successfully.' });
// //       }
// //     } catch (error) {
// //       res.json({ message: 'Error deleting user.', error });
// //     }
// //   });
  

// // router.put('/update', async (req: Request, res: Response) => {
// //   const { name, todo }: { name: string; todo: string } = req.body;
  
// //     if (!name || !todo) {
// //       res.json({ message: 'Name and todo are required' });
// //     }
  
// //     try {
// //       const user = await User.findOne({ name });
  
// //       if (!user) {
// //         res.json({ message: "User not found" });
// //       }
  
// //       if (user) {

// //         const originalTodosLength = user.todos.length;
// //         user.todos = user.todos.filter((t) => t.todo !== todo);
        
// //         if (user.todos.length === originalTodosLength) {
// //           res.json({ message: "Todo not found" });
// //         }
        
// //         await user.save();
        
// //         res.json({ message: `Todo deleted successfully for user ${name}.` });
// //       }
// //     } catch (error) {
// //       res.json({ message: "Error deleting todo.", error });
// //     }
// //   });

// //   router.put("/updateTodo", async (req: Request, res: Response) => {
// //     const { name, todo, checked }: { name: string; todo: string; checked: boolean } = req.body;
  
// //     if (!name || !todo || typeof checked !== "boolean") {
// //       res.json({ message: "Name, todo, and checked are required." });
// //     }
  
// //     try {
// //       const user = await User.findOne({ name });
  
// //       if (!user) {
// //         res.json({ message: "User not found." });
// //       }
  
// //       if (user) {
        
// //         const targetTodo = user.todos.find((t) => t.todo === todo);
        
// //         if (!targetTodo) {
// //           res.json({ message: "Todo not found." });
// //         }
        
// //         if (targetTodo) {
// //           targetTodo.checked = checked;
// //         }
        
// //         await user.save();
        
// //         res.json({ message: "Todo updated successfully." });
// //       }
// //     } catch (error) {
// //       res.json({ message: "Error updating todo.", error });
// //     }
// //   });
    


// export default router
