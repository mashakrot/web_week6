// import multer from "multer";
// import { v4 as uuidv4 } from "uuid";
// import path from "path";

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "public/images");
//   },
//   filename: (req, file, cb) => {
//     const originalName = path.parse(file.originalname).name;
//     const extension = path.extname(file.originalname);
//     const uniqueId = uuidv4();
//     const newFilename = `${originalName}_${uniqueId}${extension}`;
//     cb(null, newFilename);
//   },
// });

// const upload = multer({ storage });

// export default upload;


import multer from 'multer';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/images'); 
        
    },

    filename: (req, file, cb) => {
        const originalName = path.parse(file.originalname).name.replace(/\s+/g, '_'); 
        const extension = path.extname(file.originalname);
        const uniqueId = uuidv4();
        
        
        const newFilename = `${originalName}_${uniqueId}${extension}`;
        console.log(newFilename);
        

        cb(null, newFilename);
    }
});

const upload = multer({ storage });

export default upload;
