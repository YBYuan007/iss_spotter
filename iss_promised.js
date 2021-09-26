const request = require("request-promise-native"); 

const fetchMyIP = function (){
  return request("https://api.ipify.org?format=json");
};


const fetchCoordsByIP = function (body){
  const ip = JSON.parse(body).ip;
  return request(`https://freegeoip.app/json/${ip}`);
};

const fetchISSFlyOverTimes = function (body) {
  const lalo = JSON.parse(body);
  return request(`https://iss-pass.herokuapp.com/jjjjjjson/?lat=${lalo.latitude}&lon=${lalo.longitude}`)
}
const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then((data) => {
      const { response } = JSON.parse(data);
      return response;
    });
};

module.exports = { nextISSTimesForMyLocation };