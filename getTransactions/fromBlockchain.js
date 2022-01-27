var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider("https://speedy-nodes-nyc.moralis.io/cbb8954f6307cc8b1b70932e/bsc/mainnet"))
const jsonfile = require('jsonfile')

//I used blocks in which the transactions of this address are 
//instead of search the blocks between  11858824 and 12392042
//More Speed

const blocks = [11858824, 11858844, 11858871, 11859426, 11859983, 11869881, 11869921, 11874361,
    11874414, 11874510, 11874559, 11874625, 11874660, 11874702, 11875105, 11875142, 11875240,
    11875278, 11875307, 11875341, 11875360, 11875430, 11875489, 11875517, 11875561, 11875582, 11875611,
    11876070, 11876104, 11876296, 11876564, 11876600, 11878034, 11878904, 11878932, 11878987, 11879590,
    11879620, 11879650, 11879685, 11879706, 11879795, 11879825, 11879875, 11879939, 11879990, 11880019,
    11880046, 11880074, 11880098, 11880124, 11880151, 11880183, 11880206, 11880233, 11880237, 11880238,
    11880250, 11880290, 11880309, 11880339, 11880359, 11880395, 11880445, 11880497, 11880644, 11881981,
    11882611, 11967580, 11967601, 11967653, 11967658, 11967734, 11967858, 11970041, 11973783, 11987296,
    11987318, 11988337, 11992810, 11995888, 12065393, 12081029, 12131957, 12132004, 12132026, 12249314,
    12287156, 12298517, 12392042]


var i = 0
var index = 1
const contract = '0x1da200f724b6e707cD8B8593f2c270771B7FC769'

// getTransactions()

function getTransactions() {
    let hashes = []
    blocks.forEach(element => {
        web3.eth.getBlock(element, function (err, result) {
          result.transactions.forEach(each => {
              hashes.push(each)
              if (hashes.length > 29986) {
                hashes.reverse()
                setInterval(function(){ 
                    web3.eth.getTransaction(hashes[i], function (error, result) {
                        i += 1
                        if (result['to'] == contract) {
                            const file = `./blockchainData/transaction${index}.json`
                            jsonfile.writeFile(file, result, function (err) {
                                if (err) console.error(err)
                                index += 1
                            })
                        }
                    });
                }, 1500);
              }
          })
        })
  })   
}