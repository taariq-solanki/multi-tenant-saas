const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

const apiRouter = require("./routes/api");

const app = express();

app.use(logger("dev"));
// ✅ Parse JSON and URL-encoded data properly
app.use(express.json({ limit: "10mb", type: "application/json" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

app.use(cookieParser());

// ✅ Allow local + EB frontend dynamically
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      /\.elasticbeanstalk\.com$/,
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
