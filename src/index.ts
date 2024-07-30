import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import uploadRoute from './routes/uploadRoute';

//[configure dotenv]
dotenv.config();


const app: Express = express();
const port = process.env.PORT || 8000;

//[routes]
app.use('/api/upload', uploadRoute);


app.get("/", (req: Request, res: Response) => {
  res.send(`
        <h2>File Upload With <code>"Node.js"</code></h2>
        <form action="/api/upload" enctype="multipart/form-data" method="post">
        <div>Select a file: 
            <input type="file" name="file" multiple="multiple" />
        </div>
        <input type="submit" value="Upload" />
        </form>`
    );
});


//[start the server]
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
