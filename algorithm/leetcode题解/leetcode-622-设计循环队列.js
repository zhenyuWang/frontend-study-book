var MyCircularQueue = function(k) {
    // 记录长度
    this.max = k;
    // 队列
    this.queue = [];
    // 头指针
    this.head = -1;
    // 尾指针
    this.end = -1;
    // 队列中元素数量
    this.size = 0;
  };
  
  /** 
   * @param {number} value
   * @return {boolean}
   */
  MyCircularQueue.prototype.enQueue = function(value) {
    if(this.isFull()) return false;
    // 如果此时为初始化状态，第一个元素放在下标0位置，更新head指针
    if(this.head === -1) this.head = 0;
    // end指针向后走一步
    if(this.end === this.max-1) this.end = 0;
    else this.end++;
    // 更新 size
    this.size++;
    // 将 value 放到更新后 end 指针所在位置
    this.queue[this.end] = value;
    return true;
  };
  
  /**
   * @return {boolean}
   */
  MyCircularQueue.prototype.deQueue = function() {
    if(this.isEmpty()) return false;
    // 删除操作只需要调整头指针向后走一步即可
    if(this.head === this.max-1) this.head = 0;
    else this.head++;
    // 更新 size
    this.size--;
    return true;
  };
  
  /**
   * @return {number}
   */
  MyCircularQueue.prototype.Front = function() {
    if(this.isEmpty()) return -1;
    return this.queue[this.head]
  };
  
  /**
   * @return {number}
   */
  MyCircularQueue.prototype.Rear = function() {
    if(this.isEmpty()) return -1;
    return this.queue[this.end]
  };
  
  /**
   * @return {boolean}
   */
  MyCircularQueue.prototype.isEmpty = function() {
    return this.size === 0
  };
  
  /**
   * @return {boolean}
   */
  MyCircularQueue.prototype.isFull = function() {
    return this.size === this.max
  };