const express = require("express");
const {Customer,Transfer} = require('../model/customer');
const router = express.Router();

router.get("/customers",async(req,res,next)=>{
    try {
        const result = await Customer.find();
        if(result){
            res.status(200).json({
                result
            })
        }
    } catch (err) {
        res.status(404).json({
            err: err.message
        })
    }
});

router.post("/transfer",async(req,res,next)=>{
    const {from, to , quantity}= req.body;
    try {
      const con1 =  await Customer.updateOne({
          name:from
      },{
            $inc:{balance:-quantity}
        });
        if(con1){
              await Customer.updateOne({
                name:to
              },{
                $inc:{balance:quantity}
            }); 
            await Transfer.create({
                records : `${from} transfer the ${quantity}EGP to ${to} successfully`
            })
            res.status(200).json("successful operation")
        }

    } catch (err) {
        res.status(404).json({
           err: err.message
        });
    }
});
router.get("/transfer",async(req,res,next)=>{
    try {
       const result= await Transfer.find({},{records:1,createdAt:1}); 
       if(result){
        res.status(200).json(result)
       }
       
    } catch (err) {
        res.status(404).json({
            err: err.message
        });
    }
});

module.exports = router;