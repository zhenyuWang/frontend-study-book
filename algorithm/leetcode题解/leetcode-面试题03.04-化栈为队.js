var MyQueue = function() {
  // 入队栈
  this.stackin = []
  // 出队栈
  this.stackout = []
};

/**
 * Push element x to the back of queue.
 * @param {number} x
 * @return {void}
 */
MyQueue.prototype.push = function(x) {
  this.stackin.push(x)
};

/**
 * Removes the element from in front of queue and returns that element.
 * @return {number}
 */
MyQueue.prototype.pop = function() {
  // 出队栈为空时，从入队栈导入所有元素
  if(!this.stackout.length)
    while(this.stackin.length){
      this.stackout.push(this.stackin.pop())
    }
  return this.stackout.pop();
};

/**
 * Get the front element.
 * @return {number}
 */
MyQueue.prototype.peek = function() {
  // 出队栈为空时，从入队栈导入所有元素
  if(!this.stackout.length)
    while(this.stackin.length){
      this.stackout.push(this.stackin.pop())
    }
  return this.stackout[this.stackout.length-1]
};

/**
 * Returns whether the queue is empty.
 * @return {boolean}
 */
MyQueue.prototype.empty = function() {
  return this.stackin.length===0&&this.stackout.length===0
};