
function getHMData(base,timestamp){
  const date = new Date(base+timestamp * 1000) // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
    const h = `${date.getHours()}:`
    const m = `${date.getMinutes()}`
    // s = date.getSeconds()
    return h + m
}

function getLocaleDateZone() {
  new Date(new Date().toDateString()).getTime()
}

module.default = {
  getHMData,
  getLocaleDateZone
}