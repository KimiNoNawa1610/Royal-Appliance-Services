from flask import Flask, request, jsonify


app = Flask(__name__)

if __name__=="main":
    app.runt(host="0.0.0.0", port=8080)

@app.route("/generate_invoice", methods=["GET","POST"])
def generate_invoice():

    pass

@app.route("/get_invoice/<_id>", methods=["GET"])
def generate_invoice(_id):

    pass

@app.route("/download_invoice/<_id>", methods=["GET"])
def generate_invoice(_id):

    pass

@app.route("/test",methods = ["POST"])
def test():

    return jsonify("Rest API is running")
