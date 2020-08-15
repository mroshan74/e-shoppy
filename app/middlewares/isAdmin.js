const isAdmin = (req,res,next) => {
    if(req.user.role){
        next()
    }
    else{
        res.status(403).json({
            errors: 'Access Denied',
            message: 'User does not have admin privilege'
        })
    }
}

module.exports = isAdmin