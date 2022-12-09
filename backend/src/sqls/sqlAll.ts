// const boardList = {
//     query: 'select * from t_board'
// }
// const boardList2 = {
//     query: 'select * from t_board'
// }

// export { boardList, boardList2}
interface sqlItems {
  [key: string]: {
    [key: string]: string
  }
}
export const sqls: sqlItems = {
  boardList: {
    // query: 'select t1.id, t1.name, t1.type, t1.introduce, t2.*
    // from t_board t1, t_skill t2
    // where t1.id = t2.boardId'
    query: 'select * from t_board'
  },
  boardDetail: {
    query: `SELECT t1.*, t2.*, t3.* FROM t_board t1, t_skill t2, t_image t3 
    WHERE t1.id = ? AND t2.boardId = t1.id AND t3.boardId = t1.id`
  },
  imagesList: {
    query: 'select * from t_image where boardId = ?'
  },
  skillList: {
    query: 'select * from t_skill where boardId = ?'
  },
  // Delete
  boardDelete: {
    query: 'DELETE FROM t_board WHERE id = ?'
  },
  skillDelete: {
    query: 'DELETE FROM t_skill WHERE boardId = ?'
  },
  imageDelete: {
    query: 'DELETE FROM t_image WHERE boardId = ?'
  },
  // Insert
  // INSERT INTO t_board (board_name, board_type) VALUES (?, ?)
  boardInsert: {
    query: 'INSERT INTO t_board SET ?'
  },
  skillInsert: {
    query: 'INSERT INTO t_skill SET ?'
  },
  imageInsert: {
    query: 'INSERT INTO t_image SET ?'
  },
  // Update
  boardUpdate: {
    query: 'UPDATE t_board SET ? WHERE id = `id`'
    // update board set name=? , title=?,content=?, modidate=now() where idx=? and passwd=?
  }
}