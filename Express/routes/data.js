const express = require('express');
var router = express.Router();

const http = require('http');
const moment  = require('moment')
// const socketio = require('socket.io');

// const port = 8001;
// // const app = express();

const server = http.createServer();
// const io = new socketio.Server(server, {
//     cors: {
//         origin: '*'
//     }
// });

// io.on("connection", (socket) => {
//     console.log("Connection established");
//     if (timechange)
//     // clearInterval(timechange)
//     setInterval(() => socket.emit("message", new Date()), 1000);
// });


// module.exports = server;
let data = { name: '', value: 0, secondValue: 0};

router.get("/data", async function (req, res, next) {
    try {
        data.name = moment().format('LTS'); 
        data.value = Math.random() *100;
        data.secondValue = Math.random() *100;
       
        // setInterval(() => {   
        // }, 3000);
        // console.log(data);
        res.status(200).json({ status: true, data });
    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .json({ status: false, error: "Error" });
    }
});

//   server.listen(port, () => {
// console.log(`Server is running on port ${port} `);
// });


  module.exports = router;
