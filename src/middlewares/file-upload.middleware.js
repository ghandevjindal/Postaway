import multer from 'multer';
import path from 'path';
import fs from 'fs';

const __filename = new URL(import.meta.url).pathname;
let __dirname = path.dirname(__filename).replace(/^file:\/\//, '').replace(/\//g, '\\');
__dirname = __dirname.replace(/src\\middlewares$/, '');
__dirname = decodeURIComponent(__dirname);
const uploadDir = path.join(__dirname, 'uploads').replace(/\C:\\/,'');

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storageConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const name = Date.now() + '-' + file.originalname;
    const filePath = path.join(uploadDir, name); // Full file path
    req.filePath = 'C:'+filePath; // Store the file path in req
    cb(null, name);
  },
});

export const uploadFile = multer({storage: storageConfig});
