var validIPAddress = function (queryIP) {
  const v4Arr = queryIP.split('.')
  const v4Reg = /^[0-9]{1,3}$/g
  const v6Reg = /^[0-9a-fA-F]{1,4}(:[0-9a-fA-F]{1,4}){7}$/g

  if (v4Arr.length === 4) {
    for (let i = 0; i < 4; i++) {
      let item = v4Arr[i]
      v4Reg.lastIndex = 0

      if (!v4Reg.test(item) || (item.length > 1 && item[0] === '0') || item * 1 > 255) {
        return 'Neither'
      }
    }

    return 'IPv4'
  }

  if (v6Reg.test(queryIP)) {
    return 'IPv6'
  }

  return 'Neither'
}