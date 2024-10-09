export default class validation {
    imgValidator = Joi.array().items(Joi.object({
        fieldname: Joi.string().required(),
        originalname: Joi.string().required(),
        encoding: Joi.string().required(),
        mimetype: Joi.string().valid('image/jpeg', 'image/png','image/jpg'),
        size: Joi.number().max(10485760),
        destination: Joi.string().required(),
        filename: Joi.string().required(),
        path: Joi.string()
    }))
    titleValidator = Joi.string().min(2).max(20);
    descriptionValidator = Joi.string().min(2).max(20);
    nameValidator = Joi.string().min(2).max(20);
    idValidator = Joi.string().hex().length(24);
    emailValidator = Joi.string().email();
    passwordValidator = Joi.string().pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)
    rePasswordValidator = Joi.valid(Joi.ref('password'));
    roleValidator =(...roles)=> Joi.string().valid(...roles);
    


}