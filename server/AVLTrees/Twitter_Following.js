const AVLTree = require('avl')
const Database = require('../database/Database');

class Twitter_Following {
    #tree;
    #firestore_db;
    #email;

    constructor(email) {
        //Initialize the tree. Second argument makes sure that no duplicates are allowed.
        this.#tree = new AVLTree(null, true);
        //Get the instance of the database.
        this.#firestore_db = new Database().getInstance();

        if(email){
            this.#email = email;
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
        //Check if the key already exists. If it doesn't insert it, else increment it by one.
        if(this.find(key) === null)
            this.#tree.insert(key, 1);
        else
            this.update(key, (this.#tree.find(key).data) + 1)
    }

    update(key, value){
        //Check if the key exists
        const exists = this.find(key);
        if(exists) {
            //Delete previous node
            this.#tree.remove(key);
        }
        //Reinsert the node with updated value
        this.#tree.insert(key, value);
    }

    remove(key){
        //Try to remove the key from the tree
        const completed = this.#tree.remove(key);
        return completed;
    }

    find(key){
        //Get the node by the key from the tree.
        const node = this.#tree.find(key);
        return node;
    }

    keys(){
        return this.#tree.keys();
    }

    getEmail(){
        return this.#email;
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

module.exports = Singleton;