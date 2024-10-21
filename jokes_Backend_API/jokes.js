const axios= require('axios');
const express = require('express');
const app = express()
const cors = require('cors')

app.use(cors());

const port = process.env.PORT || 4400;
const api_url = "https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=single&amount=10"

app.get("/jokes", (req,res) => {
    axios.get(api_url)
        .then (response =>{
            var jokes = response.data["jokes"]
            .map( data => ({
                id: data.id,
                category: data.category,
                type: data.type,
                joke: data.joke,
                lang: data.lang,
                likes: 0,
                dislikes: 0,
                comments: []

            }) )

            
            // console.log("jokes: ", jokes)
            
            res.json(jokes)
     
            
        })
        .catch(err =>{
            console.log("error: ", err.message);
            res.status(500).json({ error: 'Failed to fetch quote data' });

        })

})
// app.post("likes/:id", (req,res) =>{
//     axios.get(api_url)
//     .then (response =>{
//         var jokes = response.data["jokes"]
//         .map( data => ({
//             id: data.id,
//             category: data.category,
//             type: data.type,
//             joke: data.joke,
//             lang: data.lang,
//             likes: 0,
//             dislikes: 0

//         }) )

        
//         // console.log("jokes: ", jokes)
        
//         res.json(jokes)
 
        
//     })
//     .catch(err =>{
//         console.log("error: ", err.message);
//         res.status(500).json({ error: 'Failed to fetch quote data' });

//     })

// })
app.listen(port, () =>{
    console.log(`server is running on port ${port}`)

})
