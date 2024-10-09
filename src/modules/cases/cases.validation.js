import Joi from "joi"
const imageValidator = Joi.array().items(Joi.object({
    fieldname: Joi.string().required(),
    originalname: Joi.string().required(),
    encoding: Joi.string().required(),
    mimetype: Joi.string().valid('image/jpeg', 'image/png','image/jpg'),
    size: Joi.number().max(10485760),
    destination: Joi.string().required(),
    filename: Joi.string().required(),
    path: Joi.string()
}))

const addCase = Joi.object({ 
    title: Joi.string().min(2).max(20).required(),
    description: Joi.string().min(2).max(20).required(),
    before: imageValidator.required(),
    after: imageValidator.required(),
    thumbnail: imageValidator.required(),
});
const updateCase = Joi.object({
    id:Joi.string().hex().length(24).required(),
    title: Joi.string().min(2).max(20).optional(),
    description: Joi.string().min(2).max(20).optional(),
    before: imageValidator.optional(),
    after: imageValidator.optional(),
    thumbnail: imageValidator.optional(),
})

export {
    addCase,
    updateCase
}