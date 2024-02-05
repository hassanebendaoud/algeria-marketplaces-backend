import passportJWT from "passport-jwt";
import fs from "fs";
import path from "path";
import { User } from "../models/User.model";
import { UserInterface } from "../interfaces/User.interface";
import { keysConfig } from "../config/keys.config";

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

const Passport = (passport: any) => {
  const pathToPublicKey = keysConfig.publicKeyPath;
  const PUB_KEY = fs.readFileSync(pathToPublicKey, "utf-8");

  const options: passportJWT.StrategyOptionsWithoutRequest = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: PUB_KEY,
    algorithms: ["RS256"],
  };

  passport.use(
    new JWTStrategy(options, async (jwt_payload, done) => {
      console.log(jwt_payload);

      try {
        const user = await User.findOne({ _id: jwt_payload.sub });

        if (user) {
          console.log(`User ${user.username} found in database`);
          return done(null, user);
        } else {
          console.log(`User not found in database`);
          return done(null, false);
        }
      } catch (error) {
        console.log(error);
        return done("err", false);
      }
    })
  );
};

export default Passport;