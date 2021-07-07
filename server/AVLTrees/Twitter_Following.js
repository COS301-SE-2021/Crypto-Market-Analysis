const AVLTree = require('avl')
const Database = require('../database/Database');

class Twitter_Following {
    #tree;
    #firestore_db;

    constructor(email) {
        //Initialize the tree. Second argument makes sure that no duplicates are allowed.
        this.#tree = new AVLTree(null, true);
        //Get the instance of the database.
        this.#firestore_db = new Database().getInstance();

        if(email){
            this.#firestore_db.fetch(`Users`, email, `screen_names`).then(screen_names => {
                if(screen_names) {
                    for (name of screen_names) {
                        if (name)
                            this.insert(name);
                    }
                }
            });
        }
    }

    insert(key){
        //Check if the key already exists. If it doesn't insert it else increment it by one.
        if(this.find(key) === null)
            this.#tree.insert(key, 1);
        else
            this.update(key, (this.#tree.find(key).data) + 1)
    }

    update(key, value){
        //Delete previous node
        this.#tree.remove(key);
        //Reinsert the node with updated value
        this.#tree.insert(key, value);
    }

    remove(key){
        //Try to remove the key
        if(this.#tree.remove(key) === null)
            console.error(`The specified key is not in the tree`);
    }

    find(key){
        //Get the node by the key from the tree.
        const node = this.#tree.find(key);
        if(node === null)
            console.error(`The specified key does not exist in the tree`);
        else
            return node;
    }
}

class Singleton {

    constructor(email) {
        if(!email){
            if (!Singleton.instance) {
                Singleton.instance = new Twitter_Following();
            }
        }
        else{
            if (!Singleton.instance) {
                Singleton.instance = new Twitter_Following(email);
            }
        }
    }

    getInstance() {
        return Singleton.instance;
    }
}

const twitter_following = new Twitter_Following(`alekarzeeshan92@gmail.com`);
/*twitter_following.remove("bill");
twitter_following.insert("elonmusk");
twitter_following.insert("elonmusk");*/

module.exports = Singleton;