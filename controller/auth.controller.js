import User from "../model/user.model.js";
import bcrypt from 'bcryptjs'
import { createError } from "../error.js";
import jwt from 'jsonwebtoken';

export const Register = async(req,res,next) => {
    try {
        const { username }=req.body
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        const user = new User({
          ...req.body,
          password: hash,
          profileImg: `https://api.dicebear.com/5.x/initials/svg?seed=${username}`,
          banner: `https://api.dicebear.com/5.x/initials/svg?seed=${username}`,
        });
        await user.save();
        const { password, ...others } = user._doc;

        res.status(201).json({ message: 'User registered successfully',data:others});
    }
    catch (error) {
        next(error);
    }
    

}

export const SignIn = async (req, res,next) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user) 
        {
            return next(createError(404, 'User not Found'));
        }

        const isCorrect = await bcrypt.compare(req.body.password, user.password);
        if (!isCorrect)
        {
            return next(createError(400, 'Wrong Password !'));
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT);

        const { password, ...others } = user._doc
        
        res.cookie("access_token", token, {
            httpOnly: true,
            secure:false,
        }).status(200).json(others);
       
    }
    catch (err)
    {
        next(err);
    }
}

