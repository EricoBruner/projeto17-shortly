import { db } from "../database/database.connection.js";

export async function getAllUserShortUrls(req, res) {
  const { user_id } = res.locals;

  try {
    const { rows: userAndLinks } = await db.query(
      `
      SELECT
        users.name,
        links.*,
        (SELECT SUM(visit_count) FROM links WHERE user_id = $1) AS total_visit_count
      FROM links 
      JOIN users ON users.id = $1
      WHERE links.user_id = $1;
      `,
      [user_id]
    );

    const userAndLinksFormatted = {
      id: userAndLinks[0].user_id,
      name: userAndLinks[0].name,
      visitCount: userAndLinks[0].total_visit_count,
      shortenedUrls: userAndLinks.map((link) => ({
        id: link.id,
        shortUrl: link.short_url,
        url: link.url,
        visitCount: link.visit_count,
      })),
    };

    return res.status(200).send(userAndLinksFormatted);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
}
