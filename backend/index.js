
const app=express();
const port=5000;
import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use(express.urlencoded   ({ extended: true }));

app.use(express.static(path.join(__dirname, '../frontend/src')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/src', '../frontend/index.html'));
  });

// Middleware to parse incoming request bodies
app.use(bodyParser.json());

app.use(express.urlencoded({ extended: true }));
//This is a built-in middleware function in Express.
//It is used to parse incoming request bodies that are in URL-encoded format.
//When data is sent from a form in a web page, it is typically encoded in URL-encoded format.
//This middleware parses that data and makes it available in req.body.

app.use(express.json())
//So, when you use app.use(express.json()), you're telling your Express application to use the middleware
//to parse incoming requests with JSON payloads, enabling you to access the parsed JSON data in req.body
//within your route handlers.


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })


app.get('/', (req, res) => {
    console.log("hi")
    res.sendFile(__dirname + '/frontend/src/App.tsx')

  })