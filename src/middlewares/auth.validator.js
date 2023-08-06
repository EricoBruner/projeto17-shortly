import { signInSchema, signUpSchema } from "../schemas/auth.schemas.js";
import { schemaValidator } from "../validators/schema.validator.js";

export function authValidator(req, res, next) {
  const user = { ...req.body };
  const path = req.url;

  if (path == "/signup") {
    const error = schemaValidator(signUpSchema, user);
    if (error) return res.status(422).send({ message: error });

    if (user.password != user.confirmPassword) {
      return res.status(422).send({ message: "As senhas não são iguais!" });
    }

    next();
  }

  if (path == "/signin") {
    const error = schemaValidator(signInSchema, user);
    if (error) return res.status(422).send({ message: error });

    next();
  }
}
