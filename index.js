import express from 'express'
import {bootstrap} from './src/routes.js'
import dbConnection from './databases/dbConnection.js'
import dotenv from 'dotenv'
import chalk from 'chalk'
// import cookieParser from 'cookie-parser'
dotenv.config()
const app = express()
app.use(express.json())
// app.use(cookieParser())
bootstrap(app)
dbConnection()

app.listen(process.env.PORT||3000, () => console.log(chalk.blue.bold(`App listening on port ${process.env.PORT}!`)))