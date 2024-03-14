import multer, { diskStorage } from "multer";

// configure multer
let storage = diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/images");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + ".png");
  },
});

let upload = multer({ storage });
export default upload;
