import mariadb from 'mariadb';

const connection = await mariadb.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'conduit',
  port: 3306,
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
