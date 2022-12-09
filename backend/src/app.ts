import express from 'express'
import session from 'express-session'
import boardController from './controllers/board.controller'

const app = express()


app.use(session({
    secret: 'secret code',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        maxAge: 1000 * 60 * 60
    }
}))
app.use(express.urlencoded({extended:false}))
app.use(express.json({
  limit: '50mb'
}))

app.use('/api/board', boardController)

app.listen('3000', () => {
  console.log('Server started. port 3000! bread-geed')
})
