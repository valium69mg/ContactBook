from pymongo import MongoClient 
from bson import ObjectId

MONGO_URL = 'mongodb://localhost'

client = MongoClient(MONGO_URL)

example_info = {
    'name':'Carlos Tranquilino Carlos Roman',
    'address':'Queretaro',
    'phone':'1234567890',
    'mail':'carlostranquilino.cr@gmail.com'
}

db = client['contact_book']

collection = db['contacts']
collection_users = db['users']

"""
CREATE USER
"""

def create_user(mail,password):
    # mail
    # password
    collection_users.insert_one({'mail':mail,'password':password})
    return True

"""
READ USER 
"""
def get_id_by_mail_and_password(mail,password):
    results = collection_users.find_one({'mail':mail,'password':password})
    id = results['_id']
    return str(id)

def get_user_credentials_by_id(id):
    object_id = ObjectId(id)
    results = collection_users.find_one({'_id':object_id})
    if (results == None):
        return []
    return results


"""
UPDATE USER
"""
def update_user_mail(new_mail,id):
    collection_users.update_one({'_id':id},{'$set':{'mail':new_mail}})
    return True

def update_user_password(new_password,id):
    collection_users.update_one({'_id':id},{'$set':{'password':new_password}})
    return True

"""
DELETE USER 
"""

def delete_user_by_id(id):
    collection_users.delete_one({'_id':id})
    return True

"""

CREATE CONTACT

"""

def create_contact(info):
    collection.insert_one(info)
    return info

"""
READ CONTACTS
"""
def get_all_contacts(id):
    results = collection.find({'sessionID':id},{'_id':False})
    if (results == None):
        return []
    return results

def get_id_by_credentials(mail,sessionID):
    results = collection.find_one({
        'mail':mail,
        'sessionID':sessionID
    })
    if (results == None):
        return  
    
    id = results['_id']
    return str(id)

def get_credentials_by_id(id,sessionID):
    object_id = ObjectId(id)
    results = collection.find_one({'_id':object_id,'sessionID':sessionID },{'_id':False})
    if results == None:
        return False
    return results

"""
UPDATE CONTACT
"""

def update_name(new_name,id):
    object_id = ObjectId(id)
    results = collection.update_one({'_id':object_id},{'$set':{'name':f'{new_name}'}})
    return results

def update_address(new_address,id):
    object_id = ObjectId(id)
    results = collection.update_one({'_id':object_id},{'$set':{'address':f'{new_address}'}})
    return results

def update_phone(new_phone,id):
    object_id = ObjectId(id)
    results = collection.update_one({'_id':object_id},{'$set':{'phone':f'{new_phone}'}})
    return results

def update_mail(new_mail,id):
    object_id = ObjectId(id)
    results = collection.update_one({'_id':object_id},{'$set':{'mail':f'{new_mail}'}})
    return results

def update_all(data,id):
    object_id = ObjectId(id)
    results = collection.update_one({'_id':object_id}, {'$set':data})
    if (results == None) :
        return False
    return results 

"""
DELETE CONTACT 
"""

def delete_by_id(id,sessionID):
    object_id = ObjectId(id)
    results = collection.delete_one({'_id':object_id,'sessionID':sessionID})
    if (results == None):
        return False
    return results


# TEST FUNCTIONS 


def print_all_contacts():
    results = collection.find()
    for r in results:
        print(r)

def print_all_contact_names():
    results = collection.find({},{'_id':False})
    for r in results:
        print(r['name'])


