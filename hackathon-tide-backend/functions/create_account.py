import logging
from web3.exceptions import InvalidAddress

def acc_create(web3) -> tuple:
    try:
        account = web3.eth.account.create()
        dat = {
            "priv_key" : account.privateKey.hex(),
            "pub_addr" : account.address
        }
        return 200,  dat
    except Exception as e:
        logging.error(f"Error: {e}")
        return 201, "Internal server error"
