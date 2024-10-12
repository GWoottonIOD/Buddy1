const cors = require("cors");

const corsOptions = {
    origin: ["http://192.168.1.73:5173","http://192.168.1.187:5173", "http://localhost:5173"],
};

module.exports = cors(corsOptions);