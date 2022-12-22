import express from 'express'
const router = express.Router()
import serverReq from '../db'

// board register
router.post('/:category/register', async (req, res) => {
  try {
    console.log('board register', req.body)
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
    console.log('board list', req.body)
    const sql = `
      SELECT a.id, a.title, a.content, a.agree, b.category
      FROM admin_t_boards AS a
        INNER JOIN admin_t_board_config AS b
        ON a.categoryId = b.id
      WHERE b.category = '${req.body.category}'`
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
    console.log('board detail', req.body)
    const sql = `
      SELECT a.id, a.title, a.content, a.agree, a.categoryId, b.category
      FROM admin_t_boards as a
        INNER JOIN admin_t_board_config as b
        ON a.categoryId = b.id
      WHERE a.id = '${req.body.id}'`
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
    console.log('board update', req.body)
    const sql = `
      UPDATE admin_t_boards
      SET id = ${req.body.id}, 
        categoryId = ${req.body.categoryId}, 
        title = '${req.body.title}', 
        content = '${req.body.content}', 
        agree = ${req.body.agree}
      WHERE id = ${req.body.id}`
    res.send(await serverReq.db(sql, req.body))
  } catch (err) {
    res.status(500).send({
      error: err
    })
  }
})
// board delete
router.delete('/delete/:id', async (req, res) => {
  try {
    console.log('board delete', req.body)
    const sql = `DELETE FROM admin_t_boards WHERE id = ${req.body.id}`
    res.send(await serverReq.db(sql, req.body))
  } catch (err) {
    res.status(500).send({
      error: err
    })
  }
})
// board delete
router.delete('/deleteList/:id', async (req, res) => {
  try {
    console.log('boardList delete', req.body)
    const sql = `DELETE FROM admin_t_boards WHERE categoryId = ${req.body.id}`
    res.send(await serverReq.db(sql, req.body))
  } catch (err) {
    res.status(500).send({
      error: err
    })
  }
})

export default router