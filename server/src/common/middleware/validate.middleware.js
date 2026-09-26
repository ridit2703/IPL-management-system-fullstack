import ApiError from "../utils/api-error";

const validate=(Dtoclass)=>{
    return (req,res,next)=>{
        const {errors,value}=Dtoclass.validate(req.body)

        if(errors){
            throw new ApiError.badRequest(errors)
        }
        req.body=value;
        next()

    }
}

export default value