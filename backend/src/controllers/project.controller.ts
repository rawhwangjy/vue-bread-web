import express from 'express'
const router = express.Router()
import serverReq from '../db'
import { upload } from '../upload'

// project register
router.post('/register', upload.array('fileList'), async (req, res) => {
  try {
    console.log('project register', req.body)
    const project = {
      title: req.body.title,
      introduce: req.body.introduce,
      type: {
        mo: req.body.mo,
        pc: req.body.pc,
        all: req.body.all
      },
      date: {
        startDate: req.body.startDate,
        endDate: req.body.endDate
      },
      fileList: Array(),
      skills: {
        html4: req.body.html4,
        html5: req.body.html5,
        css2: req.body.css2,
        css3: req.body.css3,
        sass: req.body.sass,
        photoshop: req.body.photoshop,
        sketch: req.body.sketch,
        zeplin: req.body.zeplin,
        javascript: req.body.javascript,
        typescript: req.body.typescript,
        vue2: req.body.vue2,
        vue3: req.body.vue3,
        jquery: req.body.jquery,
        git: req.body.git,
        eclipse: req.body.eclipse,
        node: req.body.node,
        npm: req.body.npm
      }
    }
    if (req.files) {
      [req.files].forEach(file => {
        for (const value of Object.values(file)) {
          project.fileList.push(value.filename)
        }
      })
    }
    const sql = `
      INSERT INTO t_projects
      SET title = '${project.title}',
        introduce = '${project.introduce}',


        fileList = '${project.fileList}',

        html4 = ${project.skills.html4},
        html5 = ${project.skills.html5},
        css2 = ${project.skills.css2},
        css3 = ${project.skills.css3},
        sass = ${project.skills.sass},
        photoshop = ${project.skills.photoshop},
        sketch = ${project.skills.sketch},
        zeplin = ${project.skills.zeplin},
        javascript = ${project.skills.javascript},
        typescript = ${project.skills.typescript},
        vue2 = ${project.skills.vue2},
        vue3 = ${project.skills.vue3},
        jquery = ${project.skills.jquery},
        git = ${project.skills.git},
        eclipse = ${project.skills.eclipse},
        node = ${project.skills.node},
        npm = ${project.skills.npm}
    `
    res.send(await serverReq.db(sql))
  } catch (err) {
    console.log('errrre')
    res.status(500).send({
      error: err
    })
  }
})
// // board list
// router.post('/:category/boardList', async (req, res) => {
//   try {
//     console.log('board list', req.body)
//     const sql = `
//       SELECT a.id, a.title, a.content, a.agree, b.category
//       FROM t_projects AS a
//         INNER JOIN t_board_config AS b
//         ON a.categoryId = b.id
//       WHERE b.category = '${req.body.category}'`
//     res.send(await serverReq.db(sql))
//   } catch (err) {
//     res.status(500).send({
//       error: err
//     })
//   }
// })
// // board detail
// router.post('/:category/:id', async (req, res) => {
//   try {
//     console.log('board detail', req.body)
//     const sql = `
//       SELECT a.id, a.categoryId, a.title, a.content, a.agree, a.fileList, b.category
//       FROM t_projects as a
//         INNER JOIN t_board_config as b
//         ON a.categoryId = b.id
//       WHERE a.id = ${req.body.id}` // '' 하는 게 맞나? => 형에 너무 유연한디
//     res.send(await serverReq.db(sql))
//   } catch (err) {
//     res.status(500).send({
//       error: err
//     })
//   }
// })
// // board update
// router.put('/:category/update/:id', upload.array('fileList'), async (req, res) => {
//   try {
//     console.log('board update', req.body)
//     const board = {
//       categoryId: Number(req.body.categoryId),
//       title: req.body.title,
//       content: req.body.content,
//       agree: Boolean(req.body.agree),
//       fileList: Array()
//     }
//     if (req.files) {
//       [req.files].forEach(file => { 
//         for (const value of Object.values(file)) {
//           board.fileList.push(value.filename)
//         }
//       })
//     }
//     const sql = `
//       UPDATE t_projects
//       SET id = ${req.body.id},
//         categoryId = ${board.categoryId}, 
//         title = '${board.title}', 
//         content = '${board.content}', 
//         agree = ${board.agree},
//         fileList = '${board.fileList}'
//       WHERE id = ${req.body.id}`
//     // const sql = `
//     //   UPDATE t_projects
//     //   SET id = ${req.body.id}, 
//     //     categoryId = ${req.body.categoryId}, 
//     //     title = '${req.body.title}', 
//     //     content = '${req.body.content}', 
//     //     agree = ${req.body.agree}
//     //   WHERE id = ${req.body.id}`
//     res.send(await serverReq.db(sql))
//   } catch (err) {
//     res.status(500).send({
//       error: err
//     })
//   }
// })
// // board delete
// router.delete('/delete/:id', async (req, res) => {
//   try {
//     console.log('board delete', req.body)
//     const sql = `DELETE FROM t_projects WHERE id = ${req.body.id}`
//     res.send(await serverReq.db(sql))
//   } catch (err) {
//     res.status(500).send({
//       error: err
//     })
//   }
// })
// // board delete
// router.delete('/deleteList/:id', async (req, res) => {
//   try {
//     console.log('boardList delete', req.body)
//     const sql = `DELETE FROM t_projects WHERE categoryId = ${req.body.id}`
//     res.send(await serverReq.db(sql))
//   } catch (err) {
//     res.status(500).send({
//       error: err
//     })
//   }
// })

export default router