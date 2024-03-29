const express = require("express")
const app = express()
const cors = require("cors")
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const port  = 3000
const authRoute = require('./routes/authRoute')
const serviceRoute = require('./routes/serviceRoute')
const categoryRoute = require('./routes/categoryRoute')
const reviewRoute = require('./routes/reviewRoute')
const locationRoute = require('./routes/locationRoute')

dotenv.config()
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({extended:false}))
app.use(bodyParser.json())

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("connected to MONGO"))
  .catch((err) => console.log(err));
  
app.use("/auth", authRoute)
app.use("/services", serviceRoute)
app.use("/categories", categoryRoute)
app.use("/reviews", reviewRoute)
app.use("/location", locationRoute)

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})
