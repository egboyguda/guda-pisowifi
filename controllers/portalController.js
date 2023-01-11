
const express = require("express")
const { exec } = require('child_process');
const allowClient = require("../utils/allow-client")
//const py = require("../utils/allow-client")
const {PythonShell} = require('python-shell')
const python =new PythonShell("coins.py")
exports.authClient=async function(req, res)  {
    const clientip = req.ip.slice(7)
    const val=await allowClient.allowClient(clientip)
    if(val!==null){
        return res.send("Allowed")
    }
    res.send("portal")
}

exports.getPortal = function(req,res){

   res.render("portal")
}




//run python script to insert coins
exports.getCoin = async function(req,res){
    //await py.killPython()
    await allowClient.checkAndKill()
    //console.log("call")
    //await python.kill()
 
    res.send("ok")
}
