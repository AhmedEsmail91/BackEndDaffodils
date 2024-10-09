import { catchError } from "../../middlewares/catchError.js"
import AppError from "../../utils/AppError.js";

export const deleteOne=(model)=>{
    return catchError(async(req,res,next)=>{
        const Document = await model.findByIdAndDelete(req.params.id,{new:true});
        !Document && next(new AppError("Document not found",404));
        Document && res.status(200).json({message: "success", Document:Document});
    })
} 