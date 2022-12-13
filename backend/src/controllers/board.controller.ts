import express from 'express'
const router = express.Router()
import serverReq from '../db'

router.post('/:boardType', async (req, res) => {
  try {
    const sql = `SELECT * FROM admin_t_board_config`
    res.send(await serverReq.db(sql, req.body))
  } catch (err) {
    res.status(500).send({
      error: err
    })
  }
})
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
router.post('/board/register', async (req, res) => {
  try {
    console.log('register', req.body)
    const sql = `INSERT INTO admin_t_boards SET ?`
    res.send(await serverReq.db(sql, req.body))
  } catch (err) {
    res.status(500).send({
      error: err
    })
  }
})
router.post('/board/:id', async (req, res) => {
  try {
    const sql = `SELECT * FROM admin_t_boards WHERE boardType = '${req.body.boardType}' AND id = ${req.body.id}`
    res.send(await serverReq.db(sql, req.body))
  } catch (err) {
    res.status(500).send({
      error: err
    })
  }
})

export default router