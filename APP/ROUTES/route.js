/**
 * Created by kevinhuron on 11/09/2016.
 */
function REST_ROUTER(router,connection,bcrypt) {
    var self = this;
    self.handleRoutes(router,connection,bcrypt);
}

REST_ROUTER.prototype.handleRoutes= function(router,connection,bcrypt) {
    router.get("/",function(req,res){
        res.json({"Message" : "Hello World !"});
    })
};

module.exports = REST_ROUTER;