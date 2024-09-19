import multer from "multer";  


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public/temp")
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })



//   multer.diskStorage(): This function defines how and where the uploaded files will be stored. We are creating a storage engine here, which tells multer to save the files on disk, and we provide two options: destination and filename.

// destination: function (req, file, cb):

// This function is used to specify the destination directory where the files will be stored.
// It takes in three arguments:
// req: The HTTP request object.
// file: The file object that is being uploaded.
// cb: A callback function used to pass the result (first parameter is for errors, second is for the destination).
// cb(null, "./public/temp"): Here, we pass null for the error, and the string "./public/temp" as the directory where the uploaded files will be stored. The files will be saved in the /public/temp directory.


// filename: function (req, file, cb):

// This function specifies the filename that will be used when saving the file to the disk.
// It also takes three arguments:
// req: The HTTP request object.
// file: The file object that is being uploaded.
// cb: A callback to pass the generated filename.
// cb(null, file.originalname): Here, we pass null for the error and the original name of the file (file.originalname) as the filename to be saved on disk. This ensures the uploaded file retains its original name.
// js
  
 export const upload = multer({ storage })