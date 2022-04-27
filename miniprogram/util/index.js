
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

function sumDHM(baseDate,hm) {
  return baseDate + hm
}

function timestampToTime(timestamp) {
  var date = new Date(timestamp);
  var Y = date.getFullYear() + '-';
  var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
  var D = (date.getDate() < 10 ? '0'+date.getDate() : date.getDate()) + ' ';
  var h = (date.getHours() < 10 ? '0'+date.getHours() : date.getHours()) + ':';
  var m = (date.getMinutes() < 10 ? '0'+date.getMinutes() : date.getMinutes()) + ':';
  var s = (date.getSeconds() < 10 ? '0'+date.getSeconds() : date.getSeconds());
  
  let strDate = Y+M+D+h+m+s;
  return strDate;
}
module.default = {
  getHMData,
  getLocaleDateZone,
  toUTC8DateZone,
  sumDHM,
  timestampToTime
}