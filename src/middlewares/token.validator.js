import { db } from "../database/database.connection.js";

export default async function tokenValidator(req, res, next) {
  const { authorization } = req.headers;

  const token = authorization?.replace("Bearer ", "");

  if (!token) return res.status(401).send({ message: "Token inválido!" });

  const {
    rows: [session],
  } = await db.query("SELECT * FROM sessions WHERE token=$1", [token]);

  if (!session) return res.status(401).send({ message: "Token inválido!" });

  res.locals.user_id = session.user_id;

  next();
}
