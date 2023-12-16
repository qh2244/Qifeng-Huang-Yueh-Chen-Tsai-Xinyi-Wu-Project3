const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const multer = require("multer");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const path = require("path");
const cors = require("cors");

dotenv.config();

mongoose.connect(
    process.env.MONGODB,
    { useNewUrlParser: true, useUnifiedTopology: true }
)
.then(() => {
    console.log("Connected to MongoDB");
})
.catch(error => {
    console.error("Error connecting to MongoDB:", error);
});

app.use("/images", express.static(path.join(__dirname, "public/images")))

//middleware
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null, "public/images");
    },
    filename:(req,file,cb) => {
        cb(null, file.originalname);
    }
})

const upload = multer(storage);
app.post("api/upload",upload.single("file"), (req, res) =>{
    try {
        return res.status(200).json("File uploaded sucessfully.")
    } catch (error) {
        console.log(err)
    }
})

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);



app.listen(process.env.PORT || 8800, function() {
    console.log("Starting server now...")
});
