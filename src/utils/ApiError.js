// Define a custom error class `ApiError` which extends the built-in `Error` class.
class ApiError extends Error {
    // The constructor is the method that gets called when a new instance of `ApiError` is created.
    constructor(
      statusCode,         // Accepts a `statusCode` parameter (usually an HTTP status code like 404, 500, etc.).
      message = "Something went wrong",  // Accepts a `message` parameter with a default value of "Something went wrong".
      errors = [],        // Accepts an `errors` array, default is an empty array (can be used to store additional error details).
      statck = ""         // Accepts a `statck` (should be `stack`), with a default empty string (will be used to store error trace).
    ) {
      // Calls the parent class (`Error`) constructor with the `message`.
      super(message);
      
      // Assign the provided `statusCode` to the `statusCode` property of this instance.
      this.statusCode = statusCode;
  
      // Initialize `data` property to `null` (could be used later to store additional error-related data).
      this.data = null;
  
      // Assign the provided `message` to the `message` property of this instance.
      this.message = message;
  
      // Set `success` to `false` (this indicates that the API request has failed).
      this.success = false;
  
      // Assign the provided `errors` array to the `errors` property of this instance.
      this.errors = errors;
  
      // Check if the `statck` (should be `stack`) parameter is provided.
      if(statck){
        // If provided, assign it to the `stack` property (a string representing where the error occurred).
        this.stack = statck;
      } else {
        // If no stack is provided, automatically capture the stack trace (this is standard behavior for errors).
        Error.captureStackTrace(this, this);  // `this` ensures the stack trace doesn't include the constructor call.
      }
    }
  }
  

