const MESSAGES = {
    // user controller
    '1001': 'Signup successfully!',
    '1002': 'Login successfully!',
    '1003': 'Logout successfully!',
    '1006': 'Email id already exist.',
    '1007': 'User not found.',
    '1008': 'Email or password are not match.',
    '1009': 'Email already exist.',
    '1010': 'Get user profile successfully.',
    '1011': 'Upadate user profile successfully.',
    '1012': 'Password does not match.',
    '1013': 'User Account deleted successfully.',
    '1014' : 'you are not user',
    '1015' : 'current password is incorrect',

    // categories controller
    '1101': 'Categories create successfully!',
    '1102': 'Categories data get successfully!',
    '1103': 'Categories delete successfully!',
  
    
  
    // product controller
    '1301': 'product create successfully!',
    '1302': 'product get successfully!',
    '1303': 'You are not admin!',
    '1304': 'product delete successfully',
    '1305': 'product uploded successfully',
    '1306': 'Please select product file..',
    '1307': 'product not found',
    '1308': 'product update successfully',
    '1309': 'You are not active admin!',
    '1310' : 'Add product reviews successfully',

    //super admin controller
    
    '1403': 'Get admin successfully!',
     
    

    // Common
    '9000': 'Please Enter valid Details',
    '9999': "Something went wrong!",

}


module.exports.getMessage = function(messageCode){
    if (isNaN(messageCode)) {
        return messageCode
    }

   return messageCode ? MESSAGES[messageCode] : '';
}