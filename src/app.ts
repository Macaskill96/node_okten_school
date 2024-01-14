import express, { Request, Response } from "express";
import fs from "fs";
import path from "path";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const dbToRead = path.resolve("db", "db.json");
fs.readFile(dbToRead, "utf8", (err, data) => {
  if (err) throw err;

  const dbData = JSON.parse(data);

  app.get("/users", (req: Request, res: Response) => {
    res.json(dbData);
  });

  app.get("/users/:id", (req: Request, res: Response) => {
    const { id } = req.params;
    res.json(dbData[id - 1]);
  });
  app.post("/users", (req: Request, res: Response) => {
    const body = req.body;
    res.json(dbData.push(body));
    fs.writeFile(dbToRead, JSON.stringify(dbData), "utf8", (err) => {
      if (err) throw err;
      res.json(dbData);
    });
  });
  app.delete("/users/:id", (req: Request, res: Response) => {
    const { id } = req.params;
    res.json(dbData.splice(id - 1, 1));
    fs.writeFile(dbToRead, JSON.stringify(dbData), "utf8", (err) => {
      if (err) throw err;
      res.json(dbData);
    });
  });
  app.put("/users/:id", (req: Request, res: Response) => {
    const { id } = req.params;
    const body = req.body;
    dbData[id - 1] = body;
    res.json(dbData);
    fs.writeFile(dbToRead, JSON.stringify(dbData), "utf8", (err) => {
      if (err) throw err;
      res.json(dbData);
    });
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log("Server has started");
});
