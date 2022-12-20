import express from 'express'
const router = express.Router()
import serverReq from '../db'

// board register
router.post('/:category/register', async (req, res) => {
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
router.post('/:category/boardList', async (req, res) => {
  try {
    console.log('here list')
    const sql = `SELECT * FROM admin_t_boards WHERE category = ?`
    res.send(await serverReq.db(sql, req.body.category))
  } catch (err) {
    res.status(500).send({
      error: err
    })
  }
})
// board detail
router.post('/:category/:id', async (req, res) => {
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
router.post('/:category', async (req, res) => {
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
// board update
router.put('/:category/update/:id', async (req, res) => {
  try {
    console.log('here update')
    console.log('update register', req.body)
    const sql = `UPDATE admin_t_boards SET ? WHERE id = ${req.body.id}`
    res.send(await serverReq.db(sql, req.body))
  } catch (err) {
    res.status(500).send({
      error: err
    })
  }
})
// board update register
router.delete('/delete/:id', async (req, res) => {
  try {
    console.log('here delete')
    const sql = `DELETE FROM admin_t_boards WHERE id = ${req.body.id}`
    res.send(await serverReq.db(sql, req.body))
  } catch (err) {
    res.status(500).send({
      error: err
    })
  }
})

export default router