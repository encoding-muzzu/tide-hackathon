import datetime
from flask import Flask, jsonify, request
from flask_pymongo import PyMongo
from bson.json_util import dumps
from werkzeug.security import generate_password_hash, check_password_hash
import jwt
from functools import wraps
import json
from bson import json_util
import subprocess
import python_avatars as pa
import base64
import os
import ipfshttpclient
from flask_cors import CORS
from functions.create_account import acc_create
from web3 import Web3



# Set the ERC-20 balanceOf() ABI
balanceOfABI = [{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"mintFifty","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}]

tokenContract = "0x5cBEBC7506AA8F9d4D9913ed31a90eDB29Ec541E"

web3 = Web3(Web3.HTTPProvider('http://127.0.0.1:7545'))

owner_key = '0xe71b7b77c5434b9a6250312ab3fe74f18804045fd65c013f7bbcb4fed7a40834'

token_contract = web3.eth.contract(abi=balanceOfABI, address=tokenContract)


app = Flask(__name__)
CORS(app)

app.config['SECRET_KEY'] = 'secret_key'
app.config['MONGO_URI'] = 'mongodb+srv://muzammilahmed166:Encoding136@cluster0.q50i9b9.mongodb.net/customers'
mongo = PyMongo(app)


def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization', '').split(' ')[1]

        if not token:
            return gen_resp(400, "Authorization header is missing")

        try:
            data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=["HS256"])
            current_user = mongo.db.users.find_one({"email": data['email']})
        except jwt.exceptions.InvalidTokenError:
            return gen_resp(401, "Token is invalid or expired")

        return f(current_user, *args, **kwargs)

    return decorated

@app.route('/register', methods=['POST'])
def register():
    try:
        _name = request.json['name']
        email = request.json['email']
        password = request.json['password']
        address = request.json['address']
    except KeyError:
        return gen_resp(400, "keys are missing")
    hashed_password = generate_password_hash(password)

    user = mongo.db.users.find_one({'email': email})
    if user:
        return gen_resp(400, "User already exists")

    # Generate a Random avatar to the user
    random_avatar_1 = pa.Avatar.random()
    random_avatar_1.render(f"{email}.svg")

    with open(f"{email}.svg", "rb") as img_file:
        my_string = base64.b64encode(img_file.read())
        my_string = my_string.decode('utf-8')
        


    try:
        os.remove(f"{email}.svg")
    except FileNotFoundError:
        print("File is not present in the system.")
        pass
    
    res_code , res_dat = acc_create(web3)
    pub_add = res_dat["pub_addr"]
    account_1 = '0x768aE69da6951BD171CCDbdEcBe7b7DF845B742D'
    account_2 = pub_add

    #get the nonce.  Prevents one from sending the transaction twice
    nonce = web3.eth.getTransactionCount(account_1)

    #build a transaction in a dictionary
    tx = {
        'nonce': nonce,
        'to': account_2,
        'value': web3.toWei(1, 'ether'),
        'gas': 2000000,
        'gasPrice': web3.toWei('50', 'gwei')
    }

    #sign the transaction
    signed_tx = web3.eth.account.sign_transaction(tx, owner_key)

    #send transaction
    tx_hash = web3.eth.sendRawTransaction(signed_tx.rawTransaction)

    #get transaction hash
    print('txn ====>' , web3.toHex(tx_hash))

    try:
        p = subprocess.Popen(['/usr/local/bin/node', 'send_bal.js' , owner_key , pub_add , "10"], stdout=subprocess.PIPE)
        out = p.communicate()[0]
        out = out.decode('UTF-8') 
        out = out.strip()
    except Exception as e:
        return gen_resp(201,"something went wrong")

    if res_code == 200:
        mongo.db.users.insert_one({'email': email, 'password': hashed_password ,'is_kyc':False, 'name':_name, 'avatar':my_string, 'address':address , 'priv_key':res_dat['priv_key'] , 'pub_key':res_dat['pub_addr']})
        return gen_resp(200, "User created successfully")
    else:
        return gen_resp(res_code, res_dat)



@app.route('/login', methods=['POST'])
def login():
    try:
        email = request.json['email']
        password = request.json['password']
    except KeyError:
        return gen_resp(400, "keys are missing")
    user = mongo.db.users.find_one({'email': email})
    if not user:
        return gen_resp(201, "User not found")

    if check_password_hash(user['password'], password):
        token = jwt.encode({
            'email': user['email'],
            'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=500)
        }, app.config['SECRET_KEY'])

        res_dat = {
            "token":token
        }
        return gen_resp(200, "success",res_dat)

    return gen_resp(201, "Invalid credentials")


@app.route('/transactions', methods=['GET'])
@token_required
def txns_def(current_user):
    if request.method == 'GET':
        email = current_user["email"]
        query = { 'from_email': email }

        # Find the documents
        documents = mongo.db.transactions.find(query)
        documents = list(documents)

        res_out = []

        for doc in documents:
            doc["type"]="Debit"
            del doc['_id']
            res_out.append(doc)


        # Query for documents containing email in email key
        query = { 'to_addr': current_user["pub_key"] }

        # Find the documents
        documents = mongo.db.transactions.find(query)
        documents = list(documents)
        for doc in documents:
            doc["type"]="Credit"
            del doc['_id']
            res_out.append(doc)

        if len(res_out) > 0:
            return gen_resp(200, "success",res_out)
        else:
            return gen_resp(201, "no transactions")


@app.route('/transfer',methods=['POST'])
@token_required
def trans_amt(current_user):
    if request.method == 'POST':
        try:
            _to = request.json['to_addr']
            _amount = request.json['amount']
            _amount =  str(_amount)
            _description = request.json['description']
        except KeyError:
            return gen_resp(400, "keys are missing")

        result = token_contract.functions.balanceOf(current_user["pub_key"]).call()
        # Convert the value from Wei to Ether
        balance = web3.fromWei(result, "ether")

        __balance = int(balance)
        __amount = int(_amount)

        if __balance < __amount:
            return gen_resp(201, "Insufficient Amount")

        p = subprocess.Popen(['/usr/local/bin/node', 'send_bal.js' , current_user["priv_key"] , _to , _amount], stdout=subprocess.PIPE)
        out = p.communicate()[0]
        out = out.decode('UTF-8') 

        sav_txn = {
                "from_email":current_user["email"],
                "from_addr":current_user["pub_key"],
                "to_addr":_to,
                "amount":_amount,
                "description":_description,
                "created_at": datetime.datetime.now()
            }

        if len(out) in range(10,70):
            # return out
            res_d = {
                "txn_hash": out.strip()
            }

            sav_txn["txnhash"] = out.strip()
            sav_txn["status"] = "success"

            
            mongo.db.transactions.insert_one(sav_txn)
            return gen_resp(200, "success", res_d)
        else:
            sav_txn["txnhash"] = "NA"
            sav_txn["status"] = "failed"
            mongo.db.transactions.insert_one(sav_txn)
            return gen_resp(201,"something went wrong")




@app.route('/profile', methods=['GET'])
@token_required
def profile_func(current_user) -> jsonify:
    if request.method == 'GET':
        try:
            result = token_contract.functions.balanceOf(current_user["pub_key"]).call()

            # Convert the value from Wei to Ether
            balance = web3.fromWei(result, "ether")

            token_name = token_contract.functions.name().call() 
            token_symbol = token_contract.functions.symbol().call() 

            res_d = {
                "name":current_user["name"],
                "email":current_user["email"],
                "address":current_user["address"],
                "wallet":current_user["pub_key"],
                "balance":balance,
                "cur_name":token_name,
                "cur_symbol":token_symbol,
                "avatar":current_user["avatar"],
                "is_kyc":current_user["is_kyc"]
            }
            return gen_resp(200, "success", res_d)
        except Exception as e:
            print(e)
            return gen_resp(201,"something went wrong")




@app.route('/kyc', methods=['POST'])
@token_required
def upl_ipfs(current_user):
    if request.method == 'POST':

        # Upload a file to IPFS and get its hash
        # file_path = 'content.txt'
        # res = client.add(file_path)

        email = current_user["email"]
        query = { "email": email }
        new_values = { "$set": { "is_kyc": True } }

        try:
            dd= mongo.db.users.update_one(query, new_values)
            return gen_resp(200, "success")
        except:
            return gen_resp(201,"something went wrong")



def gen_resp(status_code: int, message: str, data: dict = {}) -> jsonify:
    response = {'status': status_code, 'message': message}
    if data:
        response['data'] = data
    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0" , port=3001)