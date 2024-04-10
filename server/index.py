from flask import Flask
from flask_cors import CORS, cross_origin
from database import get_all_contacts,create_contact,get_id_by_credentials,get_credentials_by_id
from database import update_name,update_address,update_phone,update_mail,delete_by_id
from database import update_all
from database import create_user,get_id_by_mail_and_password,get_user_credentials_by_id
import json
from flask import request,jsonify


app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/')
def index():
    return {'index':'ok'}

"""
USERS

"""
# CREATE USERS
@app.route('/create/user',methods=['POST'])
@cross_origin()
def api_create_user():
    mail = request.args.get('mail')
    password = request.args.get('password')
    try:
        create_user(mail,password)
    except:
        return 'False'
    return 'True'

#READ USERS
@app.route('/users/getID',methods=['POST'])
@cross_origin()
def api_get_user_id():
    mail = request.args.get('mail')
    password = request.args.get('password')
    try:
        id = get_id_by_mail_and_password(mail,password)
    except:
        return 'False'
    return id,200

@app.route('/users/getCredentials',methods=['POST'])
@cross_origin()
def api_get_user_credentials_by_id():
    sessionID = request.args.get('sessionID')
    res = get_user_credentials_by_id(sessionID)
    if (res == []):
        return []
    print(res)
    return 'ok',200

"""
CONTACTS

"""
"""
CREATE 
"""
@app.route('/create/contact',methods=['POST'])
@cross_origin()
def api_create_contact():
    name = request.args.get('name')
    address = request.args.get('address')
    phone = request.args.get('phone')
    mail = request.args.get('mail')
    sessionID = request.args.get('sessionID')
    if (sessionID):
        create_contact({'name':name,'address':address,'phone':phone,'mail':mail,'sessionID':sessionID})
        return 'ok',200
    return [],401


"""
READ 

"""
@app.route('/contacts/all',methods=['POST'])
@cross_origin()
def api_all_contacts():
    sessionID = request.args.get('sessionID')
    res = get_all_contacts(sessionID)
    contact = []
    for r in res:
        contact.append(r)
    return contact

@app.route('/contacts/getID',methods=['POST'])
@cross_origin()
def api_get_contact_id():
    mail = request.args.get('mail')
    sessionID = request.args.get('sessionID')
    _id = get_id_by_credentials(mail,sessionID)
    return _id
  

@app.route('/contacts/getCredentials',methods=['POST'])
@cross_origin()
def api_get_credentials():
    id = request.args.get('id')
    sessionID = request.args.get('sessionID')
    credentials = get_credentials_by_id(id,sessionID)
    if (credentials == False):
        return 'False',400
    return credentials

"""
UPDATE 
"""

@app.route('/contacts/update',methods=['POST'])
@cross_origin()
def api_update():
    id = request.args.get('id')
    print(request.args)
    new_name = request.args.get('name')
    new_address = request.args.get('address')
    new_phone = request.args.get('phone')
    new_mail = request.args.get('mail')
    sessionID = request.args.get('sessionID')
    data = {
        'name':new_name,
        'address':new_address,
        'phone':new_phone,
        'mail':new_mail,
        'sessionID':sessionID
    }
    update = update_all(data,id)
    if (update == []):
        return 'false',400
    return 'ok'
"""
DELETE 
"""

@app.route('/contacts/delete',methods=['POST'])
@cross_origin()
def api_delete():
    id = request.args.get('id')
    sessionID = request.args.get('sessionID')
    delete = delete_by_id(id,sessionID)
    if (delete == False):
        return 'False',400
    return 'ok'

if __name__ == '__main__':
    app.run(debug= True)


