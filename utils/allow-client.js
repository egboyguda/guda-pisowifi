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
    
