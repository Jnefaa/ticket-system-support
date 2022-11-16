
const Joi = require ("joi")

const email = Joi.string().email({
    minDomainSegments :2, 
    tlds: {allow:["com","net","tn","fr"]}

    
})
const pin = Joi.number().min(000000).max(999999).required(); 
const newpassword = Joi.string().min(3).max(200).required()
const phone = Joi.number().min(2000000).max(99999999)
const shortStr = Joi.string().min(3).max(200).required()
const longStr = Joi.string().min(10).max(5000).required()
const dt = Joi.date();
const resetPassReqValidation = (req, res, next) => {
	const schema = Joi.object({ email });

	const value = schema.validate(req.body);
	
	if (value.error) {
		return res.json({ status: "error", message: value.error.message });
	}
	next();
};

const updatePassValidation = (req, res, next) => {
	const schema = Joi.object({ email, pin, newpassword });
     console.log(schema)
	const value = schema.validate(req.body);
	if (value.error) {
		return res.json({ status: "error", message: value.error.message });
	}
	next();
};


const createNewTicketValidation = (req, res, next) => {
	const schema = Joi.object({
		subject: shortStr.required(),
		sender: shortStr.required(),
		message: longStr.required(),
		issueDate: dt.required(),
	});

	//console.log(req.body);
	const value = schema.validate(req.body);
	console.log(value);

	if (value.error) {
		return res.json({ status: "error", message: value.error.message });
	}

	next();
};
const replyTicketMessageValidation = (req, res, next) => {
	const schema = Joi.object({
		sender: shortStr.required(),
		message: longStr.required(),
	});

	//console.log(req.body);
	const value = schema.validate(req.body);

	if (value.error) {
		return res.json({ status: "error", message: value.error.message });
	}

	next();
};




const NewUserValidation = (req, res, next) => {
	const schema = Joi.object({
		name  :shortStr.required() , 
		phone : phone.required(),
		email :shortStr.required(),
		password :shortStr.required()
	});

	
	const value = schema.validate(req.body);
    
	if (value.error) {
		return res.json({ status: "error", message: value.error.message });
		return  console.log(value);
	}

	next();
};

module.exports = { 
    resetPassReqValidation,
    updatePassValidation,
	createNewTicketValidation,
	replyTicketMessageValidation,
	NewUserValidation,
}