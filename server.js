import express from 'express';
import mots from './models/Voc.js';

// static async loadRandom(where = {}) {
//     return await query(`SELECT monMot FROM ${this.table} ORDER BY RAND() LIMIT 1`, {}, where);
//   }
const app = express();
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }));

app.post('/', async function(req,res){
    const MotsVoc = await mots.loadRandom()
    res.render('VocTest.ejs', {MotsVoc, successMessage: null, errorMessage: null});
});

app.post("/answer", async function (req, res) {
    const load = await mots.load()
    console.log(req.body.trad)
    if (load.Traduction == req.body.trad){
        console.log('match')
        const MotsVoc = await mots.loadRandom()
        res.render('VocTest.ejs', {MotsVoc, successMessage: 'Match', errorMessage: null });
    }
    else {
        const MotsVoc = await mots.loadRandom()
        res.render('VocTest.ejs', {MotsVoc, successMessage: null , errorMessage: 'Malheureusement vous êtes nul' });
    }
});

app.post('/list', async function(req,res){
    const list = await mots.loadMany()
    res.render('VocList.ejs', {list})
});

app.post('/delete', async function(req,res){
    const mot  = await mots.load({id : req.body.idmot})
    mots.delete(mot);
    res.redirect('/')
});

app.post('/add', async function(req,res){
    const mot = new mots();
    mot.monMot = req.body.addMot;
    mot.Traduction = req.body.addTrad;
    console.log(mot)
    await mot.save();
    res.redirect('/');
});

    
//   const tv = new tele();
//   tv.Marque = req.body.Marque;
//   tv.Prix = parseInt(req.body.Prix);
//   tv.Taille = parseInt(req.body.Taille);
//   tv.Achete = 0;
//   await tv.save();
//   res.redirect('/');
// });

// app.post("/buy", async function (req, res) {
//     const tv = await tele.load({id : req.body.idtv})
//     tv.update({Achete : 1});
//     tv.update({Casse : 0})
//     await tv.save();
//     res.redirect('/');
// });

// app.post("/broke", async function (req, res) {
//     const tv = await tele.load({id : req.body.idtv})
//     tv.update({Casse : 1});
//     tv.update({Cause : req.body.Cause})
//     await tv.save();
//     res.redirect('/');
// });

app.listen(3000, () => {
    console.log('Server is running on port 80');
});