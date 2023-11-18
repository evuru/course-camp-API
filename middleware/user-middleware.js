class User{
    method;
    url;
    constructor(method,url){
        this.method=method;
        this.url=url;
    }
    handleGet(){
        let url = this.url
        console.log(this.url);
        // return {url };
    }

}

module.exports = User;