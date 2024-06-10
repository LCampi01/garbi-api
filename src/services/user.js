const {User: Model} = include('models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Crud = require('./crud');

const {SECRET} = process.env;
class UserService extends Crud {
    constructor() {
        super(Model);
        this.register = this.register.bind(this);
        this.changePassword = this.changePassword.bind(this);
        this.authenticate = this.authenticate.bind(this);
        this.validateToken = this.validateToken.bind(this);
    }

    async register(user) {
        const {email, password} = user;
        const hash = await bcrypt.hash(password, 13);
        if(hash) {
            await this.saveOne({}, {
                ...user,
                password: hash
            });
            return {
                token: jwt.sign({email}, SECRET, {expiresIn: '1d'}),
                success: true,
                message: 'AUTHENTICATED'
            };
        }
        return {
            token: null,
            success: false,
            message: 'Fail on user registration'
        };
    }

    async changePassword(email, oldPassword, newPassword) {
        const user = await this.fetchOne({email});
        if (user) {
            const {password: userPassword} = user;
            const isMatch = await bcrypt.compare(oldPassword, userPassword);
            if (isMatch) {
                const hash = await bcrypt.hash(newPassword, 13);
                if (hash) {
                    const updatedUser = await this.saveOne(
                        { email },
                        { $set: { password: hash } }
                    );
                    if (updatedUser) {
                        return {
                            success: true,
                            message: 'Password updated successfully'
                        };
                    } else {
                        return {
                            success: false,
                            message: 'Failed to update password'
                        };
                    }
                } else {
                    return {
                        success: false,
                        message: 'Failed to hash the new password'
                    };
                }
            } else {
                return {
                    success: false,
                    message: 'Old password is incorrect'
                };
            }
        } else {
            return {
                success: false,
                message: 'User not found'
            };
        }
    }

    async authenticate(email, password) {
        const user = await this.fetchOne({email});
        if(user) {
            const {password: userPassword} = user;
            const isMatch = await bcrypt.compare(password, userPassword);
            const payload = {
                user: {
                    _id: user._id,
                    companyId: user.companyId,
                    name: user.name,
                    surname: user.surname,
                    phone: user.phone,
                    email: user.email,
                    role: user.role,
                    termsAndConditions: user.termsAndConditions
                }
            };
            if(isMatch)
                return {
                    token: jwt.sign(payload, SECRET, {expiresIn: '1d'}),
                    termsAndConditions: user.termsAndConditions,
                    success: true,
                    message: 'AUTHENTICATED'
                };
            return {
                token: null,
                success: false,
                message: 'WRONG PASSWORD'
            };
        }
        return {
            token: null,
            success: false,
            message: 'UNAUTHENTICATED'
        };
    }

    async validateToken(bearerToken) {
        try {
            const token = bearerToken.replace('Bearer ', '');
            const user = await jwt.verify(token, SECRET);
            return { success: true, ...user };
        } catch (err) {
            throw Error(err);
        }
    }
}

module.exports = new UserService();
