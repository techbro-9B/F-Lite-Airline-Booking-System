type sessionData = {
    flightId: number,
    uuid: string,
    seatsBooked: number,
}


var sessionData: sessionData = {
    flightId: 2,
    seatsBooked: 1,
    uuid: "77b2714f-5542-47b8-944c-4efb0a4e6f11",
}
var sessionDataSet = false
function setSessionData(setTo: sessionData) {
    sessionDataSet = true
    sessionData = setTo
}
function isSessionDataSet() {
    return sessionDataSet
}
function getSessionData() {
    return sessionData
}



export {setSessionData, getSessionData, isSessionDataSet, sessionData}