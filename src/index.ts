import express, {Request, Response, Router} from "express"
import fs from "fs"
import path from "path"
import { compile } from "morgan"
import { Offer, IOffer } from "./models/Offer";
import { Image, IImage } from "./models/Image";
import upload from "./middlewares/multer";

const router: Router = Router()

const filePath = path.join(__dirname, '../../data.json');

router.get("/", (req: Request, res: Response) => {
  res.sendFile(__dirname + "/index.html");
});

// router.post("/upload", upload.single("image"), async (req: Request, res: Response) => {
//   try {
//     const { title, description, price } = req.body;

//     if (!title || !description || !price) {
//       res.status(400).json({ message: "Title, description, and price are required." });
//     }

//     let imageId = null;

//     if (req.file) {
//       const filename = req.file.filename;
//       const filepath = `public/images/${filename}`;

//       const newImage: IImage = new Image({ filename, path: filepath });
//       const savedImage = await newImage.save();
//       imageId = savedImage._id.toString(); 
//     }

//     const newOffer: IOffer = new Offer({ title, description, price: Number(price), imageId });
//     await newOffer.save();

//     res.status(201).json({ message: "Offer saved successfully!" });
//   } catch (error) {
//     console.error("Error saving offer:", error);
//     res.status(500).json({ message: "Internal server error. Failed to save offer." });
//   }
// });

router.post('/upload', upload.single('image'), async (req: Request, res: Response) => {
  const { title, description, price } = req.body;

  if (!title || !description || typeof price !== 'number' || price <= 0) {
    res.status(400).json({ message: 'Invalid input. Please provide valid title, description, and price.' });
  }

  try {
    const imagePath = req.file?.path || '';
    const newOffer: IOffer = new Offer({ title, description, price, image: imagePath });
    await newOffer.save();

    res.status(201).json({ message: 'Offer saved successfully!' });
  } catch (error) {
    console.error('Error saving offer:', error);
    res.status(500).json({ message: 'Internal server error. Failed to save offer.' });
  }
});

router.get("/offers", async (req: Request, res: Response) => {
  try {
    const offers = await Offer.find().populate("imageId").exec();

    const responseOffers = offers.map((offer) => ({
      title: offer.title,
      description: offer.description,
      price: offer.price,
      imagePath: offer.imageId ? offer.imageId.path : null, 
    }));

    res.status(200).json(responseOffers);
  } catch (error) {
    console.error("Error fetching offers:", error);
    res.status(500).json({ message: "Failed to fetch offers." });
  }
});



export default router
