 const asyncHandler = (requestHandler) =>{

    (req,res,next ) =>{
        Promise.resolve(requestHandler(req,res, next)). catch((err)=> next(err))
    }

}

export { asyncHandler };



// 2. try catch method


// const asyncHandler = () =>{}
// const asyncHandler = (fn) => ()=>{}
// const asyncHandler = (fn) => async()=>{}

//higher order function

// const asyncHandler = (fn) => async (req, res, next) => {
//   try {
//     await fn(req, res, next);
//   } catch (error) {
//     res.status(err.code || 500).json({
//       success: false,
//       message: err.message,
//     });
//   }
// };
