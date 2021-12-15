var MyLinkedList = function() {
  this.list = [];
};

/**
 * @param {number} index
 * @return {number}
 */
MyLinkedList.prototype.get = function(index) {
  if(index<0 || index>=this.list.length) return -1;
  return this.list[index]
};

/**
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtHead = function(val) {
  this.list.unshift(val);
};

/**
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtTail = function(val) {
  this.list.push(val);
};

/**
 * @param {number} index
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtIndex = function(index, val) {
  if(index<0) this.addAtHead(val)
  else if(index===this.list.length) this.addAtTail(val)
  else if(index>this.list.length) return;
  else this.list.splice(index,0,val)
};

/**
 * @param {number} index
 * @return {void}
 */
MyLinkedList.prototype.deleteAtIndex = function(index) {
  if(index<0 || index>=this.list.length) return;
  this.list.splice(index,1)
};