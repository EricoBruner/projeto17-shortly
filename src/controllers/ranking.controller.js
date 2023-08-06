import { db } from "../database/database.connection.js";

export async function getRanking(req, res) {
  try {
    const { rows: ranking } = await db.query(`
      SELECT 
        users.id,
        users.name, 
        COUNT(links.short_url) AS "linksCount",
        COALESCE(SUM(links.visit_count), 0) AS "visitCount"
      FROM users
      LEFT JOIN links ON links.user_id = users.id
      GROUP BY users.id
      ORDER BY "visitCount" DESC
      LIMIT 10;
    `);

    return res.status(200).send(ranking);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
}
