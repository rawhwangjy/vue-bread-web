import express from 'express'
const router = express.Router()
import serverReq from '../db'
import { upload } from '../upload'


const app = express()

// board register
router.post('/:category/register', upload.array('fileList'), async (req, res) => {
  try {
    console.log('board register', req.body)
    const board = {
      categoryId: Number(req.body.categoryId),
      title: req.body.title,
      content: req.body.content,
      agree: Boolean(req.body.agree),
      fileList: Array()
    }
    if (req.files) {
      [req.files].forEach(file => {
        for (const value of Object.values(file)) {
          board.fileList.push(value.filename)
        }
      })
    }
    const sql = `
      INSERT INTO t_boards
      SET categoryId = ${board.categoryId}, 
        title = '${board.title}', 
        content = '${board.content}', 
        agree = ${board.agree},
        fileList = '${board.fileList}'`
    res.send(await serverReq.db(sql))
  } catch (err) {
    console.log('errrre')
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
      FROM t_boards AS a
        INNER JOIN t_board_config AS b
        ON a.categoryId = b.id
      WHERE b.category = '${req.body.category}'`
    res.send(await serverReq.db(sql))
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
      SELECT a.id, a.categoryId, a.title, a.content, a.agree, a.fileList, b.category
      FROM t_boards as a
        INNER JOIN t_board_config as b
        ON a.categoryId = b.id
      WHERE a.id = ${req.body.id}` // '' 하는 게 맞나? => 형에 너무 유연한디
    res.send(await serverReq.db(sql))
  } catch (err) {
    res.status(500).send({
      error: err
    })
  }
})
// board update
router.put('/:category/update/:id', upload.array('fileList'), async (req, res) => {
  try {
    console.log('board update', req.body)
    const board = {
      categoryId: Number(req.body.categoryId),
      title: req.body.title,
      content: req.body.content,
      agree: Boolean(req.body.agree),
      fileList: Array()
    }
    if (req.files) {
      [req.files].forEach(file => { 
        for (const value of Object.values(file)) {
          board.fileList.push(value.filename)
        }
      })
    }
    const sql = `
      UPDATE t_boards
      SET id = ${req.body.id},
        categoryId = ${board.categoryId}, 
        title = '${board.title}', 
        content = '${board.content}', 
        agree = ${board.agree},
        fileList = '${board.fileList}'
      WHERE id = ${req.body.id}`
    // const sql = `
    //   UPDATE t_boards
    //   SET id = ${req.body.id}, 
    //     categoryId = ${req.body.categoryId}, 
    //     title = '${req.body.title}', 
    //     content = '${req.body.content}', 
    //     agree = ${req.body.agree}
    //   WHERE id = ${req.body.id}`
    res.send(await serverReq.db(sql))
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
    const sql = `DELETE FROM t_boards WHERE id = ${req.body.id}`
    res.send(await serverReq.db(sql))
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
    const sql = `DELETE FROM t_boards WHERE categoryId = ${req.body.id}`
    res.send(await serverReq.db(sql))
  } catch (err) {
    res.status(500).send({
      error: err
    })
  }
})

export default router