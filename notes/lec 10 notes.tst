import multer from "multer";  

This line imports the multer library, which is a middleware for handling multipart/form-data, primarily used for file uploads in Node.js. It makes file uploads easy by handling the details of how files are received and stored.
js


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public/temp")
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })




=> multer.diskStorage(): This function defines how and where the uploaded files will be stored. We are creating a storage engine here, which tells multer to save the files on disk, and we provide two options: destination and filename.

=>destination: function (req, file, cb):

        This function is used to specify the destination directory where the files will be stored.
        
        It takes in three arguments:
                req: The HTTP request object.
                file: The file object that is being uploaded.
                cb: A callback function used to pass the result (first parameter is for errors, second is for the destination).
        
        cb(null, "./public/temp"): Here, we pass null for the error, and the string "./public/temp" as the directory where the uploaded files will be stored. The files will be saved in the /public/temp directory.

=> filename: function (req, file, cb):

        This function specifies the filename that will be used when saving the file to the disk.
        
        It also takes three arguments:
            req: The HTTP request object.
            file: The file object that is being uploaded.
            cb: A callback to pass the generated filename.
        
        cb(null, file.originalname): Here, we pass null for the error and the original name of the file (file.originalname) as the filename to be saved on disk. This ensures the uploaded file retains its original name.




  
 export const upload = multer({ storage })



=> This line exports an upload middleware that uses the multer function with the defined storage engine.
    multer({ storage }): This configures multer to use the custom storage we defined earlier, meaning any file uploaded will be stored in the /public/temp directory with its original filename.

In summary:

    Files will be uploaded to the ./public/temp folder.
    Files will be saved with their original names.
    The upload middleware can be used in routes to handle file uploads.


    then i work on cloudinary , the code is given by cloudinary so i cant write here





Here's a breakdown of the code:

1️⃣ Cloudinary Configuration:


 code =====
            import { v2 as cloudinary } from "cloudinary";
            import fs from "fs";

            cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
            });

This part imports the necessary modules and configures Cloudinary using environment variables for security.
Make sure to have your Cloudinary credentials stored in .env file:
                        CLOUDINARY_CLOUD_NAME
                        CLOUDINARY_API_KEY
                        CLOUDINARY_API_SECRET


2️⃣ Upload Function:


code:    
                    const uploadOnCloudinary = async (localFilePath) => {
                    try {
                        if (!localFilePath) return null;
                        // Upload the file to Cloudinary
                        const response = await cloudinary.uploader.upload(localFilePath, {
                        resource_type: "auto",
                        });
                        console.log("File is uploaded on Cloudinary", response.url);
                        return response;
                    } catch (error) {
                        fs.unlinkSync(localFilePath); // Delete the local file if upload fails
                        return null;
                    }
                    };


Explanation:
    uploadOnCloudinary function:
    Takes in a localFilePath as the file to upload to Cloudinary.

    Upload Process:
    The file is uploaded using cloudinary.uploader.upload, with resource_type: "auto" to handle any file type (image, video, etc.).

    Error Handling:
    If an error occurs during the upload process, the temporary file (saved locally) is deleted using fs.unlinkSync().

Summary:
This function uploads a file to Cloudinary.
If the upload is successful, the URL of the uploaded file is logged.
If it fails, the locally stored file is removed to clean up.














