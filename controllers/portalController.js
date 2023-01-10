
const express = require("express")
const { exec } = require('child_process');
const allowClient = require("../utils/allow-client")


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


exports.getPin3 = async function(req,res){

    let gpio5 = new Gpio({pin:3});
    gpio5.read()
    .then((state)=>{
        console.log(state); //state of pin 5
    });
}
exports.getCoin =function(req,res){
    console.log(req.query)
    res.send("ok")
}