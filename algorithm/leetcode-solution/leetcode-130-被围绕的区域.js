var solve = function (board) {
  // 获取矩阵的纵向长度和横向长度
  const m = board.length,
    n = board[0].length
  // 将没有被环绕的 O 打上标记
  function tag(i, j) {
    // 如果当前坐标不合法或者当前区域不是 O，直接返回
    if (i < 0 || i >= m || j < 0 || j >= n || board[i][j] !== 'O') return
    // 将当前区域打上标记
    board[i][j] = 'A'
    // 处理与之相连的区域
    tag(i - 1, j)
    tag(i + 1, j)
    tag(i, j - 1)
    tag(i, j + 1)
  }
  // 上
  for (let j = 0; j < n; j++) tag(0, j)
  // 下
  for (let j = 0; j < n; j++) tag(m - 1, j)
  // 左
  for (let i = 0; i < m; i++) tag(i, 0)
  // 右
  for (let i = 0; i < m; i++) tag(i, n - 1)
  // 扫描矩阵，将没有标记的 O 改为 X,被标记的 O 保持为 O
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (board[i][j] === 'O') board[i][j] = 'X'
      if (board[i][j] === 'A') board[i][j] = 'O'
    }
  }
}
