const messaging = require('../FirestoreDB')
class Push_notification {
    constructor() {
        console.log('displaying messaging')
        console.log(messaging.db.messaging())
        this.msg = messaging.db.messaging()
    }
    sendNotification = async (tokens, data)=>{
         this.msg.sendMulticast({tokens,data}).then(res=>{
             const successes = res.responses.filter(r => r.success === true)
                 .length;
             const failures = res.responses.filter(r => r.success === false)
                 .length;
             console.log(
                 'Notifications sent:',
                 `${successes} successful, ${failures} failed`
             );

         }).catch(err=>{
             console.log('Error sending message:', err);
         });

    }
    StoreMessage =async(req,res)=>{
        const { name, message } = req.body;
        const columns = 'name, message';
        const values = `'${name}', '${message}'`;
        try {
            const tokens = [];
            const notificationData = {
                title: 'New message',
                body: message,
            };
            await this.sendNotification(tokens, notificationData);
            res.status(200).json({ messages: notificationData });
        } catch (err) {
            res.status(200).json({ messages: err.stack });
        }
    }

}
module.exports = Push_notification;