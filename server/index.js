import express from "express";
import pkg from "jsonwebtoken";
const { sign, verify } = pkg;
const app = express();
const port = 3000;
const hostName = "127.0.0.2";
const secreteKey = "secreteKey";

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.post("/login", (req, resp) => {
  const user = {
    id: 1,
    fullName: "Sumon Hossain",
    email: "sumonmr@gmail.com",
  };
  // token create
  sign({ user }, secreteKey, { expiresIn: "300s" }, (err, token) => {
    resp.json({ token });
  });
});

app.post("/profile", veryfyToken, (req, resp) => {
  verify(req.token, secreteKey, (err, authData) => {
    if (err) {
      resp.json({ result: "Invalid token" });
    } else {
      resp.json({
        message: "Profile accessed",
        authData,
      });
    }
  });
});

function veryfyToken(req, resp, next) {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const token = bearer[1];
    req.token = token;
    next();
  } else {
    resp.send({ result: "Token is not valid" });
  }
}

app.listen(port, () => {
  console.log(`server is running at http://${hostName}:${port}`);
});
