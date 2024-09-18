class ApiResponse {
    // The constructor is called when an instance of ApiResponse is created.
    constructor(statusCode, data, message="Success") {
        // Assigns the provided statusCode (typically an HTTP status code) to the instance's statusCode property.
        this.statusCode = statusCode;

        // Assigns the provided data (the actual response data) to the instance's data property.
        this.data = data;

        // Assigns the provided message, defaulting to "Success" if no message is passed, to the instance's message property.
        this.message = message;

        // Determines if the request was successful by checking if the statusCode is less than 400.
        // If the status code is 200–399, success will be true, otherwise, it will be false.
        this.success = statusCode < 400;
    }
}
