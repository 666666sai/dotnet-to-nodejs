const express=require("express");
require("dotenv").config();
const OpenAI = require("openai-api");
const { name } = require("ejs");
const bodyParser = require('body-parser');
const app=express();

app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", (req, res) => {
    res.render('index',{ response: null });
})

const openai=new OpenAI({ apiKey: process.env.OPEN_API_KEY });

app.post("/", async (req, res)=>{
   
    const data=req.body.userText;
    
    try{
        const {promt}=data;
        const response =await openai.complete({
            model: "text-davinci-003",
            promt: "tell me about you",
            max_tokens: 64,
            temprature: 0,
            top_p: 1.0,
            frequency_penalty:0.0,
            stop: ["\n"],
        });
        console.log('response');
        const result=res.data.choices[0].text;
        res.render('index', { response: result });
    }
    catch(error){
        res.render('index', { response: error.message });
    }
});

app.listen(5000,()=>{
    console.log("server started");
})