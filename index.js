const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const PORT = process.env.PORT || 3001;
const RegisterModel = require("./models/Register");
const PostModel = require("./models/Post");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const MongoDBStore = require("connect-mongodb-session")(session);
const path = require("path");
// const url = "https://anniversaryapp.netlify.app";
const url = "http://localhost:3000";

// if (process.env.NODE_ENV === "production") {
app.use(express.static("client/build"));
// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
// });
// }

mongoose.connect(
  "mongodb+srv://apeiron242:1638@cluster0.ku7is.mongodb.net/anniversary-app?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
  }
);

const store = new MongoDBStore({
  uri:
    "mongodb+srv://apeiron242:1638@cluster0.ku7is.mongodb.net/anniversary-app?retryWrites=true&w=majority",
  collection: "sessions",
});

app.use(cookieParser());
app.use(
  cors({
    origin: url,
    methods: ["GET", "POST", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("trust proxy", 1);
app.use(
  session({
    key: "userID",
    secret: "subscribe",
    proxy: true,
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
      secure: false,
      maxAge: null, //1000 * 60 * 60 * 24 * 7, 1 week
    },
  })
);

app.get("/login", (req, res) => {
  if (req.session.user) {
    console.log(req.session.user);
    res.send({ isLogin: true, user: req.session.user });
  } else {
    console.log("req.session.user doesn't exist");
    res.send("no");
  }
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  RegisterModel.find({ username }, (err, result) => {
    if (err) {
      console.log(err);
    }
    if (result.length > 0) {
      bcrypt.compare(password, result[0].password, (error, response) => {
        if (response) {
          req.session.user = result;
          res.send(result);
        } else {
          res.send("비밀번호가 맞지 않습니다");
        }
      });
    } else {
      res.send("아이디가 맞지 않습니다");
    }
  });
});

app.post("/logout", (req, res) => {
  req.session.destroy();
});

app.post("/register", async (req, res) => {
  const username = req.body.newUsername;
  const password = req.body.newPassword;

  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      console.log(err);
    }
    const register = new RegisterModel({ username, password: hash });
    register.save();
  });
});

app.post("/post", (req, res) => {
  const { title, date } = req.body;
  const username = req.body.username;

  const post = new PostModel({
    title,
    date,
    username,
  });
  post.save();
  res.send(post);
});

app.get("/post/:username", (req, res) => {
  const username = req.params.username;
  PostModel.find({ username: username }, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  await PostModel.findByIdAndRemove(id).exec();
  res.send("deleted");
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
