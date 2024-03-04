const { User, validate } = require('../models/user');
const bcrypt = require('bcrypt');

exports.signup = async (req, res) => {
    try {
        const {error} = validate(req.body);
        if (error)
            return res.status(400).send({ message: error.details[0].message});
        const existing = User.findOne({ email: req.body.email });
        if (existing)
            return res.status(409).send({ message: "email already signed up to another account"});
        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        const savedUser = await new User({ ...req.body, password: hashedPassword }).save();
        res.status(200).send({ message: "Signed up successfuly !"});
    } catch (error) {
        res.status(500).send({ message: 'An error has occured when signing up' });
    }
};
