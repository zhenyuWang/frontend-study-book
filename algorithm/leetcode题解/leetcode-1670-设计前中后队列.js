var FrontMiddleBackQueue = function() {
    this.queue = []
  };
  
  /** 
   * @param {number} val
   * @return {void}
   */
  FrontMiddleBackQueue.prototype.pushFront = function(val) {
    this.queue.unshift(val);
  };
  
  /** 
   * @param {number} val
   * @return {void}
   */
  FrontMiddleBackQueue.prototype.pushMiddle = function(val) {
    this.queue.splice(this.queue.length>>1,0,val)
  };
  
  /** 
   * @param {number} val
   * @return {void}
   */
  FrontMiddleBackQueue.prototype.pushBack = function(val) {
    this.queue.push(val);
  };
  
  /**
   * @return {number}
   */
  FrontMiddleBackQueue.prototype.popFront = function() {
    if(this.queue.length===0) return -1;
    return this.queue.shift();
  };
  
  /**
   * @return {number}
   */
  FrontMiddleBackQueue.prototype.popMiddle = function() {
    if(this.queue.length===0) return -1;
    return this.queue.splice((this.queue.length-1)>>1,1)
  };
  
  /**
   * @return {number}
   */
  FrontMiddleBackQueue.prototype.popBack = function() {
    if(this.queue.length===0) return -1;
    return this.queue.pop();
  };