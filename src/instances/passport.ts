import * as passport from 'passport';
import { ExtractJwt } from 'passport-jwt';
import * as passportJWT from 'passport-jwt';
import { User } from '../models';

const Strategy = passportJWT.Strategy;

const params = {
    secretOrKey: 'feed',
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('JWT')
};

passport.use(new Strategy(params, (payload, done) => {
    console.log(payload, "passport.js");
    User.findOne({
        where: {
            name: payload
        }
    }).then(result => done(null, { name: result.name })).catch(err => done(err, null));
}));
