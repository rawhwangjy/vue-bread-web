import express from 'express'
const router = express.Router()
import serverReq from '../db'
import { upload } from '../upload'

// project register
router.post('/register', upload.fields([{ name: 'fileListPc'}, { name: 'fileListMobile'}]), async (req, res) => {
  try {
    console.log('project register', req.body)
    const project = {
      title: req.body.title,
      introduce: req.body.introduce,
      role: req.body.role,
      company: req.body.company,
      orderCompany: req.body.orderCompany,
      jobs: req.body.jobs,
      type: {
        mobile: req.body.mobile,
        pc: req.body.pc
      },
      date: {
        startDate: {
          year: req.body.startYear,
          month: req.body.startMonth
        },
        endDate: {
          year: req.body.endYear,
          month: req.body.endMonth
        }
      },
      fileList: {
        mobile: Array(),
        pc: Array()
      },
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
      for (const [key, value] of Object.entries(req.files)) {
        if (key === 'fileListMobile') {
          value.filter((item: Object) => {
            for (const [mobileKey, mobileValue] of Object.entries(item)) {
              if (mobileKey === 'filename') {
                project.fileList.mobile.push(mobileValue)
              }
            }
          })
        }
        if (key === 'fileListPc') {
          value.filter((item: Object) => {
            for (const [pcKey, pcValue] of Object.entries(item)) {
              if (pcKey === 'filename') {
                project.fileList.pc.push(pcValue)
              }
            }
          })
        }
      }
    }
    console.log('project', project.fileList)
    const sql = `
      INSERT INTO t_projects
      SET title = '${project.title}',
      introduce = '${project.introduce}',
      role = '${project.role}',
      company = '${project.company}',
      orderCompany = '${project.orderCompany}',
      jobs = '${project.jobs}',

      typeMobile = ${project.type.mobile},
      typePc = ${project.type.pc},

      startYear = '${project.date.startDate.year}',
      startMonth  = '${project.date.startDate.month}',
      endYear = '${project.date.endDate.year}',
      endMonth  = '${project.date.endDate.month}',

      fileListMobile = '${project.fileList.mobile}',
      fileListPc = '${project.fileList.pc}',

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
router.post('/projectList', async (req, res) => {
  try {
    console.log('board list', req.body)
    const sql = `
      SELECT id, title, introduce, startYear, startMonth, endYear, endMonth
      FROM t_projects`
    res.send(await serverReq.db(sql))
  } catch (err) {
    res.status(500).send({
      error: err
    })
  }
})
// board detail
router.post('/:id', async (req, res) => {
  try {
    console.log('board detail', req.body)
    const sql = `
      SELECT *
      FROM t_projects
      WHERE id = ${req.body.id}` // '' 하는 게 맞나? => 형에 너무 유연한디
    res.send(await serverReq.db(sql))
  } catch (err) {
    res.status(500).send({
      error: err
    })
  }
})
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