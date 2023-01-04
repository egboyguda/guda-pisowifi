const express = require('express');
const app = express();
const path = require('path');
const PORT = 3000 
const ejsMate = require('ejs-mate');
const partials = require('express-partials');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: true});
const { exec } = require('child_process');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.engine("ejs",ejsMate)
app.set('trust proxy', true)

app.use(express.static(path.join(__dirname, 'public')));
app.use(require('body-parser').urlencoded({ extended: true }))
app.get("/", urlencodedParser,(req, res) => {
    const clientip = req.ip
    console.log(clientip.splice(7))
    res.render("portal")
})

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
});