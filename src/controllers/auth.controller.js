import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import { db } from "../database/database.connection.js";

export async function signUp(req, res) {
  const { name, email, password } = req.body;

  try {
    const encryptedPassword = bcrypt.hashSync(password, 10);
    const user = { name, email, password: encryptedPassword };

    await db.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3)",
      [user.name, user.email, user.password]
    );

    return res.sendStatus(201);
  } catch (err) {
    const duplicateEmailMessage = `duplicate key value violates unique constraint "users_email_key"`;

    if (err.message == duplicateEmailMessage) {
      res.status(409).send({ message: "Já possui uma conta com esse email!" });
      return;
    }

    return res.status(500).send({ message: err.message });
  }
}

export async function signIn(req, res) {
  const { email, password } = req.body;

  const login = { email, password };

  try {
    const token = uuid();

    const error = loginValidator(login);
    if (error) return res.status(422).send(error);

    const user = await db.collection("users").findOne({ email });
    if (!user) return res.status(404).send("Usuario não encontrado!");

    if (!bcrypt.compareSync(password, user.password))
      return res.status(401).send("Usuario ou senha incorretas!");

    await db.collection("sessions").deleteOne({ userId: user._id });
    await db.collection("sessions").insertOne({ userId: user._id, token });

    return res.status(200).json({ token: token, user: user.name });
  } catch (err) {
    return res.status(500).send(err.message);
  }
}
