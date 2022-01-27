const request = require('request');
const jsonfile = require('jsonfile')
const file = './data.json'

//BSC
http://api.bscscan.com/api?module=account&action=txlist&address=0x1da200f724b6e707cD8B8593f2c270771B7FC769&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=YourApiKeyToken

//ETH
https://api.etherscan.io/api?module=account&action=txlist&address=0xddbd2b932c763ba5b1b7ae3b362eac3e8d40121a&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=YourApiKeyToken


function getData() {
    const url = 'http://api.bscscan.com/api?module=account&action=txlist&address=0x1da200f724b6e707cD8B8593f2c270771B7FC769&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=K12MZAZIVY94RP91X4THBUKUX4RTTINPW1'
    request.get(url, function (err, response, body) {
        if (!err && response.statusCode == 200) {
            const data = response
            jsonfile.writeFile(file, data)
                .then(res => {
                    //done
                    return
                })
                .catch(error => console.error(error))
        }
    })
}

getData()

