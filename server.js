const openAi = require('openai')
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

const { Configuration, OpenAIApi } = openAi
const configuration = new Configuration({
    organization: "Get it from openai",
    apiKey: "get it from openai",
});
const openai = new OpenAIApi(configuration);
//const response = await openai.listEngines();


//app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
//app.use(express.json())

app.get('/api', (req, res) => {
  res.json({ message: 'Hello from the API' });
});

app.post('/', async (req, res) => {
  const { message } = req.body;
  console.log(" I am here ")
const response = await openai.createCompletion({
  model: "text-davinci-003",
  prompt: `${message}`,
  max_tokens: 7,
  temperature: 0,
});
if ( response.data ){
  if ( response.data.choices){
    res.json({ message: response.data.choices[0].text });
  }
}
 
});

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Listening on port ${port}...`));
