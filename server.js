const express = require ("express")
const mongoose = require("mongoose")
const bodyParser = require ("body-parser")
const app = express()

require ("dotenv").config()

app.use (bodyParser.json())

mongoose.connect(process.env.mongo_url,{}).then(
    ()=>console.log("MongoDB connected")).catch(
        (err)=>console.error("Monogdb connection error",err))

const employeeRoutes = require('./routes/employees')
const pharmacyRoutes = require('./routes/pharmacies')
const medicineRoutes = require('./routes/medicine')
const manufacturerRoutes = require('./routes/manufacturers')

app.use('/employees', employeeRoutes)
app.use('/pharmacies', pharmacyRoutes)
app.use('/medicine', medicineRoutes)
app.use('/manufacturers', manufacturerRoutes)


const Port =process.env.port||5000

app.listen(Port,()=>{
    console.log(`server is running on port ${Port}`)
})