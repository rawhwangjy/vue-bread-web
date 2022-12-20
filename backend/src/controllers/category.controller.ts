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

export default router