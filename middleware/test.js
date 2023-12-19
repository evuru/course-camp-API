class Test {
    constructor(req,res){
        this.req = req;
        this.res = res;
    }
    
    testBootcamp(){
        return "boot tested";
    }
}

module.exports = Test;