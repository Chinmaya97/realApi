const express = require('express')
require('dotenv').config()
const app = express()
const PORT = process.env.PORT || 5000
const connectDB = require('./db/connect')

app.get('/', (req,res)=>{
    res.send("hii hdh")
})
const product_route = require('./routes/products')
// middleware
app.use("/api/products", product_route)
const start = async ()=> {
    try {
        await connectDB(process.env.MONGODB_URL)
        app.listen(PORT,()=>{
           console.log( `server running on ${PORT}`)
        })
        
    } catch (error) {
        console.log(error)
        
    }
}
start()