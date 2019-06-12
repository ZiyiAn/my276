const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
  ssl: true,

});

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/db', async (req, res) => {
    try {
      const client = await pool.connect()
      const result = await client.query('SELECT * FROM Student');
      const results = { 'results': (result) ? result.rows : null};
      res.render('pages/db', results );
      client.release();
    } catch (err) {
      console.error(err);
      res.send("DB connection error: " + err);
    }
  })
  .get('/insert', async (req,res)=>{
    try{
      const client = await pool.connect()
      var query = "insert into students (name, weight, height, color, gpa) values ($1,$2,$3,$4,$5)";
      var info = [req.query.name, req.query.weight, req.query.height, req.query.color, req.query.gpa];
      await client.query(query, info, function(err){
        if (err)
          res.send("Query error " + err);
        else {
          client.release();
          console.log("insert succeed")
          //a time delay?
          res.redirect('/students.html');   
        }
      })
    } catch (err){
      console.error(err);
      res.send("DB connection error: " + err);
    }
  })

  .get('/search', async (req,res)=>{
    try{
      const client = await pool.connect()
      var query = "insert into students (name, weight, height, color, gpa) values ($1,$2,$3,$4,$5)";
      var info = [req.query.name, req.query.weight, req.query.height, req.query.color, req.query.gpa];
      await client.query(query, info, function(err){
        if (err)
          res.send("Query error " + err);
        else {
          client.release();
          console.log("student found")
          //a time delay?
          res.redirect('/students.html');   
        }
      })
    } catch (err){
      console.error(err);
      res.send("DB connection error: " + err);
    }
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
