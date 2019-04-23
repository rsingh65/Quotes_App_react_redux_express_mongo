const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const Data = require("./data");
const cors = require("cors");

const app = express();
const router = express.Router();

const PORT = 3001;
const Database = "post";
const uri = "mongodb+srv://rohit:rohit123@cluster0-xfqpx.mongodb.net/" + Database + "?retryWrites=true";

// connects the mongoose with a uri and url parser
mongoose.connect(
    uri,
    { useNewUrlParser: true }
).catch((err) => {
    console.log("Some error in connnecting");
    console.log(err);
});


//we can do some database initialization here
let db = mongoose.connection;
db.once("open", () => console.log("connected to the database"));
db.on("error", console.error.bind(console, "MongoDB connection error:"));

//necessary for sending the data in body of the http request
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//for cross site requests
app.use(cors());

//this gets all the posts from the mongodb on the server
router.get("/getPosts", (req, res) => {
    Data.find((err, data) => {
        if (err) return res.json({ error: err });
        return res.json({posts:data});
    });
});

// this is our create methid
// this method adds new data in our database
router.post("/createPost", (req, res) => {
    let data = new Data();
    const { title, body } = req.body;

    //assign all the fields here with data received from the request
    data.title = title;
    data.body = body;

    //save the data on the database by this
    data.save(err => {
        if (err) return res.json({ error: err });
        return res.json({post:data});
    });
});

//use this to just add api to the http request as it looks cooler this way
app.use("/api", router);

//this fires up a server listening at the PORT
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});

