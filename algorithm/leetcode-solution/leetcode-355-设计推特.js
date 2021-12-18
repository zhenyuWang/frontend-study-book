var Twitter = function() {
  // 自增id
  this.id = 0;
  // 用户列表
  this.users = {};
};

/**
 * @param {number} userId
 * @param {number} tweetId
 * @return {void}
 */
Twitter.prototype.postTweet = function(userId, tweetId) {
  // 如果当前用户数据没有初始化，进行初始化
  if(!this.users[userId]) this.users[userId] = {
    list:[],
    follows:new Set()
  }
  // 将当前推文存入用户推文列表中
  this.users[userId].list.push({id:this.id++,tweetId})
  // 维护用户推文列表只保存最近的十条推文
  if(this.users[userId].list.length>10) this.users[userId].list.shift();
};

/**
 * @param {number} userId
 * @return {number[]}
 */
Twitter.prototype.getNewsFeed = function(userId) {
  // 因为会在用户发送推文或者用户关注其他人的时候初始化用户数据
  // 所以此时如果用户数据未初始化，则说明用户没有发送过推文，也没有关注过其他用户，返回 []
  if(!this.users[userId]) return [];
  // 收集当前用户最近十条推文及其关注的人的最近十条推文的合集
  let arr = this.users[userId].list;
  this.users[userId].follows.forEach(item => {
    if(this.users[item]){
      arr = [...arr,...this.users[item].list]
    }
  })
  // 按照时间顺序从近到远排序
  arr.sort((a,b) => b.id-a.id);
  // 获取最近的十条推文的id
  const res = [];
  for(let i = 0;i<Math.min(arr.length,10);i++){
    res.push(arr[i].tweetId)
  }
  return res;
};

/**
 * @param {number} followerId
 * @param {number} followeeId
 * @return {void}
 */
Twitter.prototype.follow = function(followerId, followeeId) {
  // 如果当前关注者数据未初始化，则进行初始化
  if(!this.users[followerId]) this.users[followerId] = {
    list:[],
    follows:new Set()
  }
  // 将被关注者用户ID添加到关注者关注列表中
  this.users[followerId].follows.add(followeeId)
};

/**
 * @param {number} followerId
 * @param {number} followeeId
 * @return {void}
 */
Twitter.prototype.unfollow = function(followerId, followeeId) {
  // 将被关注者用户ID从关注者关注列表中删除
  this.users[followerId].follows.delete(followeeId)
};