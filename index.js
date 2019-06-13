const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  //ssl: true

});

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  // .get('/db', async (req, res) => {
  //   try {
  //     const client = await pool.connect()
  //     const result = await client.query('SELECT * FROM Student');
  //     const results = { 'results': (result) ? result.rows : null};
  //     res.render('pages/db', results );
  //     client.release();
  //   } catch (err) {
  //     console.error(err);
  //     // res.send("DB connection error: " + err);
  //     res.render('pages/error',err)
  //   }
  // })
  .get('/insert', async (req,res)=>{
    try{
      const client = await pool.connect()
      var query = "insert into student (name, gender, weight, height, haircolor, gpa) values ($1,$2,$3,$4,$5,$6)";
      var info = [req.query.name, req.query.gender, req.query.weight, req.query.height, req.query.haircolor, req.query.gpa];
      await client.query(query, info, function(err){
        if (err){
          console.log("Query error: " + err );
          // res.send("Query error: " + err);
          res.render('pages/error',{message:""+err})
      	}
        else {
          client.release();
          console.log("insert succeed")
          // res.send("Insert succeed.")
          res.render('pages/insert_succeed')
        }
        res.end()
      })
    } catch (err){
      console.error(err);
      // res.send("DB connection error: " + err );
      res.render('pages/error',{message:""+err})
    }
  })

  .get('/search', async (req,res)=>{
    try{
      const client = await pool.connect()
      var query = "select * from student where name=($1)";
      await client.query(query, [req.query.name_search], function(err,result){
        if (err || !result){
          console.log("Query error: " + err );
          res.render('pages/error',{message:(err?(""+err):"Name not match")})
        }
        else {
          client.release();
          console.log("student found")
          res.render('pages/search_update',{s:result})
        }
        res.end()
      })
    } catch (err){
      console.error(err);
      res.render('pages/error',{message:""+err})
    }
  })

  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
