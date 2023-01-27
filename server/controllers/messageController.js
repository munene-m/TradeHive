const messageModel = require('../models/Message')
const asyncHandler = require('express-async-handler')
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

 io.on("connection", (socket) => {
    console.log("A user connected")
 })