// 递归
var GetImportance = function (employees, id) {
  // 利用 Map 记录 id 到数据的映射，方便后续获取数据
  const map = new Map()
  for (let i = 0; i < employees.length; i++) {
    const { id, importance, subordinates } = employees[i]
    map.set(id, [importance, subordinates])
  }
  // 初始化结果值为 0
  let res = 0
  // 递归计算方法
  function calc(item) {
    // 结果值累加当前员工数据的重要性
    res += item[0]
    // 遍历当前员工的直系下属列表
    for (let i = 0; i < item[1].length; i++) {
      // 对每个直系下属的数据进行递归处理
      calc(map.get(item[1][i]))
    }
  }
  // 调用递归函数，并传入给定员工的数据
  calc(map.get(id))
  // 返回结果
  return res
}

// 队列
var GetImportance = function (employees, id) {
  // 利用 Map 记录 id 到数据的映射，方便后续获取数据
  const map = new Map()
  for (let i = 0; i < employees.length; i++) {
    const { id, importance, subordinates } = employees[i]
    map.set(id, [importance, subordinates])
  }
  // 初始化结果值为 0
  let res = 0
  // 初始化队列
  const list = [map.get(id)]
  // 处理队列中的数据，直到队列为空
  while (list.length) {
    // 获取队首数据
    const top = list.shift()
    // 累加重要度
    res += top[0]
    // 将其直系下属的数据入队
    for (let i = 0; i < top[1].length; i++) {
      list.push(map.get(top[1][i]))
    }
  }
  // 返回结果
  return res
}

// 栈
var GetImportance = function (employees, id) {
  // 利用 Map 记录 id 到数据的映射，方便后续获取数据
  const map = new Map()
  for (let i = 0; i < employees.length; i++) {
    const { id, importance, subordinates } = employees[i]
    map.set(id, [importance, subordinates])
  }
  // 初始化结果值为 0
  let res = 0
  // 初始化栈
  const stack = [map.get(id)]
  // 处理栈中的数据，直到栈为空
  while (stack.length) {
    // 取出栈顶元素
    const top = stack.pop()
    // 累加重要度
    res += top[0]
    // 将其直系下属的数据入栈
    for (let i = 0; i < top[1].length; i++) {
      stack.push(map.get(top[1][i]))
    }
  }
  // 返回结果
  return res
}
