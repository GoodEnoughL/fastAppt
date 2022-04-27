
function getHMData(base,timestamp){
  const date = new Date(base+timestamp * 1000) // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
    const h = `${date.getHours()}:`
    const m = `${date.getMinutes()}`
    // s = date.getSeconds()
    return h + m
}

function getLocaleDateZone() {
  return new Date(new Date().toDateString()).getTime()
}

function toUTC8DateZone(utc0) {
  return utc0 - 28800000
}

module.default = {
  getHMData,
  getLocaleDateZone,
  toUTC8DateZone
}