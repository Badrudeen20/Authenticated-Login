function NotAuthenticate(req,res,next){
     if(req.isAuthenticated()){
       return   res.redirect('/')
     }
      next()
}
 module.exports = {
      NotAuthenticate
 }