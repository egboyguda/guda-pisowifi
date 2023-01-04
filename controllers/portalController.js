
const express = require("express")
const { exec } = require('child_process');
const allowClient = require("../utils/allow-client")
exports.authClient=async function(req, res)  {
    const clientip = req.ip.slice(7)
    const val=await allowClient.allowClient(clientip)
    if(val!==null){
        res.send("Allowed")
    }
    res.send("portal")
}

exports.getPortal = function(req,res){
   res.render("portal")
}