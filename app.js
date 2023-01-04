const express = require('express');
const app = express();
const path = require('path');
const PORT = 3000 
const ejsMate = require('ejs-mate');
const partials = require('express-partials');
const { exec } = require('child_process');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.engine("ejs",ejsMate)


app.use(express.static(path.join(__dirname, 'public')));
app.get("/", (req, res) => {
    const clientip = req.query.clientip
    console.log(clientip)
    res.render("portal")
})

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
});