// 将链表节点值存入数组，每次获取随机数，然后取对应下标的值
var Solution = function (head) {
  this.list = []
  while (head) {
    this.list.push(head.val)
    head = head.next
  }
  this.size = this.list.length
}

/**
 * @return {number}
 */
Solution.prototype.getRandom = function () {
  const random = Math.floor(Math.random() * this.size)
  return this.list[random]
}

// 不使用额外数组存储链表节点值，链表成环，每次随机走几步
var Solution = function (head) {
  this.head = head
  this.size = 1
  let pre = this.head,
    next = this.head.next
  while (next) {
    pre = next
    next = next.next
    this.size++
  }
  pre.next = this.head
}

/**
 * @return {number}
 */
Solution.prototype.getRandom = function () {
  let random = Math.floor(Math.random() * this.size)
  while (random) (this.head = this.head.next), random--
  return this.head.val
}

// 官方题解，蓄水池抽样
var Solution = function(head) {
  this.head = head;
};

Solution.prototype.getRandom = function() {
  let i = 1, ans = 0;
  for (let node = this.head; node != null; node = node.next) {
      if (Math.floor(Math.random() * i) === 0) { // 1/i 的概率选中（替换为答案）
          ans = node.val;
      }
      ++i;
  }
  return ans;
};