var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var http = require("http");
var socketio = require("socket.io");

var app = express();

const {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom,
} = require("./socket/users");

const server = require("http").createServer(app);

const io = socketio(server, {
  cors: {
    origin: "*",
  },
  pingTimeout: 1000,
  pingInterval: 1000,
});

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500).json({ err: "Some Error Occured" });
});

io.on("connect", (socket) => {
  socket.on("join", ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });

    if (error) return callback(error);

    socket.join(user.room);
    socket.emit("welcomeMessage", {
      text: `Welcome to the Room, ${user.name}!`,
    });

    socket.broadcast
      .to(user.room)
      .emit("welcomeMessage", { text: `${user.name} has joined.` });
    console.log(`${user.name}:${room}`);
    callback();
  });

  socket.on("sendTitle", (message, callback) => {
    console.log(message);
    const user = getUser(socket.id);
    if (user) {
      console.log(user);
      io.to(user.room).emit("title", { text: message });
    }
    callback();
  });

  socket.on("sendBody", (input, callback) => {
    console.log(input);
    const user = getUser(socket.id);
    if (user) {
      console.log(user);
      io.to(user.room).emit("body", { text: input });
    }
    callback();
  });

  socket.on("disconnect", () => {
    const user = removeUser(socket.id);
    console.log(user);
    if (user) {
      io.to(user.room).emit("disMess", {
        text: `${user.name} has left the room`,
      });
    }
  });
});

module.exports = { app: app, server: server };
