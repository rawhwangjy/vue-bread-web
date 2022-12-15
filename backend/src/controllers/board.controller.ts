import express from 'express'
const router = express.Router()
import serverReq from '../db'

// board register
router.post('/register', async (req, res) => {
  try {
    console.log('here register')
    console.log('register', req.body)
    const sql = `INSERT INTO admin_t_boards SET ?`
    res.send(await serverReq.db(sql, req.body))
  } catch (err) {
    res.status(500).send({
      error: err
    })
  }
})
// board list
router.post('/:boardType/boardList', async (req, res) => {
  try {
    console.log('here list')
    const sql = `SELECT * FROM admin_t_boards WHERE boardType = ?`
    res.send(await serverReq.db(sql, req.body.boardType))
  } catch (err) {
    res.status(500).send({
      error: err
    })
  }
})
// board detail
router.post('/:boardType/:id', async (req, res) => {
  try {
    console.log('here detail')
    const sql = `SELECT * FROM admin_t_boards WHERE id = ${req.body.id}`
    res.send(await serverReq.db(sql, req.body))
  } catch (err) {
    res.status(500).send({
      error: err
    })
  }
})
// board type
router.post('/:boardType', async (req, res) => {
  try {
    console.log('here type')
    const sql = `SELECT * FROM admin_t_board_config`
    res.send(await serverReq.db(sql, req.body))
  } catch (err) {
    res.status(500).send({
      error: err
    })
  }
})
// board update view
router.post('/:boardType/update/:id', async (req, res) => {
  try {
    console.log('here update')
    const sql = `SELECT * FROM admin_t_boards WHERE id = ${req.body.id}`
    res.send(await serverReq.db(sql, req.body))
  } catch (err) {
    res.status(500).send({
      error: err
    })
  }
})
// board update register
router.put('/:boardType/register/:id', async (req, res) => {
  try {
    console.log('here update register')
    console.log('update register', req.body)
    const sql = `UPDATE admin_t_boards SET ? WHERE id = ${req.body.id}`
    res.send(await serverReq.db(sql, req.body))
  } catch (err) {
    res.status(500).send({
      error: err
    })
  }
})

export default router