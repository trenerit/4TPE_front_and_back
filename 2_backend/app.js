import express from 'express';
import cors from 'cors';
import mariadb from 'mariadb';

const app = express();

const port = 3000;

app.use(cors());

//Pakiet Expressa do mariadb - npm install mariadb
const pool = mariadb.createPool({

  host: '127.0.0.1',
  port: 3306,
  user: 'root',
  password: '',
  database: '4tpe'

});

// const usersTab = [
//   {id: 1, name: 'Piotr', login: 'pkania', admin: true},
//   {id: 2, name: 'Ania', login: 'anowak', admin: false},
//   {id: 3, name: 'Rafał', login: 'rafi', admin: false},
// ];

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/api/users', async (req, res) => {

  try {

    const users = await pool.query('SELECT * FROM users');
    res.json(users);


  } catch (error) {
    console.error(error);
  }

});

// app.get('/api/users', (req, res) => {
//   res.json(usersTab);
//   console.log(usersTab);
// });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});