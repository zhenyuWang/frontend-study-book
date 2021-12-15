var RecentCounter = function() {
    // 初始化队列
    this.queue = [];
  };
  
  /** 
   * @param {number} t
   * @return {number}
   */
  RecentCounter.prototype.ping = function(t) {
    // 当队列不为空且队首元素小于t-3000的时候，删除队首元素
    while(this.queue.length && this.queue[0]<t-3000){
      this.queue.shift();
    }
    // 此时就保证了队列中的值都是大于等于 t-3000 的
    // 将新的请求入队
    this.queue.push(t);
    // 返回队列的长度即 t-3000~t时间段中的请求数量
    return this.queue.length;
  };