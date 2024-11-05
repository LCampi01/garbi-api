const {User: Model} = include('models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Crud = require('./crud');
const {SECRET} = process.env;
const {pool} = require('../database/connection');
class UserService extends Crud {
    constructor() {
        super(Model);
        this.register = this.register.bind(this);
        this.changePassword = this.changePassword.bind(this);
        this.authenticate = this.authenticate.bind(this);
        this.validateToken = this.validateToken.bind(this);
    }

    async register(user) {
        const { email, password } = user;
        const hash = await bcrypt.hash(password, 4);
        
        const query = `
            INSERT INTO user (companyId, name, surname, personalPhone, personalEmail, companyPhone, companyEmail, password, imagePath, workingShift, role)
            VALUES (${user.companyId}, '${user.name}', '${user.surname}', '${user.personalPhone}', '${user.personalEmail}', '${user.companyPhone}', '${user.companyEmail}', '${hash}', '${user.imagePath}', '${user.workingShift}', '${user.role}');
        `;
    
        const result = await pool.query(query);
    
        return {
            token: jwt.sign({ email }, SECRET, { expiresIn: '1d' }),
            user: result,
            success: true,
            message: 'AUTHENTICATED'
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
        const response = {};
        const query = `
            SELECT id AS _id, companyId, name, surname, personalPhone AS phone, personalEmail AS email, role, termsAndConditions, password
            FROM user
            WHERE personalEmail = '${email}';
        `;
    
        const [rows] = await pool.query(query);
    
        if (rows.length > 0) {
            const user = rows;
            response.user = user;
            const isMatch = await bcrypt.compare(password, user[0].password);

            if(isMatch) {

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
                const token = jwt.sign(payload, SECRET, { expiresIn: '1d' })

                response.token = token;
                response.success = true;
                response.message = 'AUTHENTICATED';

            } else {
                response.message = 'WRONG PASSWORD',
                response.success = false;
            }
        } else {
            response.success = false;
            response.message = 'UNAUTHENTICATED'
        }
        return response;
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
