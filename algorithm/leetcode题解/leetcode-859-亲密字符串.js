/**
  长度不同 false
  不同的位置只有一个 false
  不同的位置超过两个 false
  s中有两个位置字符相同且 s===goal true
  有两个位置不同，但是交换后 s===goal true
 */
  var buddyStrings = function(s, goal) {
    // 长度不同
    if(s.length!==goal.length) return false;
    // 记录第一个不同位置 第二个不同位置
    let pre = -1,next = -1,
    // 利用set 和 flag 标识 s 中是否有两个位置字符相同
    set = new Set(),
    flag = false;
    for(let i = 0;i<s.length;i++){
      if(set.has(s[i])) flag = true;
      else set.add(s[i])
      if(s[i]===goal[i]) continue;
      if(pre===-1) pre = i;
      else if(next===-1) next = i;
      // 不同的位置超过两个
      else return false;
    }
    // 此时说明两个字符串完全相同，返回 s 中是否有两个相同字符即可
    if(pre===-1) return flag;
    // 不同的位置只有一个
    if(next===-1) return false;
    // 正好有两个位置不同，判断交换后 s 是否等于 goal
    return (s[pre] === goal[next]) && (goal[pre] === s[next])
  };