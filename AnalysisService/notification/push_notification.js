const webpush = require("web-push");
class Push_notification {
    constructor() {
            this.publicKey =process.env.WEB_PUSH_PUBLIC_KEY;
            this.privateKey = process.env.WEB_PUSH_PRIVATE_KEY;
    }
    setDetails(){
        webpush.setVapidDetails(
            "mailto:mojohnnylerato@gmail.com",
            this.publicKey,
            this.privateKey
        );
    }


}
module.exports = Push_notification;