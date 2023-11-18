class Bootcamp{
    method;
    url;
    constructor(method,url){
        this.method=method;
        this.url=url;
    }
    getBootCamps(){
        let url = this.url
        return {url, msg:"Get all bootcamps yeah" };
    }

}

module.exports = Bootcamp;