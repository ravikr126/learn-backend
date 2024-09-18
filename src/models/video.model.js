// Importing mongoose and Schema constructor from mongoose
import mongoose, { Schema } from "mongoose";

// Importing the pagination plugin for paginating aggregate queries
import mongooseAggregatePaginate from 'mongoose-paginate-v2';

// Defining the schema for the Video model
const videoSchema = new Schema(
  {
    // URL of the video file, typically stored on a cloud platform like Cloudinary
    videofile: {
      type: String,  // Video file stored as a string (URL)
      required: true,  // Video file is mandatory
    },
    // URL of the thumbnail image for the video
    thumbnail: {
      type: String,  // Thumbnail URL as a string
      required: true,  // Thumbnail is mandatory
    },
    // Title of the video
    title: {
      type: String,  // Title of the video
      required: true,  // Title is mandatory
    },
    // Description of the video content
    description: {
      type: String,  // Description as a string
      required: true,  // Description is mandatory
    },
    // Duration of the video in seconds or minutes
    duration: {
      type: Number,  // Duration stored as a number (in seconds/minutes)
      required: true,  // Duration is mandatory
    },
    // Number of views for the video
    views: {
      type: Number,  // Views stored as a number
      default: 0,  // Default value is 0 (no views initially)
    },
    // Boolean flag indicating whether the video is published or not
    isPublished: {
      type: Boolean,  // Publish status
      default: true,  // By default, the video is published
    },
    // Reference to the user who owns (uploaded) the video
    owner: {
      type: Schema.Types.ObjectId,  // Foreign key reference to the User model
      ref: "User",  // Reference to the User collection in MongoDB
    },
  },
  {
    // Automatically add `createdAt` and `updatedAt` timestamps to the document
    timestamps: true,
  }
);

// Add pagination capability to the video schema using mongoose-paginate-v2
videoSchema.plugin(mongooseAggregatePaginate);

// Exporting the Video model, which is based on the videoSchema
export const Video = mongoose.model("Video", videoSchema);





















// Explanation of the Flow and Pattern
// Flow Overview:
// 1. Video Creation:

// A user uploads a video file, along with a thumbnail, title, description, and duration.
// The video is saved to a database using MongoDB, referencing the file hosted on a cloud platform (e.g., Cloudinary).

// 2. Video Attributes:

// Each video has attributes like videofile, thumbnail, title, description, duration, views, and isPublished.
// The owner is a reference to the user who uploaded the video, linking to the User schema.
// 3. Timestamps:

// Mongoose automatically adds createdAt and updatedAt timestamps to each video document.
// 4. Pagination:

// The mongooseAggregatePaginate plugin allows paginated queries on the video collection. This is useful for efficiently fetching large numbers of videos.




//Summary:
// This schema defines a Video model that stores information about video uploads (e.g., title, description, duration, views) and allows querying with pagination. Each video has a reference to its uploader (the owner, a user) and is managed with timestamps. The model can be expanded to manage video content in applications such as video streaming platforms.