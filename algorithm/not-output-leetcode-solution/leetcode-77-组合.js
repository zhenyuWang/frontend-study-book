var combine = function (n, k) {
  // i 接下来可以选择的数字
  // cnt 已经选择数字数量
  // n 最大可选择的数字
  // k 最多可选择数字数量
  // buff 已选择数字集合
  // ret 存储结果的数组
  function dfs(i, cnt, n, k, buff, ret) {
    // 说明已经选择了k个数字，将buff存入结果数组即可
    if (cnt === k) {
      ret.push(buff)
      return
    }
    // 如果还需要选择数字的数量大于可供选择的数字的数量，说明没办法获取指定数量的组合，退出
    if (k - cnt > n - i + 1) return
    // 选择当前数字
    dfs(i + 1, cnt + 1, n, k, [...buff, i], ret)
    // 不选择当前数字
    dfs(i + 1, cnt, n, k, buff, ret)
  }
  const ret = []
  dfs(1, 0, n, k, [], ret)
  return ret
}
