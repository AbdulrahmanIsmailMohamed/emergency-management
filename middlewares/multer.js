import multer, { diskStorage } from "multer";

const storage = multer.diskStorage({
  filename(req, file, callback) {
    callback(null, file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) cb(null, true);
  else cb(new APIError("Add Only image", 400), null);
};

let upload = multer({ fileFilter, storage });
export default upload;
