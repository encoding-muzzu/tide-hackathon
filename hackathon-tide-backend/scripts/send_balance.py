
from web3 import Web3, HTTPProvider


ETHEREUM_NETWORK = "goerli"
INFURA_API_KEY = "40b2586fe63d4b8d82a55b7335521120"
SIGNER_PRIVATE_KEY = "0x00d3158e68fb25d9cf587617ee587a5d1b248add56b7a5cc46d28005f4048ff6"
RECEIVER_ADDRESS = '0x4DBA707d5a84d9861804D79AF25aA9dC9A223086'
ERC20_TOKEN_ADDRESS = '0x78D3d32833c36ED92b78C3Ef6A1341A63991B3E4'
tokenAbi = '[{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"}]'



# Set up a web3 connection using an External Provider
w3 = Web3(HTTPProvider(F"https://{ETHEREUM_NETWORK}.infura.io/v3/{INFURA_API_KEY}"))


# print(w3.eth.account.privateKeyToAccount('0xfdba67e41f7c6767100969ae3f045d10a59e35d380acf5b37a3b208bd2969347').address)

# print(w3.eth.account.privateKeyToAccount(private_key))
# Setup parameters for a signing account from private key
signer_private_key = SIGNER_PRIVATE_KEY
print(signer_private_key)
print(w3.eth.accounts)
signer = w3.eth.account.privateKeyToAccount('0x00d3158e68fb25d9cf587617ee587a5d1b248add56b7a5cc46d28005f4048ff6')
print('2',w3.eth.accounts)
print([w3.eth.account])
print(signer)
# w3.eth.account.wallet.add(signer)

w3.eth.accounts.wallet.add(signer)


# ABI and Contract Address for a smart contract
# abi = json.loads('[ABI definition of smart contract]')
abi = tokenAbi

token_address = ERC20_TOKEN_ADDRESS
contract = w3.eth.contract(address=token_address, abi=abi)

# Set amount to transfer
amount = w3.toHex(w3.toWei("1", "ether"))

# Transfer funds
txn = contract.functions.transfer(to_address, amount).buildTransaction({
'nonce': w3.eth.getTransactionCount(signer.address),
'gas': 300000,
'gasPrice': w3.eth.gasPrice
})

# Sign transaction and broadcast it to the network
signed_txn = w3.eth.account.signTransaction(txn, signer_private_key)
tx_hash = w3.eth.sendRawTransaction(signed_txn.rawTransaction)

# Print transaction hash
print(f'transaction hash: {tx_hash.hex()}')
