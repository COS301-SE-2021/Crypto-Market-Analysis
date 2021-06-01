const User = require("../models/user")

/* Tries to delete a user from the database
* @param {string} email The email of the user in the database
* @return {null || string} Returns null if no error occurred while deleting the user from the database or else it returns the error
* */
const deleteUser = async (email) => {
    let error = null;
    await User.deleteOne({email: email})
        .exec()
        .catch(err => {
            error = err;
        });

    return error;
};

module.exports = deleteUser;