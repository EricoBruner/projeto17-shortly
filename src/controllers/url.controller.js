import { nanoid } from "nanoid";
import { db } from "../database/database.connection.js";

export async function createShortUrl(req, res) {
  const { url } = req.body;
  const { user_id } = res.locals;

  try {
    const short_url = nanoid(12);

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

export async function getOneShortUrl(req, res) {
  const { id } = req.params;

  try {
    const {
      rows: [link],
    } = await db.query(
      `SELECT id, short_url AS "shortUrl", url FROM links WHERE id=$1`,
      [id]
    );

    if (!link) return res.status(404).send({ message: "Url não encontrada!" });

    return res.status(200).send(link);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
}

export async function openShortUrl(req, res) {
  const { shortUrl } = req.params;

  try {
    const {
      rows: [link],
    } = await db.query(
      `UPDATE links SET visit_count = visit_count + 1 WHERE short_url=$1 RETURNING url;`,
      [shortUrl]
    );

    if (!link) {
      return res.status(404).send({ message: "Url encurtada não encontrada!" });
    }

    return res.redirect(link.url);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
}

export async function deleteShortUrl(req, res) {
  const { id } = req.params;
  const { user_id } = res.locals;

  try {
    const {
      rows: [link],
    } = await db.query(`SELECT * FROM links WHERE id=$1`, [id]);

    if (!link) {
      return res.status(404).send({ message: "Url encurtada não encontrada!" });
    }

    if (link.user_id != user_id) {
      return res
        .status(401)
        .send({ message: "Essa url encurtada não pertence a esse usuário!" });
    }

    await db.query("DELETE FROM links WHERE id=$1", [id]);

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
}
