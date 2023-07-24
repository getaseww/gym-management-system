import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'

dotenv.config();

export const encryptPassword = (password:string) => {
    var salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
}


