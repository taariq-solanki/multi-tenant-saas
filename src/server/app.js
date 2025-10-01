const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

const apiRouter = require("./routes/api");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// ✅ Allow local + EB frontend
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://my-saas-app-env.eba-6pq3ppyc.ap-south-1.elasticbeanstalk.com"
    ],
    credentials: true,
  })
);

// API routes
app.use("/api", apiRouter);

// ✅ Serve React build
app.use(express.static(path.join(__dirname, "../../public")));

// ✅ Catchall for React Router
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../../public", "index.html"));
});

module.exports = app;
