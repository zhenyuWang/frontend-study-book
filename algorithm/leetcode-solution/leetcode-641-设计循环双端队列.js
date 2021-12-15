var MyCircularDeque = function(k) {
    this.max = k;
    this.queue = [];
    this.head = -1;
    this.end = -1;
    this.size = 0;
  };
  
  /** 
   * @param {number} value
   * @return {boolean}
   */
  MyCircularDeque.prototype.insertFront = function(value) {
    if(this.isFull()) return false;
    if(this.head===-1){
      this.head = 0;
      this.end = 0;
    }else if(this.head === 0){
      this.head = this.max-1
    }else{
      this.head--
    }
    this.size++;
    this.queue[this.head] = value;
    return true;
  };
  
  /** 
   * @param {number} value
   * @return {boolean}
   */
  MyCircularDeque.prototype.insertLast = function(value) {
    if(this.isFull()) return false;
    if(this.end===-1){
      this.head = 0;
      this.end = 0;
    }else if(this.end === this.max-1){
      this.end = 0
    }else{
      this.end++
    }
    this.size++;
    this.queue[this.end] = value;
    return true;
  };
  
  /**
   * @return {boolean}
   */
  MyCircularDeque.prototype.deleteFront = function() {
    if(this.isEmpty()) return false;
    if(this.head === this.max-1){
      this.head = 0
    }else{
      this.head++
    }
    this.size--;
    return true;
  };
  
  /**
   * @return {boolean}
   */
  MyCircularDeque.prototype.deleteLast = function() {
    if(this.isEmpty()) return false;
    if(this.end === 0){
      this.end = this.max-1;
    }else{
      this.end--;
    }
    this.size--;
    return true;
  };
  
  /**
   * @return {number}
   */
  MyCircularDeque.prototype.getFront = function() {
    if(this.isEmpty()) return -1;
    return this.queue[this.head]
  };
  
  /**
   * @return {number}
   */
  MyCircularDeque.prototype.getRear = function() {
    if(this.isEmpty()) return -1;
    return this.queue[this.end]
  };
  
  /**
   * @return {boolean}
   */
  MyCircularDeque.prototype.isEmpty = function() {
    return this.size === 0
  };
  
  /**
   * @return {boolean}
   */
  MyCircularDeque.prototype.isFull = function() {
    return this.size === this.max
  };