import express from "express";
import cors from 'cors';
import dotEnv from 'dotenv'
import mongoose from "mongoose";
import userRouter from "./router/userRouter.js";
import cookieParser from "cookie-parser";
import productRouter from "./router/productRouter.js";

const app = express();
const corsOptions = {
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());

//configure .env variables
dotEnv.config({ path: './.env' });

const hostname = process.env.HOST_NAME;
const port = process.env.PORT;
mongoose.connect(process.env.MONGO_DB_LOCAL, { useNewUrlParser: true, useUnifiedTopology: true }).then((response) => {
    console.log('connected to mongodb successfully');
}).catch((error) => {
    console.log(error);
    process.exit(1);
})

app.get('/', (request, response) => {
    response.status(200).send(
        `<h3>welcome to the server</h3>`
    );
});

app.use('/users', userRouter);
app.use('/products/v1', productRouter);

app.listen(port, hostname, () => {
    console.log(`server is running on http://${hostname}:${port}`);
});