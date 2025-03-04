const express = require("express");
const cors = require("./libraries/cors");
require("dotenv").config();
const http = require('http');
const socketIo = require("./libraries/socket"); // Import the Socket.IO setup function
// const redis = require("redis"); // Require the redis package
let dbConnect = require("./dbConnect");

// const corsOptions = {
//     origin: ["http://192.168.1.55:5173", "http://localhost:5173"],
// };

const app = express();

// const client = redis.createClient({
//     host: process.env.REDIS_HOST || "127.0.0.1", // Redis server host
//     port: process.env.REDIS_PORT || 6379,       // Redis server port
// });

app.use(cors);

const server = http.createServer(app);
const io = socketIo(server); // Initialize Socket.IO using the imported function

// parse requests of content-type - application/json
app.use(express.json());

let secureRoutes = require('./routes/secureRoutes');
app.use('/api/secure', secureRoutes);

let debtRoutes = require('./routes/debtRoutes');
app.use('/api/debts', debtRoutes);

let userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

let paymentRoutes = require('./routes/paymentRoutes');
app.use('/api/payments', paymentRoutes);

let dynamicRoutes = require('./routes/dynamicRoutes');
app.use('/api/dynamic', dynamicRoutes);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

io.listen(3001, () => {
    console.log('Socket.IO server is running on port 3001');
});
