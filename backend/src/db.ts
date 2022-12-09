import mysql from 'mysql'

const db = {
  database: 'dev', // db 이름
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: 'mariadb'
}
const dbPool = mysql.createPool(db)

const serverReq = {
  async db(sqls: string, param = []) {
    return new Promise((resolve, reject) => dbPool.query(sqls, param, (error, rows) => {
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

export default serverReq