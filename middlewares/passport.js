const { Strategy, ExtractJwt } = require("passport-jwt");
const { User } = require("../models");
const passport = require("passport");
const { JWT_SECRET } = process.env;
const options = {
  secretOrKey: JWT_SECRET, //เมื่อเราใช้JWTก็ต้องกำหนดSecret Key
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};
const JwtStrategy = new Strategy(options, async (payload, done) => {
  try {
    const user = await User.findOne({ where: { id: payload.id } });
    if (!user) done(null, false); //false makes error res status 401n
    done(null, user); // req.user = user
  } catch (err) {
    done(err, false);
  }
});

passport.use("jwt", JwtStrategy);
