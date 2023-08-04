import { nanoid } from "nanoid";
import { db } from "../database/database.connection.js";

export async function createShortUrl(req, res) {
  const { url } = req.body;
  const { user_id } = res.locals;

  try {
    const randon_value = nanoid(15);
    const short_url = `${req.protocol}://${req.headers.host}/urls/open/${randon_value}`;

    const {
      rows: [{ id }],
    } = await db.query(
      "INSERT INTO links (url, short_url, visit_count, user_id) VALUES ($1,$2,$3,$4) RETURNING id;",
      [url, short_url, 0, user_id]
    );

    return res.status(201).send({ id: id, shortUrl: short_url });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
}
