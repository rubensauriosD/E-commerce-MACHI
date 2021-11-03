module.exports= function UsuarioAutenticado(req,res,next){
    if(req.isAuthenticated()){
        return next()
    }
    res.json({error:"Usuario no Autenticado"})
} 
