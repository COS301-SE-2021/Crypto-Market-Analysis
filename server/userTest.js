const user = require('./routes/user')

user.deleteUser('example@example.com').then((value) => {
    console.log( value )
})
//user.show()

/*
router.delete("/:Email", (req, res, next) => {
    let email = req.params.Email;
    let error = deleteUser(email);
    if (error === null) {
        res.status(200).json({
            message: "User deleted"
        });
    }
    else{
        res.status(500).json({
            error: error
        });
    }

});

/!* Tries to delete a user from the database
* @param {string} email The email that is extracted from the request of the delete route
* @return {null || string} Returns null if no error occurred while deleting the user from the database or else it returns the error
* *!/
const deleteUser = async (e) => {
    let w = null;
    console.log("Enters function")
    User.remove({ email: e })
        .exec()
        .then(result => { console.log("Deleted"); return w })
        .catch(err => { w = err; return w;});
};*/

/*router.delete("/:Email", (req, res, next) => {
    User.remove({ email: req.params.Email })
        .exec()
        .then(result => {
            res.status(200).json({
                message: "User deleted"
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});*/
