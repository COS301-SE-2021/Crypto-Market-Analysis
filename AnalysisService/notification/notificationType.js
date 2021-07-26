class NotificationMessage {
    constructor(AverageFeedback,cryptocurrency) {
        this.AverageFeedback = AverageFeedback;
        this.cryptocurrency = cryptocurrency;
        this.html='';
    }
    Results() {
        if(this.AverageFeedback==='positive')
        {
            this.html = this.cryptocurrency + ' sentiment has increased!';
        }
        else if(this.AverageFeedback==='negative')
        {
            this.html = this.cryptocurrency + ' sentiment has decreased!';
        }
        else if(this.AverageFeedback==='nothing')
        {
            this.html =  this.cryptocurrency + ' average sentiment did not change!';
        }
        return this.html;
    }
}
module.exports =NotificationMessage ;