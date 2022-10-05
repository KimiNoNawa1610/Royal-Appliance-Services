from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import configparser

app = Flask(__name__)
cors = CORS(app)
app.config["CORS_HEADERS"]= 'Content-Type'

app_conf = configparser.ConfigParser
app_conf.read("app.config")

if __name__=="main":
    app.runt(host="0.0.0.0", port=8080)

@app.route("/generate_invoice", methods=["GET","POST"])
@cross_origin("*")
def generate_invoice():
    pass

@app.route("/get_invoice/<_id>", methods=["GET"])
@cross_origin("*")
def generate_invoice(_id):
    pass

@app.route("/download_invoice/<_id>", methods=["GET"])
@cross_origin("*")
def generate_invoice(_id):
    pass

@app.route("/connection_test",methods = ["POST"])
@cross_origin("*")
def connection_test():

    return jsonify("Rest API is running")

@app.rout("/get_invoice_test",method = ["GET"])
@cross_origin("*")
def get_invoice_test():
    with open("InvoiceAPI/template/invoice.html","rb") as f:
        html_string = f.read()
        html_string = html_string.replace("{{company_name}}",app_conf.get("client_info","name"))
        