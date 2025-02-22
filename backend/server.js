require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const {logger} = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const verifyJWT = require('./middleware/verifyJWT');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');
const credentials = require('./middleware/credentials');
//const prerender = require('prerender-node')
//const reverseProxy = require('./middleware/reverseproxy')
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3500;

//set up prerender
//prerender.set('prerenderToken', process.env.PRERENDER_TOKEN);
//connect to mongo db
connectDB();
//logger
app.use(logger);
//

//ping
// app.use('/ping', require('./routes/ping'));
app.use(credentials);
app.use(cors(corsOptions));
//app.use(reverseProxy);

app.use(express.urlencoded({extended: false, limit:'50mb'}));

app.use(express.json({limit:'50mb'}));

app.use(cookieParser())

// app.use('/uploads', express.static('uploads'));
app.use('/', express.static(path.join(__dirname, '/public')));

app.use('/', require('./routes/root'));
app.use('/api/auth/login/', require('./routes/auth/login'));
app.use('/api/refresh/', require('./routes/auth/refresh'));
app.use('/api/auth/logout/', require('./routes/auth/logout'));
app.use('/api/product', require('./routes/product'))
app.use('/api/admin', require('./routes/admin'))
app.use('/api/cart', require('./routes/cart'))
app.use('/api/order', require('./routes/order'))
app.use('/api/sms', require('./routes/sms'))
app.use(verifyJWT);



app.get('*/', (req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
})

app.use(errorHandler)
mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});