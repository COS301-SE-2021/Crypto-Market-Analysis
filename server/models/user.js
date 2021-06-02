const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    username: { type: String, required: true
    },
    email: { type: String, required: true , unique: true,match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password: { type: String, required: true
    },
    createdAt: { type: Date, default: Date.now()
    },
    roles: [{type : String}],
    Verified : {type: Boolean , default :false},
    FavouriteCrypto: [{type: String}],
    PasswordReset : String,
    Expires: Date

});

module.exports = mongoose.model("User", UserSchema);
