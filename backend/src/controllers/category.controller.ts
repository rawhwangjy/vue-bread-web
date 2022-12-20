import express from 'express'
const router = express.Router()
import serverReq from '../db'

// board list
router.post('/categoryList', async (req, res) => {
  try {
    console.log('category list')
    const sql = `SELECT * FROM admin_t_board_config`
    res.send(await serverReq.db(sql, req.body))
  } catch (err) {
    res.status(500).send({
      error: err
    })
  }
})
// board register
router.post('/register', async (req, res) => {
  try {
    console.log('here register')
    console.log('register', req.body)
    const sql = `INSERT INTO admin_t_board_config SET ?`
    res.send(await serverReq.db(sql, req.body))
  } catch (err) {
    res.status(500).send({
      error: err
    })
  }
})
// board update
router.put('/register/:id', async (req, res) => {
  try {
    console.log('here update register')
    console.log('update register', req.body)
    const sql = `UPDATE admin_t_board_config SET ? WHERE id = ${req.body.id}`
    res.send(await serverReq.db(sql, req.body))
  } catch (err) {
    res.status(500).send({
      error: err
    })
  }
})

export default router