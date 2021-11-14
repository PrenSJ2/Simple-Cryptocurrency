const SHA256 = require('crypto-js/sha256')

class CryptoBlock{
    constructor(index, timestamp, data, precedingHash=" "){
        this.index = index
        this.timestamp= timestamp
        this.data = data
        this.precedingHash = precedingHash
        this.hash = this.computeHash()
        this.nonce = 0
    }

    computeHash(){
        return SHA256(
            this.index + 
            this.precedingHash + 
            this.timestamp + 
            JSON.stringify(this.data) + 
            this.nonce
        ).toString()
    }

    proofOfWork(difficulty) {
        while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
          this.nonce++
          this.hash = this.computeHash()
        }
      }

}

class CryptoBlockchain{
    constructor(){
        this.blockchain = [this.startGenesisBlock()]
        this.difficulty = 4
    }

    startGenesisBlock(){
        return new CryptoBlock(0, "14/11/2021", "The First Block in the Blockchain", "0")
    }

    obtainLatestBlock(){
        return this.blockchain[this.blockchain.length - 1]
    }

    addNewBlock(newBlock){
        newBlock.precedingHash = this.obtainLatestBlock().hash
        //newBlock.hash = newBlock.computeHash()
        newBlock.proofOfWork(this.difficulty)
        this.blockchain.push(newBlock)
    }
    checkChainValidity(){
        for(let i = 1; i < this.blockchain.length; i++){
            const currentBlock = this.blockchain[i]
            const precedingBlock = this.blockchain[i-1]
    
            if(currentBlock.hash !== currentBlock.computeHash()){
                return false
            }
    
            if(currentBlock.precedingHash !== precedingBlock.hash){
                return false
            }
            return true
        }
    }
}






// Testing

let TaraCoin = new CryptoBlockchain()
TaraCoin.addNewBlock(new CryptoBlock(1, "14/11/2021", {sender: "Seb Prentice", recipient: "Tara Baalbaki", quantity: 80085}))
TaraCoin.addNewBlock(new CryptoBlock(2, "14/11/2021", {sender: "Tara Baalbaki", recipient: "Seb Prentice", quantity: 69}))
console.log(JSON.stringify(TaraCoin, null, 4))