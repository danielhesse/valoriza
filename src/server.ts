import express from "express";

const app = express();

app.use(express.json());

app.get("/", (request, response) => {
  return response.json({ message: "Hello World" });
});

app.listen(process.env.port || 3333, () => {
  console.log("🚀 Server running on port 3333.");
});
