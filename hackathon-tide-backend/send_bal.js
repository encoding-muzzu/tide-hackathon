const Web3 = require("web3");
var arguments = process.argv

const ETHEREUM_NETWORK = "goerli"
const INFURA_API_KEY = "40b2586fe63d4b8d82a55b7335521120"
// old
// const SIGNER_PRIVATE_KEY = "0x00d3158e68fb25d9cf587617ee587a5d1b248add56b7a5cc46d28005f4048ff6"

// new
// const SIGNER_PRIVATE_KEY = "0xe71b7b77c5434b9a6250312ab3fe74f18804045fd65c013f7bbcb4fed7a40834"
const SIGNER_PRIVATE_KEY = arguments[2]

// const RECEIVER_ADDRESS = '0x4DBA707d5a84d9861804D79AF25aA9dC9A223086'

const RECEIVER_ADDRESS = arguments[3]

// console.log(RECEIVER_ADDRESS);
const ERC20_TOKEN_ADDRESS = '0x5cBEBC7506AA8F9d4D9913ed31a90eDB29Ec541E'
const tokenAbi = [{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"}];

let _amount = arguments[4]


// const Web3 = require("web3");

async function main() {
    // Configuring the connection to an Ethereum node
    const network = ETHEREUM_NETWORK;

    const web3 =  new Web3(
        new Web3.providers.HttpProvider('http://127.0.0.1:7545')
    )
    // const web3 = new Web3(
    //     new Web3.providers.HttpProvider(
    //         `https://${network}.infura.io/v3/${INFURA_API_KEY}`
    //     )
    // );

    // var fs = require('fs');
    // var jsonFile = "abi.json";

    // var parsed=JSON.parse(fs.readFileSync(jsonFile));
    var abi = tokenAbi;

    const tokenAddress = ERC20_TOKEN_ADDRESS;
    const toAddress = RECEIVER_ADDRESS;

    // Creating a signing account from a private key
    const signer = web3.eth.accounts.privateKeyToAccount(
        SIGNER_PRIVATE_KEY
    );
    web3.eth.accounts.wallet.add(signer);


    // console.log(_amount)

    const contract = new web3.eth.Contract(abi, tokenAddress, { from: signer.address } )
    let amount = web3.utils.toHex(web3.utils.toWei(_amount));

    contract.methods.transfer(toAddress, amount).send({
        from: signer.address,
        gasLimit:300000,
        gas: web3.eth.getBlock("latest").gasLimit
    })
    .then(function (dat) {
        // console.log('success : ', dat);
        console.log(dat["transactionHash"]);
    })
    .catch(function (dat) {
        console.log('error : ',dat);
        console.log(dat["transactionHash"])  
    } );

 }

main();



// {
//     blockHash: '0xc4ac758f40a58b5942c64d29715a768baad8900cfa9cf0dc768103c34fc3aeb1',
//     blockNumber: 8584047,
//     contractAddress: null,
//     cumulativeGasUsed: 9151654,
//     effectiveGasPrice: 159206153474,
//     from: '0x5881bccdd3cc70980dea17db49ca52a7cf016de5',
//     gasUsed: 35055,
//     logsBloom: '0x00000000000000000000000000000000020000000000000000000000000000000000000000000000000000800000000000000000000000000000000000000000000000004000000000000008000000000000800000000000000000000000000000000000000000000000000000000000000408000000000000000010000000000000000000000000000000000000000000000000000800000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000001000000000000040000000000000000000000000000000000000000000000000000000000000000',
//     status: true,
//     to: '0x78d3d32833c36ed92b78c3ef6a1341a63991b3e4',
//     transactionHash: '0x71ed03bf11ee4f14773be9e6bcab57879ecbdd19c68ba1e1d7e11b13dcb12618',
//     transactionIndex: 61,
//     type: '0x2',
//     events: {
//       '0': {
//         address: '0x78D3d32833c36ED92b78C3Ef6A1341A63991B3E4',
//         blockHash: '0xc4ac758f40a58b5942c64d29715a768baad8900cfa9cf0dc768103c34fc3aeb1',
//         blockNumber: 8584047,
//         logIndex: 71,
//         removed: false,
//         transactionHash: '0x71ed03bf11ee4f14773be9e6bcab57879ecbdd19c68ba1e1d7e11b13dcb12618',
//         transactionIndex: 61,
//         id: 'log_71a47b9b',
//         returnValues: Result {},
//         event: undefined,
//         signature: null,
//         raw: [Object]
//       }
//     }
//   }