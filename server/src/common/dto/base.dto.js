import Joi from "joi";

class BaseDto{
    static schema=Joi.object({})//jo bhi schma lega usko overwrite krdegan ye 

    static validate(data){
        const {error,value}=this.schema.validate(data,{
            abortEarly:false,//ye pehle error pe hi pause kr deta isliye false krdiya 

            stripUnknown:true// only asked field req remove all other fields

        })
        if(error){
            const error=error.details.map((d)=>d.message)
            return {errors,value:null}
        }
        return {error:null,value}
    }
}