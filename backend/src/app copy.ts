import express from 'express'
import session from 'express-session'
import mysql from 'mysql'
const app = express()

app.use(session({
    secret: 'secret code', // 내가 생성하고 싶은 문자역
    resave: false, // req 요청 왔을 때, session에 수정사항이 생기지 않더라도 다시 저장한다. => false
    saveUninitialized: false, // session에 저장할 내역이 없더라도 session을 항상 재저장 한다. => false
    cookie: {
        secure: false, // false 로 해야, session에 key 잡고 넣을 수 있는 부분을 사용 가능
        maxAge: 1000 * 60 * 60 // cookie 유효 시간 = 1시간
    }
}))
app.use(express.urlencoded({extended:false}))
app.use(express.json({
  limit: '50mb' // body로 req 할 때, 파라미터를 json 형태로 던질 수 있는데, 웹 서버에서 받으려면 express.json 선언해줘야 하고,limit값 선언 해주어야 한다.
}))

app.post('/api/login', async (req, res) => {
  // req.session['email'] = 'dddd@gmail.com' // email type 선언 추가
  res.send('okay login')
})
app.post('/api/logout', async (req, res) => {
  // logout 에선 session 클리어
  req.session.destroy
  res.send('okay logout')
})
// db와 연동해서 우리가 원하는 query를 실행해서 데이터 받아와야 한다.

// db 풀 만들기 (db 접속 정보)
const db = {
  database: 'dev', // db 이름
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: 'mariadb'
}
// dbPool 선언
// mysql 가져와서 createPool 명령어를 이용해 db랑 바로 연동 가능
// dbPool을 이용해서 query를 맘대로 날릴 수 있다.
// db 접속 정보를 이용해서 db와 연동(connect)
const dbPool = mysql.createPool(db)

import { sqls } from './sqls/sqlAll'
// const sql = Object.entries(sqls)
// console.log('this', sqls['boardList'])

// sql.ts의 쿼리를 불러와 사용해서 데이터를 받아오는지

app.post('/apirole/:alias', async (req, res) => {
  // *** 로그인 반드시 필요한 것을 API 분기 처리

  // alias 입력하면 데이터 return 해주지만
  // 로그인 안한 사용자가 alias 입력해도 접근 불가능하게 만들어야 한다.
  // email 주소가 없으면, 에러메시지 날리기
  // if (!req.session.email) {
  //   return res.status(401).send({error: 'you need to login'})
  // }
  // alias로 데이터 요청하면 (라우터 실행되면)
  // db 연동해서 데이터 가져와서 뿌려준다.

  // /api/:alias 로 들어오면
  // boardList의 query가 실행돼서 데이터를 가지고 온다.

  try {
    // 실제 실행한 query를 client로 res 해서 send 해준다.
    res.send(await serverReq.db(req.params.alias))
  } catch (err) {
    res.status(500).send({
      error: err
      // 로그인 한 사용자만 볼 수 있을 쿼리가 있을 수도 있다.
      // ex) 제품 등록 화면 => 인증된 사용자만 쓴다.
      // 상단 /api/login 에서 선언
    })
  }
})

app.get('/api/:alias', async (req, res) => {
  // ***  일반적인 조회 // 로그인 안하더라도 쿼리를 실행할 수 있는 API
  // 권한 부분 => 사용자 로그인 부분에서 체크 됨.
  try {
    // 실제 실행한 query를 client로 res 해서 send 해준다.
    res.send(await serverReq.db(req.params.alias, req.body.param))
  } catch (err) {
    res.status(500).send({
      error: err
      // 로그인 한 사용자만 볼 수 있을 쿼리가 있을 수도 있다.
      // ex) 제품 등록 화면 => 인증된 사용자만 쓴다.
      // 상단 /api/login 에서 선언
    })
  }
})
app.post('/api/boardUpdate', async (req, res) => {
  try {
    const test = 'boardUpdate'
    console.log('req.params', req.url)
    console.log('req.body.param', req.body.param)
    res.send(await serverReq.db(req.url, req.body.param))
  } catch (err) {
    res.status(500).send({
      error: err
    })
  }
})
app.post('/api/:alias', async (req, res) => {
  try {
    res.send(await serverReq.db(req.params.alias, req.body.param))
  } catch (err) {
    res.status(500).send({
      error: err
    })
  }
})
app.delete('/api/:alias', async (req, res) => {
  try {
    res.send(await serverReq.db(req.params.alias, req.body.param))
  } catch (err) {
    res.status(500).send({
      error: err
    })
  }
})
// dbPool의 query 함수를 통해 실제 mariadb에 우리가 원하는 query를 넘겨, 데이터를 받아 올 수 있다.
const serverReq = {
  async db(alias: string, param = []) {
    return new Promise((resolve, reject) => dbPool.query(sqls[alias].query, param, (error, rows) => {
      if (error) {
        if (error.code != 'ER_DUP_ENTRY') {
          console.log(error)
        } else {
          resolve({
            error
          })
        }
      } else {
        resolve(rows)
      }
    }))
  }
}

app.listen('3000', () => {
    console.log('Server started. port 3000! bread-geed')
})