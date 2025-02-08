// const multer = require('multer');
// const fs = require('fs');

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         console.log({ file, body: req.body, param: req.params });
//         let url = `./uploads/images`;
//         createFolder(url);
//         cb(null, url);
//     },
//     filename: function (req, file, cb) {
//         cb(null, new Date().toISOString() + file.fieldname + file.originalname);
//     },
// });

// const createFolder = (path) => {
//     try {
//         if (!fs.existsSync(path)) {
//             fs.mkdirSync(path, { recursive: true });
//             console.log('Directory is created.');
//         } else {
//             console.log('Directory already exists.');
//         }
//     } catch (err) {
//         console.log(err);
//     }
// };
const multer = require('multer');
const fs = require('fs');

// Function to create a folder if it doesn't exist
const createFolder = (path) => {
    try {
        if (!fs.existsSync(path)) {
            fs.mkdirSync(path, { recursive: true });
            console.log('Directory is created.');
        } else {
            console.log('Directory already exists.');
        }
    } catch (err) {
        console.log(err);
    }
};

// Multer storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log({ file, body: req.body, param: req.params });
        let url = `./uploads/images`;
        createFolder(url); // Ensure the folder exists
        cb(null, url); // Set the destination folder
    },
    filename: function (req, file, cb) {
        // Fix the timestamp to remove invalid characters (replace ':' with '-')
        const timestamp = new Date().toISOString().replace(/:/g, '-');
        cb(null, `${timestamp}-${file.fieldname}-${file.originalname}`); // Generate the filename
    },
});

// File filter to restrict file types (only JPEG and PNG)
const fileFilter = (req, file, cb) => {
    console.log(file);
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true); // Accept file
    } else {
        cb(null, false); // Reject file
    }
};

// Multer upload configuration with file size limit
exports.upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 1024000, // Set file size limit (1MB)
    },
});


// const fileFilter = (req, file, cb) => {
//     console.log(file);
//     if (
//         file.mimetype === 'image/jpeg' ||
//         file.mimetype === 'image/png'
//     ) {
//         cb(null, true);
//     } else {
//         cb(null, false);
//     }
// };

// exports.upload = multer({
//     storage: storage,
//     fileFilter: fileFilter,
//     limits: {
//         fileSize: 1024000
//     }
// })