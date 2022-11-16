const bcrypt =require('bcrypt');
const saltRounds = 10; 

const hashPassword = plainPassword => { 
    return new Promise (reslove=> { 
        reslove(bcrypt.hashSync(plainPassword,saltRounds))

    })
}

const comparePassword =(painPass,passFromDb)=> { 
    return new Promise((reslove,reject)=> { 
        bcrypt.compare(painPass,passFromDb,function(err,result){ 
            if(err) reject(err) ; 
            reslove(result);
        });
    });
};
module.exports= {hashPassword,comparePassword,
} ; 