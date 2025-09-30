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

// Enable CORS for frontend
app.use(
  cors({
    origin: "http://localhost:3000", // local dev frontend
    credentials: true,
  })
);

// mount our api router
app.use("/api", apiRouter);

// ✅ Serve React build from root /public
app.use(express.static(path.join(__dirname, "../../public")));

// ✅ Catchall: send React index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../../public", "index.html"));
});

module.exports = app;
