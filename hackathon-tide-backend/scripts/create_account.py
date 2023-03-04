

from web3 import Web3

network = 'goerli'
infura_url = f'https://{network}.infura.io/v3/40b2586fe63d4b8d82a55b7335521120'
web3 = Web3(Web3.HTTPProvider(infura_url))

account = web3.eth.account.create()
print(f"New {network} account private key: {account.privateKey.hex()}")
print(f"New {network} account address: {account.address}")



# 0x5881BCcdd3CC70980dea17db49cA52A7cf016DE5
# 0x00d3158e68fb25d9cf587617ee587a5d1b248add56b7a5cc46d28005f4048ff6


# New goerli account private key: 0x3e31fa28956ae9ef3f5b31a9948d0a0b0dd4dfb559c88cd23355db91a96d6a8a
# New goerli account address: 0x4DBA707d5a84d9861804D79AF25aA9dC9A223086