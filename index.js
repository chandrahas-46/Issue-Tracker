import "./env.js";
import express from 'express';
import path from 'path';
import ejsLayouts from 'express-ejs-layouts';
import issueRouter from './src/routes/issue.routes.js'
import { connectToDB } from './src/config/mangooseConfig.js';

const app = express();
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(ejsLayouts);
app.set('view engine', 'ejs');
app.set('views',path.join(path.resolve(), 'src', 'views'));

// use express router
app.use("/", issueRouter);

// 3. Default request handler
// app.get('/', (req, res) => {
//     res.send("Welcome to Issue Tracker App!");
// })

//server listening
app.listen(3000, (err) => {
    if(err) console.log("server error on port 3000");
    console.log('Server is running at 3000');
    connectToDB();
})
