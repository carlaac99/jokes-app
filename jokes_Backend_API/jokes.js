const axios= require('axios');
const express = require('express');
const app = express()
const cors = require('cors')

app.use(cors());


//carlagcasta LDT4sAJKjMaZIGod
const port = process.env.PORT || 4400;
const base_api_url = "https://v2.jokeapi.dev/joke/Any?"
const censored_url = "blacklistFlags=nsfw,religious,political,racist,sexist,explicit"
const type_url = "type=single";
const amount_url = "amount="
api_url = ""
let jokeLikes = {};

app.get("/jokes/:amount/:uncensored", (req,res) => {
    

    var amount = req.params.amount
    var uncensored = Boolean(req.params.uncensored)
    api_url = base_api_url

    console.log("amount: ", amount)
    if (uncensored) {
        api_url += "&" + type_url
     }
    else{
        api_url += "&" + censored_url + "&" + type_url
     }

    if (amount!=null){
        api_url += "&" + amount_url + amount

     }
     else{
        api_url += "&" + amount_url + "10"

     }
     console.log("api_url: ", api_url)

    axios.get(api_url)
        .then (response =>{

            if (response.data["amount"] == undefined){
                console.log("response.data[amount]",response.data["amount"])
                var jokes = [{
                    id: response.data.id,
                    category: response.data.category,
                    joke: response.data.joke,
                    lang: response.data.lang,
                    likes: 0,
                    dislikes: 0,
                    comments: []

                }]

            }
             else {
                var jokes = response.data["jokes"]
                .map( data => ({
    
                    id: data.id,
                    category: data.category,
                    joke: data.joke,
                    lang: data.lang,
                    likes: 0,
                    dislikes: 0,
                    comments: []
                }))

             }


            res.json(jokes) 
            jokeLikes = jokes;
            console.log(jokeLikes) 
        })

        .catch(err =>{
            console.log("error: ", err.message);
            res.status(500).json({ error: 'Failed to fetch jokes data' });

        })

})




app.listen(port, () => {
    console.log(`server is running on port ${port}`)

})
