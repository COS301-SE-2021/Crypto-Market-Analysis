const webpush = require("web-push");
class Push_notification {
    constructor() {
            this.publicKey ='BC0gVsYz3ljCKUO5KCfEcpaTFj3Ye_Q_q8vAWBTKDd_53jXsvtRMOYqTCUggv62UE3As_8psAJwXwTKTgXYUKNs';
            this.privateKey = 'f_Jx_8TU_kQbigqeYxeko3pBjzvH1DQrFDftfvmO7MA';
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