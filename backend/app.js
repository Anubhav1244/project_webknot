const express=require('express');
const app=express();
const bodyParser=require('body-parser');
const cors=require('cors');
const{dbconnect}=require('./config/database');
const authRouter=require('./router/authRouter');
const eventRouter=require('./router/eventRouter');
const cookieParser = require('cookie-parser');

app.use(cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.json());


app.use('/api/v1/auth',authRouter);
app.use('/api/v1/event',eventRouter);



dbconnect();

app.listen(4000,()=>{
    console.log('Server is running on port 4000');
});
