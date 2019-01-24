/**
 * Function that accepts a Tx receipt and returns a promise for the successfully mined block associated to the receipt
 *
 * @param {String|Object} txReceipt
 * @param {Number} interval
 * @param {Number} timeout
 *
 * @returns {Promise} A promise which resolves to the succesfully mined block
 */
const defaults = {
  interval: 1000, // 1sec
  timeout: null
}
const getMinedTx = function(txReceipt, options) {
  const { interval, timeout } = Object.assign(defaults, options)

  if (typeof txReceipt === "object") {
    txReceipt = txReceipt.hash
  }

  return new Promise((resolve, reject) => {
    let timedOutId
    if (timeout > 0) {
      timedOutId = setTimeout(
        reject,
        timeout,
        new Error("Timed out before transaction was found. Are you on the correct network?")
      )
    }

    function checkTx() {
      window.web3.eth.getTransactionReceipt(txReceipt, (err, res) => {
        if (err) {
          timedOutId && clearTimeout(timedOutId)
          reject(err)
        } else if (res && res.blockNumber) {
          timedOutId && clearTimeout(timedOutId)
          resolve(res)
        } else {
          setTimeout(checkTx, interval)
        }
      })
    }
    checkTx()
  })
}

export {
  getMinedTx
}
