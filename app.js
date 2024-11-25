require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();

const registerRoute = require('./routes/auth/register');
const loginRoute = require('./routes/auth/login');


app.use(express.json());
app.use(express.static('public'));


app.get('/', (req, res) =>{
    res.status(200).json({msg: 'Bem-vindo ao app!'})
});

app.post('/register', registerRoute);
app.post('/login', loginRoute);



db_user = process.env.DB_USER;
db_pass = process.env.DB_PASS;

mongoose.connect(
    `mongodb+srv://${db_user}:${db_pass}@abrindocaminho.k4lyvjh.mongodb.net/?retryWrites=true&w=majority&appName=AbrindoCaminho`
).then(()=>{
    app.listen(process.env.PORT || 3002);
    console.log('API rodando!');
}).catch((e)=>{
    console.log(e);
})