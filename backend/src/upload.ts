import express from 'express'
const app = express()
import multer from 'multer'
import path from 'path'

// app.use('/image', express.static('upload'))

app.use(express.static(('upload')))
// 저장한 파일 조회
// 정적인 파일이 접근할 라우터 path 설정 // (express.static 함수를 통해 제공되는 파일에 대한 가상 경로)
// /board 경로를 통해 upload 디렉토리에 포함된 파일 로드할 수 있음.

const storage = multer.diskStorage({
  destination: (req: any, file: any, cb: any) => {	// 경로 => uploads 폴더
    console.log('destination', __dirname)
    cb(null, path.join(__dirname, '/upload/'))
  },
  filename: (req: any, file: any, cb: any) => {	// 파일명 => 이미지 업로드시 원본 이름 그대로
    const ext = path.extname(file.originalname)
    const basename = path.basename(file.originalname, ext)
    cb(null, `${basename}_${Date.now()}_${ext}`);
  }
})

export const upload = multer({ storage });
