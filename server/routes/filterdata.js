let data = ['bitcoin this and that blah blah blah','i am expreamily diguise as another dude playing the dude','this is important doesitbitcoinnewsshit'];
let tags = [ 'bitcoin','#bitcoin',' #bitcoins','#bitcoinnews'];

const filterdata = async (data)=>{
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
filterdata(data).then((myPagesArr)=>{console.log(myPagesArr)});