import json
from flask import Flask, request, jsonify, send_file
from flask_cors import CORS, cross_origin
import configparser
import pdfkit as pdf
from datetime import datetime
import os
import psycopg2

app = Flask(__name__)
cors = CORS(app)
app.config["CORS_HEADERS"] = 'Content-Type'
app.config["SECRET_KEY"] = 'ROYALAPPLIANCE2022!'

app_conf = configparser.ConfigParser()
app_conf.read("C:\\Users\\Nhan Vo\\Documents\\GitHub\\Royal-Appliance-Services\\app.config")

db = {}
if app_conf.has_section("postgresql"):
    params = app_conf.items("postgresql")
    for param in params:
        db[param[0]] = param[1]
else:
    raise Exception('Section {0} not found in the {1} file'.format(section, filename))

"""
args ex:
params = {"invoice_number":00000,"date": (optional)} 
json = {"amount_due","rows":[{"item":"name","description":"something","rate":"pay rate","quantity":1,"price":699}],"total":total,
"paid":,"due","note":(optional)}
""" 
@app.route("/generate_invoice", methods=["POST"])
@cross_origin()
def generate_invoice():
    
    if not request.args:
        
        return jsonify("Please include all necessary attributes")

    else:

        content_type = request.headers.get('Content-Type')
        
        #print(content_type)

        if (content_type == 'application/json'):

            if "invoice_number" not in request.args:

                return jsonify ("Please include the invoice number")

            date_string = ""

            if "date" not in request.args:

                date = datetime.now()

                date_string = f"{str(date.month)}/{str(date.day)}/{str(date.year)}"

            else:

                date_string = request.args["date"]

            info = request.get_json()

            invoice_number = request.args["invoice_number"]

            try:

                with open('C:\\Users\\Nhan Vo\\Documents\\GitHub\\Royal-Appliance-Services\\InvoiceAPI\\templates\\invoice.html',"r") as f:

                    html_string = f.read()

                    #print(app_conf.get("client_info","name"))

                    html_string = html_string.replace("{{company_name}}",app_conf.get("client_info","name"))

                    html_string = html_string.replace("{{client}}",info["client"])

                    html_string = html_string.replace("{{street_address}}",app_conf.get("client_info","street_address"))

                    html_string = html_string.replace("{{city_zipcode}}",app_conf.get("client_info","city_zipcode"))

                    html_string = html_string.replace("{{phone_number}}",app_conf.get("client_info","phone"))

                    html_string = html_string.replace("{{date}}",date_string)

                    t_string = ""

                    rows = ""

                    values ={'id': invoice_number,'total': 0,'net': 0,'shipping': 0,'my_part': 0,'labor' : 0,'tax' : 0,'sell' : 0,'part_installed' : "",'paid_by' : ""}

                    with open('C:\\Users\\Nhan Vo\\Documents\\GitHub\\Royal-Appliance-Services\\InvoiceAPI\\templates\\tableRow.html',"r") as t:

                        t_string = t.read()

                        for row in info["rows"]:
                            
                            rows += t_string.replace("{{item}}",str(row["item"])).replace("{{my_part}}",str(row["my_part"])).replace("{{labor}}",str(row["labor"])).replace("{{tax}}",str(row["tax"])).replace("{{shipping}}",str(row["shipping"])).replace("{{sell}}",str(row["sell"])).replace("{{paid_by}}",row["paid_by"]).replace("{{net}}",str(row["total"]-row["my_part"]-row["tax"])).replace("{{total}}",str(row["total"]))
                           
                            #print(row)

                            values['total'] += row["total"]

                            values['net'] +=row["total"]-row["my_part"]-row["tax"]

                            values['shipping']+=row["shipping"]

                            values['my_part']+=row["my_part"]

                            values['labor']+=row["labor"]

                            values['tax']+=row['tax']

                            values['sell']+=row['sell']

                            values['part_installed'] += row["item"]+", "

                            values['paid_by'] += row["paid_by"]+", "

                    html_string = html_string.replace("{{rows}}",rows)

                    html_string = html_string.replace("{{total}}",str(values['total']))

                    html_string = html_string.replace("{{paid}}",str(info["paid"]))

                    html_string = html_string.replace("{{due}}",str(values['total'] - info["paid"]))

                    html_string = html_string.replace("{{invoice_number}}",invoice_number)

                    html_string = html_string.replace("{{note}}",info["note"])

                #print(html_string)

                with open ("C:\\Users\\Nhan Vo\\Documents\\GitHub\\Royal-Appliance-Services\\InvoiceAPI\\templates\\invoice_out.html","w") as outf:

                    #print("written")

                    outf.write(html_string)
                
                save_path = f"C:\\Users\\Nhan Vo\\Documents\\GitHub\\Royal-Appliance-Services\\InvoiceAPI\\pdf\\invoice_{str(invoice_number)}.pdf"

                if not os.path.exists(save_path):

                    with open (save_path,"w") as outp:

                        #print("written")

                        outp.write(" ")
                
                pdf.from_file("C:\\Users\\Nhan Vo\\Documents\\GitHub\\Royal-Appliance-Services\\InvoiceAPI\\templates\\invoice_out.html",save_path)

                print('Connecting to the PostgreSQL database...')

                conn = psycopg2.connect(**db)

                cur = conn.cursor()

                print('Connected to PostgreSQL database version:')

                cur.execute('SELECT version()')

                db_version = cur.fetchone()

                print(db_version)

                postgres_insert_query = """ INSERT INTO "Invoices".invoices(id, total, my_part, labor, tax, shipping, net, part_installed, client_sell, paid_by) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"""

                cur.execute(postgres_insert_query,(values["id"],values["total"],values["my_part"],values["labor"],values["tax"],values["shipping"],values["net"],values["part_installed"][:-2],values["sell"],values["paid_by"][:-2]))

                conn.commit()

                count = cur.rowcount

                print(count, "Record inserted successfully into invoices table")

                return jsonify("Invoice Generated")

            except Exception as e:

                return jsonify(e)

        else:

            return 'Content-Type not supported!'


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

    with open('C:\\Users\\Nhan Vo\\Documents\\GitHub\\Royal-Appliance-Services\\InvoiceAPI\\templates\\invoice.html',"r") as f:

        html_string = f.read()

        #print(app_conf.get("client_info","name"))

        html_string = html_string.replace("{{company_name}}",app_conf.get("client_info","name"))

        html_string = html_string.replace("{{client}}","tester")

        html_string = html_string.replace("{{street_address}}",app_conf.get("client_info","street_address"))

        html_string = html_string.replace("{{city_zipcode}}",app_conf.get("client_info","city_zipcode"))

        html_string = html_string.replace("{{phone_number}}",app_conf.get("client_info","phone"))

        date = datetime.now()

        date_string = f"{str(date.month)}/{str(date.day)}/{str(date.year)}"

        html_string = html_string.replace("{{date}}",date_string)

        t_string = ""

        with open('C:\\Users\\Nhan Vo\\Documents\\GitHub\\Royal-Appliance-Services\\InvoiceAPI\\templates\\tableRow.html',"r") as t:
           
            t_string = t.read()
            
            t_string = t_string.replace("{{item}}","Drain Pump").replace("{{total}}","2368").replace("{{my_part}}","313").replace("{{labor}}","1415").replace("{{tax}}","56.25").replace("{{shipping}}","36").replace("{{sell}}","893").replace("{{paid_by}}","cash").replace("{{net}}","1999")
        
        html_string = html_string.replace("{{rows}}",t_string)

        html_string = html_string.replace("{{total}}","699")

        html_string = html_string.replace("{{paid}}","0")

        html_string = html_string.replace("{{due}}","699")

        html_string = html_string.replace("{{invoice_number}}","16102000")

        html_string = html_string.replace("{{note}}","Testing")

    #print(html_string)
    with open ("C:\\Users\\Nhan Vo\\Documents\\GitHub\\Royal-Appliance-Services\\InvoiceAPI\\templates\\invoice_out.html","w") as outf:
        #print("written")
        outf.write(html_string)
    
    pdf.from_file("C:\\Users\\Nhan Vo\\Documents\\GitHub\\Royal-Appliance-Services\\InvoiceAPI\\templates\\invoice_out.html","C:\\Users\\Nhan Vo\\Documents\\GitHub\\Royal-Appliance-Services\\InvoiceAPI\\pdf\\file.pdf")
    
    return send_file("C:\\Users\\Nhan Vo\\Documents\\GitHub\\Royal-Appliance-Services\\InvoiceAPI\\pdf\\file.pdf", as_attachment=True)

if __name__ == '__main__':
    app.run(host= "0.0.0.0",debug=True)





        
