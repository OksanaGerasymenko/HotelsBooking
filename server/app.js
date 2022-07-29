const express = require('express')
const config = require('config')
const chalk = require('chalk')
const mongoose = require('mongoose')
const initDatabase = require('./startUp/initDatabase')
const routes = require('./routes')

const PORT = config.get('port') ?? 8080
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/api', routes)

async function start() {
    try{
        mongoose.connection.once( 'open', ()=>{
            initDatabase()
        })
        await mongoose.connect(config.get('mongoUri'))
        console.log(chalk.bgGreen('MongoDB has been conntected'))
        app.listen(PORT, ()=> {
            console.log(chalk.bgGreen(`server has been started at http://localhost:${PORT} `))
        })
    }catch(e){
        console.log(chalk.red(e.message))
        process.exit(1)
    }
}

start()