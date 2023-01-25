const express = require('express');
const app = express();
const path = require('path');
const PORT = 3000
const ejsMate = require('ejs-mate');
const partials = require('express-partials');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: true });
const portalRoutes = require('./routes/portal');
const { exec } = require('child_process');
const server = require('http').Server(app);
const allowClient = require("./utils/allow-client")

const io = require('socket.io')(server, {
    cors: {
        origin: "*",
    }
});
const cors = require("cors")

app.use(cors(
    {
        origin: "*",

    }
))
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.engine("ejs", ejsMate)
app.set('trust proxy', true)

app.use(express.static(path.join(__dirname, 'public')));
app.use(require('body-parser').urlencoded({ extended: true }))
io.on('connection', socket => {

    console.log('a user connected');

    socket.on("coins", (val) => {
        console.log(val[0])
        io.emit("insert", { data: val })
    })
    socket.on('disconnect', async () => {
        //await allowClient.checkAndKill();
        console.log('user disconnected');
    })
})
app.use(portalRoutes);

server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
});