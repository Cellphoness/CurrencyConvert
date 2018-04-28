const express = require('express')
const cool = require('cool-ascii-faces')
const path = require('path')
const PORT = process.env.PORT || 5000
const fs = require('fs');

express()
  // .use(express.static(path.join(__dirname, 'public')))
  .use('/assets', express.static(path.join(__dirname, 'currency/assets')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/cool', (req, res) => res.send(cool()))
  .get('/status', (req, res) => res.send('packager-status:running'))
  .get('/index.ios.bundle', (req, res) => {
  	fs.readFile(path.join(__dirname, 'index.ios.jsbundle'), 'utf-8', (err, data) => {
  		res.header('Content-Type', 'application/javascript');
	    if (err) {
	        console.log(err);
	    } else {
	        res.send(data);
	    }
	 })
  })
  .get('/currency/index.ios.bundle', (req, res) => {
    fs.readFile(path.join(__dirname, 'currency/index.ios.jsbundle'), 'utf-8', (err, data) => {
      res.header('Content-Type', 'application/javascript');
      if (err) {
          console.log(err);
      } else {
          res.send(data);
      }
   })
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
