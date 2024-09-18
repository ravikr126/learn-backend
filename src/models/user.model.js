// This code defines a User schema using Mongoose for a MongoDB database, along with methods for handling password hashing, token generation, and user authentication.



import mongoose, { Schema } from "mongoose"; // Import mongoose and Schema to define MongoDB schemas.
import jwt from "jsonwebtoken";  // Import JSON Web Token (JWT) for token generation and authentication.
import bcrypt from "bcrypt";     // Import bcrypt for hashing and comparing passwords.

// Define a Mongoose schema for a `User` model.
const userSchema = new Schema(
  {
    // `username` field with constraints for uniqueness, required, lowercase, and trimming of whitespace.
    username: {
      type: String,
      required: true,
      unique: true,
      lowecase: true,  // Typo: should be "lowercase".
      trim: true,
      index: true,     // Index for faster querying.
    },
    
    // `email` field, unique and required, with lowercase and trimming options.
    email: {
      type: String,
      required: true,
      unique: true,
      lowecase: true,  // Typo: should be "lowercase".
      trim: true,
    },
    
    // `fullname` field, required, with lowercase, trimming, and indexing for faster querying.
    fullname: {
      type: String,
      required: true,
      lowecase: true,  // Typo: should be "lowercase".
      trim: true,
      index: true,
    },

    // `avatar` field, which stores the URL of the user's profile picture (required).
    avatar: {
      type: String, // Cloudinary URL (or another storage service).
      required: true,
    },

    // `coverImage` field, which stores the URL of the user's cover image (optional).
    coverImage: {
      type: String,
    },

    // `watchHistory` is an array of video references, linking the user to videos they have watched.
    watchHistory: [
      {
        type: Schema.Types.ObjectId, // Each entry references an ObjectId from the `Video` model.
        ref: "Video",                // Refers to the `Video` collection in the database.
      },
    ],

    // `password` field, required and will be hashed before being saved.
    password: {
      type: String,
      required: [true, "Password is required"],
    },

    // `refreshToken` field, which stores the user's refresh token (optional).
    refreshToken: {
      type: String,
    },
  },
  {
    // Enable automatic creation of `createdAt` and `updatedAt` timestamps.
    timestamps: true,
  }
);

// Pre-save middleware to hash the password before saving the user document to the database.
userSchema.pre("save", async function (next) {
  // If the password field hasn't been modified, move to the next middleware.
  if (!this.isModified("password")) {
    return next();  // Corrected from `return next;` to `return next();`
  }

  // Hash the password using bcrypt with a salt rounds value of 10.
  this.password = await bcrypt.hash(this.password, 10);
  next(); // Call the next middleware in the stack.
});

// Instance method to compare a given password with the hashed password in the database.
userSchema.methods.isPasswordCorrect = async function (password) {
  // Return true if the passwords match, otherwise false.
  return await bcrypt.compare(password, this.password);
};

// Instance method to generate an access token for the user.
userSchema.methods.generateAccessToken = function () {
  // Create a JWT with the user's details, signed with a secret key and an expiration time.
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
      fullname: this.fullname,
    },
    process.env.ACCESS_TOKEN_SECRET,  // Secret key for access tokens.
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,  // Expiry duration for the access token.
    }
  );
};

// Instance method to generate a refresh token for the user.
userSchema.methods.generateRefreshToken = function () {
  // Create a JWT refresh token with the user's ID, signed with a secret key and an expiration time.
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,  // Secret key for refresh tokens.
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,  // Expiry duration for the refresh token.
    }
  );
};

// Export the `User` model based on the userSchema, to be used in other parts of the application.
export const User = mongoose.model("User", userSchema);













// Flow Overview:
//1.  User Creation (Registration):

// User provides information (username, email, password).
// Password is hashed using bcrypt before saving.
// User is saved in the database with the hashed password.
// 2. Login:

// User provides credentials (username/email + password).
// Password is compared with the stored hashed password using bcrypt.
// If valid, JWT access token and refresh token are generated.

//3. Accessing Protected Resources:

// User sends access token in the request header to access resources.
// Token is verified; if valid, access is granted.
// 4.Token Refresh:

// If the access token expires, the user sends refresh token to get a new access token.



// Summary of Flow:
// Registration: Hash password, save user.
// Login: Validate credentials, generate tokens.
// Protected Route: Send access token, verify, allow access.
// Token Expiry: Refresh token used to generate new access token.