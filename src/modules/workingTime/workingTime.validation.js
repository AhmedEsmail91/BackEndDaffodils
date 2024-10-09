import Joi from "joi"
const addWorkingTimeVal = Joi.object({ 
    from: Joi.date().required(),
    to: Joi.date().required(),
    repeat:Joi.number().min(1).max(4).optional()
})
const changeWorkingTimeVAl = Joi.object({
    id:Joi.string().hex().length(24).required(),
    day: Joi.string().optional(),
    startTime: Joi.date().optional(),
    endTime: Joi.date().optional()
})

export {
    addWorkingTimeVal,
    changeWorkingTimeVAl
}