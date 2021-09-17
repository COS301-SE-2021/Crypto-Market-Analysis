class NotificationMessage {
    constructor(AverageFeedback,cryptocurrency) {
        this.AverageFeedback = AverageFeedback;
        this.cryptocurrency = cryptocurrency;
        this.html='';
    }
    Results() {

        if(this.AverageFeedback.includes('positive'))
        {
            let message = this.AverageFeedback;
            let strArr = message.split(" ");
            this.html = this.cryptocurrency + ' sentiment has increased by ('+ strArr[1]+'%)!';
        }
        else if(this.AverageFeedback.includes('negative'))
        {
            let message = this.AverageFeedback;
            let strArr = message.split(" ");
            this.html = this.cryptocurrency + ' sentiment has decreased by ('+ strArr[1]+'%)!';
        }
        else
        {
            this.html =  this.cryptocurrency + ' average sentiment did not change!';
        }
        return this.html;
    }
}

module.exports =NotificationMessage ;