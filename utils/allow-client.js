const { exec } = require('child_process');
 
exports.allowClient= (clientIp)=>{
    return new Promise((resolve, reject) => {
        const command = 'sudo ndsctl auth '+clientIp
        console.log(command)

        exec(command, (error, stdout, stderr) => {
            if (error) {
                reject(error)
                console.error("exec error: " + error)
                resolve(null)
                return 
            }
            resolve(stdout)
        })})};
    
 

  exports.checkAndKill =()=>{
    new Promise((resolve, reject) => {
      exec(`pkill -9 -f "coins.py"`, (err,stdout,stderr) => {
        if (err) {
          //reject(err);
          console.log(err)
          exec("python3 coins.py",(err,stdout,stderr)=>{
            if(err){
              console.log(err)
            }
            resolve("err")
            return
          })
          
        }
    });
  
  })}
      
        