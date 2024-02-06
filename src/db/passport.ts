import fs from 'fs';
import { PassportStatic } from 'passport';
import passportJWT from 'passport-jwt';

import { UserModel } from '@/models';
import { keysConfig } from '@config/index';

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

const Passport = (passport: PassportStatic) => {
    const pathToPublicKey = keysConfig.publicKeyPath;
    const PUB_KEY = fs.readFileSync(pathToPublicKey, 'utf-8');

    const options: passportJWT.StrategyOptionsWithoutRequest = {
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: PUB_KEY,
        algorithms: ['RS256'],
    };

    passport.use(
        new JWTStrategy(options, async (jwt_payload, done) => {
            console.log(jwt_payload);

            try {
                const user = await UserModel.findOne({ _id: jwt_payload.sub });

                if (user) {
                    console.log(`User ${user.username} found in database`);
                    return done(null, user);
                } else {
                    console.log('User not found in database');
                    return done(null, false);
                }
            } catch (error) {
                console.log(error);
                return done('err', false);
            }
        })
    );
};

export default Passport;
