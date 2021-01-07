const express = require("express");
const app = express();
const server = require('http').createServer(app);
const path = require("path");
const cors = require("cors");
require('dotenv').config()
const mongoose = require("mongoose");
const Calculator = require("./model/Calculator");
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 8000;
const io = require('socket.io')(server);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true,
}).then(() => {
    console.log("Connected to Database");
});

io.origins("*:*")
io.on('connection', socket => {
    socket.on('newData', function (msg) {
        io.emit('render', msg);
    });
})

app.get("/getCalculations", (req, res) => {
    Calculator.find()
        .sort([["createdAt", "desc"]])
        .limit(10)
        .exec((err, data) => {
            if (err) {
                return res.status(400).json({
                    error: "Error fetching data",
                });
            } else {
                return res.json(data);
            }
        });
});

app.post("/addCalculation", (req, res) => {
    const calculator = new Calculator({
        calculation: req.body.calculation,
    });
    calculator.save().then((data) => {
        if (!data) {
            return res.status(400).json({
                error: "Calculation Error",
            });
        } else {
            return res.json(data);
        }
    });
});

if (process.env.ENV === "prod") {
    var distDir = path.join(__dirname, '..', 'dist', 'calApp');
    app.use(express.static(distDir));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'index.html'));
    });
}

server.listen(PORT, () => {
    console.log(`Listening on Port: ${PORT}`);
});