export const   errorHandeler = (stateCode,message)=>{
    const error = new Error();

    error.statusCode=stateCode
    error.message=message
     return error;
}