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

from flask_cors import CORS


from functions.create_account import acc_create

from web3 import Web3

# Set the ERC-20 balanceOf() ABI
balanceOfABI = [{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"mintFifty","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}]

tokenContract = "0x78D3d32833c36ED92b78C3Ef6A1341A63991B3E4"

# Set Infura as our provider
web3 = Web3(Web3.HTTPProvider('https://goerli.infura.io/v3/40b2586fe63d4b8d82a55b7335521120'))

app = Flask(__name__)
CORS(app)

app.config['SECRET_KEY'] = 'secret_key'
app.config['MONGO_URI'] = 'mongodb+srv://muzammilahmed166:Encoding136@cluster0.q50i9b9.mongodb.net/customers'
mongo = PyMongo(app)


def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None

        if 'Authorization' in request.headers:
            token = request.headers['Authorization'].split(' ')[1]

        if not token:
            return gen_resp(201, "Token is missing")

        try:
            data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=["HS256"])
            current_user = mongo.db.users.find_one({"email": data['email']})
        except:
            return gen_resp(201, "Token is invalid")

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

    
    res_code , res_dat = acc_create(web3)



    if res_code == 200:

        mongo.db.users.insert_one({'email': email, 'password': hashed_password , 'name':_name, 'address':address , 'priv_key':res_dat['priv_key'] , 'pub_key':res_dat['pub_addr']})
        # return jsonify({'message': 'User created successfully!'})
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
        # return jsonify({'message': 'User not found!'})
        return gen_resp(201, "User not found")

    if check_password_hash(user['password'], password):
        token = jwt.encode({
            'email': user['email'],
            'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=30)
        }, app.config['SECRET_KEY'])

        # return jsonify({'token': token})

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

        # user = mongo.db.users.find_one({'from_email': email})

        # Query for documents containing email in email key
        query = { 'from_email': email }

        # Find the documents
        documents = mongo.db.transactions.find(query)

        documents = list(documents)
        print(len(documents))

        # from_obj = {
        #     "from_email"
        # }
        # Print the documents

        # for doc in len(documents):
        #     print('doc , ', doc)

        res_out = []

        for doc in documents:
            print(doc)

            doc["type"]="Debit"
            del doc['_id']
            res_out.append(doc)
            # res_out.pop("_id")


        # r = json.dumps(res_out, default=str)


        return jsonify(res_out)
        # if not user:
        #     return jsonify({'message': 'User not found!'})

        # if check_password_hash(user['password'], password):
        #     token = jwt.encode({
        #         'email': user['email'],
        #         'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=30)
        #     }, app.config['SECRET_KEY'])

        #     # return jsonify({'token': token})

        #     res_dat = {
        #         "token":token
        #     }
        #     return gen_resp(200, "success",res_dat)

        # return gen_resp(201, "Invalid credentials")


@app.route('/protected')
@token_required
def protected(current_user):
    return jsonify({'message': 'This is a protected endpoint!'})



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

        p = subprocess.Popen(['/usr/local/bin/node', 'send_bal.js' , _to , _amount], stdout=subprocess.PIPE)
        # out = p.stdout.read()
        out = p.communicate()[0]

        out = out.decode('UTF-8') 

        print('out : ',out) 

        sav_txn = {
                "from_email":current_user["email"],
                "from_addr":current_user["pub_key"],
                "to_addr":_to,
                "amount":_amount,
                "description":_description,
                # "txnhash":out
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
    print(current_user)
    if request.method == 'GET':
        print(type( current_user))

        try:

            # Define the ERC-20 token contract
            contract = web3.eth.contract(abi=balanceOfABI, address=tokenContract)

            # Execute balanceOf() to retrieve the token balance
            result = contract.functions.balanceOf(current_user["pub_key"]).call()

            # Convert the value from Wei to Ether
            balance = web3.fromWei(result, "ether")

            res_d = {
                "name":current_user["name"],
                "email":current_user["email"],
                "address":current_user["address"],
                "wallet":current_user["pub_key"],
                "balance":balance
            }
            return gen_resp(200, "success", res_d)
        except Exception as e:
            print(e)
            return gen_resp(201,"something went wrong")


def gen_resp(status_code: int, message: str, data: dict = {}) -> jsonify:
    response = {'status': status_code, 'message': message}
    if data:
        response['data'] = data
    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0" , port=3000)
