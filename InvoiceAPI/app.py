import json
from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import configparser
import pdfkit as pdf

app = Flask(__name__)
cors = CORS(app)
app.config["CORS_HEADERS"]= 'Content-Type'

app_conf = configparser.ConfigParser()
app_conf.read("app.config")

if __name__ == '__main__':
    app.run(debug=True)

@app.route("/")
def home():
    return f"home {request.method}"


@app.route("/generate_invoice", methods=["GET","POST"])
@cross_origin()
def generate_invoice():
    pass

@app.route("/get_invoice/<_id>", methods=["GET"])
@cross_origin()
def get_invoice(_id):

    pass

@app.route("/download_invoice/<_id>", methods=["GET"])
@cross_origin()
def download_invoice(_id):
    pass

@app.route("/connection_test",methods = ["GET","POST"])
@cross_origin()
def connection_test():
    return jsonify("Rest API is running")

@app.route("/get_invoice_test",methods = ["GET"])
@cross_origin()
def get_invoice_test():
    html_string =""
    with open("InvoiceAPI\template\invoice.html","r") as f:
        html_string = f.read()
        html_string = html_string.replace("{{company_name}}",app_conf.get("client_info","name"))
    with open ("InvoiceAPI/template/invoice_out.html","w") as outf:
        outf.write(html_string)
    
    pdf.from_file('InvoiceAPI/template/invoice_out.html','file.pdf')





        