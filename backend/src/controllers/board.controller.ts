import express from 'express'
const router = express.Router()
import serverReq from '../db'

router.post('/board/boardList', async (req, res) => {
  try {
    const sql = `SELECT * FROM admin_t_boards WHERE boardType = ?`
    res.send(await serverReq.db(sql, req.body.boardType))
  } catch (err) {
    res.status(500).send({
      error: err
    })
  }
})
router.post('/board/:id', async (req, res) => {
  try {
    console.log('req.body.params.boardType', req.body)
    const sql = `SELECT * FROM admin_t_boards WHERE boardType = '${req.body.boardType}' AND id = ${req.body.id}`
    res.send(await serverReq.db(sql, req.body))
  } catch (err) {
    res.status(500).send({
      error: err
    })
  }
})

export default router