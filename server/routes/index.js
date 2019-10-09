var express = require('express');
var router = express.Router();
const { Pool } = require('pg')
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'products',
  password: 'mmye',
  port: 5432,
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// API get data
router.get('/products', function(req, res, next) {
  new Promise((resolve, reject) => {
    pool.query('SELECT * FROM products_info', (err, res) => {
      if (err) {
        reject(err);
      }
      // pool.end();
      resolve(res.rows);
    });
  }).then(products => {
    res.statusCode = 200;
    res.json({
      code: res.statusCode,
      products: products
    });
    
  }).catch(err => {
    console.log(err.toString());
  })
});

router.get('/add', (req, res, next) => {
  res.render('add', {title: 'Add Product'});
});

router.post('/add', (req, res, next) => {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);
  // Pass to next layer of middleware
  let {name, price, images} = req.body;
  pool.query('INSERT INTO products_info (name, price, images) VALUES ($1, $2, $3)', [name, price, images]).then(result => {
    res.send('insert thành công');
  }).catch(err => {
    console.log(err.toString());
  });
});



module.exports = router;