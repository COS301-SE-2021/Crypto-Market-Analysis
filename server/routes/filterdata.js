

const filterdata = async (data,tags)=>{
    let myPagesArr = []
    for(const a of data)
    {
        for(const tg of tags)
        {
            if(a.includes(tg))
            {
                myPagesArr.push(a);
            }
        }
    }
    return myPagesArr;
}
let data = ['bitcoin this and that blah blah blah','i am expreamily diguise as another dude playing the dude','this is important doesitbitcoinnewsshit'];
let tags = [ 'bitcoin','#bitcoin',' #bitcoins','#bitcoinnews'];
filterdata(data,tags).then((myPagesArr)=>{console.log(myPagesArr)});