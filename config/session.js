import session from "express-session"
import MongoStore from "connect-mongo"

const sessionConfig = {
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_CONNECTION,
    ttl: 14 * 24 * 60 * 60, // // 14 days
  }),
  cookie: {
    maxAge: 1000 * 60 * 60 * 24,
    httpOnly: true,
  },
}

export default sessionConfig
