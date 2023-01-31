import express from 'express'
import session from 'express-session'
import categoryController from './controllers/category.controller'
import boardController from './controllers/board.controller'
import projectController from './controllers/project.controller'

const app = express()
// app.use(express.static('upload'));
app.use('/upload', express.static(__dirname + '/upload'))
// 저장한 파일 조회
// 정적인 파일이 접근할 라우터 path 설정 // (express.static 함수를 통해 제공되는 파일에 대한 가상 경로)
// /board 경로를 통해 upload 디렉토리에 포함된 파일 로드할 수 있음.

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

app.use('/api/board/category', categoryController)
app.use('/api/board', boardController)
app.use('/api/project', projectController)

app.listen('3000', () => {
  console.log('Server started. port 3000! bread-gee')
})
