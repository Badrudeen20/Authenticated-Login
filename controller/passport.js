const localstrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
  function initprocess(passport,getEmail,getId){
       passport.use(new localstrategy({usernameField:'email'}, async function(email,password,done){
              const user = getEmail(email)
              if(user == null){
                    return done(null,false,{message:"Email not found!"})
              }

               try{
                    if(await bcrypt.compare(password,user.password)){
                          return done(null,user)
                    }else{
                             return done(null,false,{message:"Password incorect!"})   
                        }

                  } catch (e){
                    return done(e)
                  }
       }))

     passport.serializeUser((user,done)=>done(null,user.id))
     passport.deserializeUser((id,done)=>{
           return done(null,getId(id))
     })
  }

module.exports = {
      initprocess
}