var findOrder = function (numCourses, prerequisites) {
  // 初始化 nums 数组记录每个课程的入度数量
  const nums = Array(numCourses).fill(0),
    // 初始化 map 数组记录课程间的依赖关系
    map = Array(numCourses)
  // 遍历输入数组，记录入度数量和课程间的依赖关系
  for (let i = 0; i < prerequisites.length; i++) {
    const [a, b] = prerequisites[i]
    nums[a]++
    if (map[b]) map[b].push(a)
    else map[b] = [a]
  }
  // 初始化结果数组，保存学习课程的顺序
  const res = [],
  // 初始化中间队列为空数组
  queue = []
  // 遍历 nums 数组，将入度为 0 的课程首先放入队列
  for (let i = 0; i < numCourses; i++) {
    if (nums[i] === 0) queue.push(i)
  }
  // 当队列不为空的时候
  while (queue.length) {
    // 弹出队首的元素
    const cur = queue.shift(),
    // 获取依赖当前课程的课程列表
    list = map[cur];
    // 将当前课程放入结果数组
    res.push(cur)
    // 如果有依赖当前课程的课程，将它们的入度 -1
    if (list) {
      for (let i = 0; i < list.length; i++) {
        nums[list[i]]--
        // 如果某个课程的入度为 0，将其放入队列
        if (nums[list[i]] === 0) queue.push(list[i])
      }
    }
  }
  // 如果学完课程的数量等于课程总数，返回学习课程的顺序，否则返回空数组
  return res.length === numCourses ? res : []
}
