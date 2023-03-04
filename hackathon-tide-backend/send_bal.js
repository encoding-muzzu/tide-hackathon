const Web3 = require("web3");
var arguments = process.argv

const SIGNER_PRIVATE_KEY = arguments[2]

const RECEIVER_ADDRESS = arguments[3]

const ERC20_TOKEN_ADDRESS = '0x5cBEBC7506AA8F9d4D9913ed31a90eDB29Ec541E'
const tokenAbi = [{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"}];

let _amount = arguments[4]

async function main() {

    const web3 =  new Web3(
        new Web3.providers.HttpProvider('http://127.0.0.1:7545')
    )
    var abi = tokenAbi;

    const tokenAddress = ERC20_TOKEN_ADDRESS;
    const toAddress = RECEIVER_ADDRESS;

    const signer = web3.eth.accounts.privateKeyToAccount(
        SIGNER_PRIVATE_KEY
    );
    web3.eth.accounts.wallet.add(signer);



    const contract = new web3.eth.Contract(abi, tokenAddress, { from: signer.address } )
    let amount = web3.utils.toHex(web3.utils.toWei(_amount));

    contract.methods.transfer(toAddress, amount).send({
        from: signer.address,
        gasLimit:300000,
        gas: web3.eth.getBlock("latest").gasLimit
    })
    .then(function (dat) {
        console.log(dat["transactionHash"]);
    })
    .catch(function (dat) {
        console.log('error : ',dat);
        console.log(dat["transactionHash"])  
    } );

 }

main();
