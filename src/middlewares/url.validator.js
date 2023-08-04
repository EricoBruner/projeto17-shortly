import { urlSchema } from "../schemas/url.schema.js";
import { schemaValidator } from "../validators/schema.validator.js";

export default async function urlValidator(req, res, next) {
  const { url } = req.body;

  const error = schemaValidator(urlSchema, { url });
  if (error) return res.status(422).send({ message: error });

  next();
}
