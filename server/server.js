const express = require("express")
const app = express()
const cors = require("cors")
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const port  = 3000

dotenv.config()
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({extended:false}))

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("connected to MONGO"))
  .catch((err) => console.log(err));


app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})