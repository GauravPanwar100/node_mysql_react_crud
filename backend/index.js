const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

const PORT = 3001;

const productsRoute = require('./routes/products.route');

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/products', productsRoute);


app.get('/', (req, res) => {
    res.status(200).send('hello')
})

app.listen(PORT, (req, res) => {
    console.log('Server is running on port ' + PORT);
})



// 1. event loop
// 2. asyncity in node
// 3. node packages;- http,fs
// 4. node internal working
// 5. 
