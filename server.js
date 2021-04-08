const dotenv = require("dotenv");

process.on("uncaughtException", (err) => {
  console.log("UNCAUHHT EXCEPTION💥! Shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: "./config.env" });
const app = require("./app");

app.set("port", process.env.PORT || 5050);

const server = app.listen(app.get("port"), () =>
  console.log(`Server running at → ${server.address().port}`)
);

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION💥! Shutting down...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
