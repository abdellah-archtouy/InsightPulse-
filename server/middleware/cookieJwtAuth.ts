import jwt from 'jsonwebtoken';
import { prisma } from '../../prisma/Client';
import { console } from 'inspector';

async function cookeiJwtAuth(req, res, next) {
    console.log(req.cookies);
    const token = req.cookies.token;
    const refreshToken = req.cookies.refreshToken;

    if (!token && !refreshToken) {
        return res.redirect('/signin');
    }

    try {
        const user = await jwt.verify(token, process.env.JWT_SECRET);
        req.user = user;
        next();
    }
    catch (accessError) {
        if (accessError.name === 'TokenExpiredError' && refreshToken) {
            try {
                const refreshUser = jwt.verify(refreshToken, process.env.JWT_SECRET);
                
                const storedToken = await prisma.refreshToken.findUnique({
                    where: { token: refreshToken }
                });

                if (!storedToken || storedToken.userId !== refreshUser.userId) {
                    throw new Error('Invalid refresh token');
                }
                const newAccessToken = jwt.sign(
                    { userId: refreshUser.userId },
                    process.env.JWT_SECRET,
                    { expiresIn: '1m' }
                );
                res.cookie('token', newAccessToken, {
                    // httpOnly: true,
                    // secure: process.env.NODE_ENV === 'production',
                    // sameSite: 'strict',
                    // maxAge: 15 * 60 * 1000 
                });

                req.user = { userId: refreshUser.userId };
                return next();
            } catch (refreshError) {
                console.log('Refresh token error:', refreshError);
                res.clearCookie('token');
                res.clearCookie('refreshToken');
                return res.redirect('/signin');
            }
        } else {
            res.clearCookie('token');
            res.clearCookie('refreshToken');
            return res.redirect('/signin');
        }
    }
}
export default cookeiJwtAuth;