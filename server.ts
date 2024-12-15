// import express, {Express} from "express"
// import path from "path"
// import bodyParser from "body-parser";
// import router from "./src/index"
// import morgan from "morgan"
// import mongoose, {Connection} from "mongoose"

// const app: Express = express()
// const port = 3000

// const mongoDB: string = "mongodb://127.0.0.1:27017/testdb"
// mongoose.connect(mongoDB)
// mongoose.Promise = Promise
// const db: Connection = mongoose.connection

// db.on("error", console.error.bind(console,"MongoDB connecttion error"))

// app.use(express.json())
// app.use(express.urlencoded({extended: false}))
// app.use(morgan("dev"))


// app.use(express.static(path.join(__dirname, "../public")))
// app.use("/", router)

// app.listen(port, () => {
//     console.log(`Server running on port ${port}`)

// })

import express from 'express';
import mongoose, {Connection} from "mongoose"
import bodyParser from 'body-parser';
import upload from './src/middlewares/multer';
import Offer from './src/models/Offer';
import Image from './src/models/Image';
import path from 'path';

const app = express();
const PORT = 3000;

const mongoDB: string = "mongodb://127.0.0.1:27017/testdb"
mongoose.connect(mongoDB)
mongoose.Promise = Promise
const db: Connection = mongoose.connection

db.on("error", console.error.bind(console,"MongoDB connecttion error"))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/public', express.static(path.join(__dirname, '../public')));

// MongoDB connection
// mongoose.connect('mongodb://127.0.0.1:27017/testdb', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// }).then(() => console.log('Connected to MongoDB')).catch((err) => console.error('MongoDB connection error:', err));

app.post('/upload', upload.single('image'), async (req, res) => {
    try {
        const { title, description, price } = req.body;
        const newOffer: any = { title, description, price };

        if (req.file) {
            const image = new Image({
                filename: req.file.filename,
                path: `public/images/${req.file.filename}`,
            });
            const savedImage = await image.save();
            newOffer.imageId = savedImage._id;
        }

        const offer = new Offer(newOffer);
        await offer.save();
        res.send({ message: 'Offer created successfully!' });
    } catch (err) {
        res.send({ error: 'Error creating offer' });
    }
});

app.get('/offers', async (req, res) => {
    try {
        const offers = await Offer.find();
        const offersWithImages = await Promise.all(
            
            offers.map(async (offer) => {
                if (offer.imageId) {
                    const image = await Image.findById(offer.imageId);
                    return {
                        title: offer.title,
                        description: offer.description,
                        price: offer.price,
                        imagePath: image ? image.path : null,
                    };

                }


                return {
                    title: offer.title,
                    description: offer.description,
                    price: offer.price,
                    imagePath: null,
                };
            })
        );



        res.json(offersWithImages);
    } catch (err) {
        res.send({ error: 'Error fetching offers' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
