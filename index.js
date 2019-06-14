const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true

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
          res.render('pages/succeed',{message:"Insert"})
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
        if (err || !result.rows[0]){
          if(err)console.log("Query error: " + err );
          else console.log("result returned: " + result.rows[0] + " searched name: " + req.query.name_search);

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


  .get('/edit', async (req,res)=>{
  	if(req.query.Update){
	    try{
	      const client = await pool.connect()
	      var query = "update student set name=($2), gender=($3), weight=($4), height=($5), haircolor=($6), gpa=($7) where name=($1)";
	      var info = [req.query.name_old, req.query.name, req.query.gender, req.query.weight, req.query.height, req.query.haircolor, req.query.gpa];
	      await client.query(query, info, function(err,result){
	        if (err){
	          console.log("Query error: " + err );
	          res.render('pages/error',{message:(err?(""+err):"Unable to update")})
	        }
	        else {
	          client.release();
	          console.log("student updated")
	          res.render('pages/succeed',{message:"Update"})
	        }
	        res.end()
	      })
	    } catch (err){
	      console.error(err);
	      res.render('pages/error',{message:""+err})
	    }
	}
	else if(req.query.Delete){
		try{
	      const client = await pool.connect()
	      var query = "delete from student where name=($1)";
	      var info = [req.query.name_old];
	      await client.query(query, info, function(err,result){
	        if (err){
	          console.log("Query error: " + err );
	          res.render('pages/error',{message:(err?(""+err):"Unable to delete")})
	        }
	        else {
	          client.release();
	          console.log("student delete")
	          res.render('pages/succeed',{message:"Delete"})
	        }
	        res.end()
	      })
	    } catch (err){
	      console.error(err);
	      res.render('pages/error',{message:""+err})
	    }
	}
  })


  .get('/display', async (req,res)=>{
    try{
      const client = await pool.connect()
      var query = "select * from student";
      await client.query(query, function(err,result){
        if (err || !(result.rows[0])){
          console.log("Query error: " + err );
          res.render('pages/error',{message:(err?(""+err):"Unable to display.Table empty?")})
        }
        else {
          client.release();
          console.log("table found")

          res.render('pages/display_students',{s:result})
        }
        res.end()
      })
    } catch (err){
      console.error(err);
      res.render('pages/error',{message:""+err})
    }
  })

  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
