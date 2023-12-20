import express from 'express';
import mots from './models/Voc.js';

const app = express();
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }));

app.get('/', async function(req,res){
    connection.query("SELECT monMot FROM mots ORDER BY RAND() LIMIT 1",function(result){
        console.log("affichage d'un mot");
        console.log(result);
        response.render('VocList.ejs', {result: result});
    })
    //const MotsVoc = await mots.loadMany(monMot)
    //const have = await tele.loadMany({Achete : 1})
    //let sum = 0;
//     for(let i = 0;i<have.length ;i++){
//         sum = sum + have[i].Prix;
//     };
    //res.render('VocList.ejs', {MotsVoc});
});

// app.post("/add", async function (req, res) {
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

app.listen(80, () => {
    console.log('Server is running on port 80');
});