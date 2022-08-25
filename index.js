import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();

app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors());

const CONNECTION_URL = 'mongodb+srv://PatrickDelight:12345@cluster0.9melo.mongodb.net/?retryWrites=true&w=majority';
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL,{useNewUrlParser:true, useUnifiedTopology: true})
.then(() => app.listen(PORT,() => console.log("connected")))
.catch((error) => console.log(error.message));
//mongoose.set('useFindAndModify', false);


app.get('/hi',(req,res)=>{
    res.send("fuck you");
})

const quoteSchema = mongoose.Schema({
                                author: String,
                                quote: String
                                    });

const Quote = mongoose.model('quote', quoteSchema);

app.get('/hello',(req,res)=>{
    const newGet = Quote.find({});
    res.status(200).json(newGet);
})


app.post('/post/api/v1', async (req,res)=>{
    const post = req.body;
    const newQuote = new Quote(post)
    try {
       await newQuote.save();
       res.status(201).json(req.body)
       console.log(newQuote)
    } catch (error) {
        console.log(error)
    }
})