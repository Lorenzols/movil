var express = require('express');
var router = express.Router();
// const timeago = require('timeago.js');

const {isLoggedIn, isNotLoggedIn} = require('../lib/protect')
const Moviles = require('../models/moviles');

const helpers = require('../lib/helpers');

/* GET users listing. */
router.get('/',isLoggedIn, async(req, res, next) => {
  let moviles = await Moviles.find({user_id: req.user})
  console.log("cambiado: ", moviles)
  res.render('moviles/list', {moviles});
});

router.get('/add',isLoggedIn, async(req, res, next) => {
  res.render('moviles/add');
});

router.post('/add',isLoggedIn, async(req, res, next) => {
  const id = req.user
  const {nombre, marca, precio} = req.body

  const movil = await new Moviles({
    nombre: nombre,
    marca: marca,
    precio: precio,
    fecha: Date.now(),
    user_id: id
  }) 
  await movil.save()
  res.redirect('/moviles');
});



router.get('/edit/:id',isLoggedIn, async(req, res, next) => {
  const movil = await Moviles.findById(req.params.id)
  res.render('moviles/edit', {movil});
});

router.post('/edit/:id',isLoggedIn, async(req, res, next) => {
  await Moviles.findByIdAndUpdate(req.params.id, req.body, {})
  res.redirect('/moviles');
});

router.get('/delete/:id',isLoggedIn, async(req, res, next) => {
  await Moviles.findByIdAndDelete(req.params.id)
  res.redirect('/moviles');
});

module.exports = router;
