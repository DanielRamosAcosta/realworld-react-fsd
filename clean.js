import mariadb from 'mariadb';

const connection = await mariadb.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_PORT || 'root',
  password: process.env.DB_USERNAME || 'password',
  database: process.env.DB_PASSWORD || 'conduit',
  port: parseInt(process.env.DB_DATABASE || '3306'),
});

await connection.beginTransaction();
await connection.query(`DELETE FROM article;`);
await connection.query(`DELETE FROM comment;`);
await connection.query(`DELETE FROM tag;`);
await connection.query(`DELETE FROM user;`);
await connection.query(`DELETE FROM user_favorites;`);
await connection.query(`DELETE FROM user_to_follower;`);
await connection.commit();
await connection.end();
