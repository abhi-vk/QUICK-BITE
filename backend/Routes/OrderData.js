const express = require('express');
const router = express.Router();
const order = require('../models/Orders.js')

router.post('/order_data' , async (req,res)=>{
     let data = req.body.orderData;
     await  data.splice(0,0,{orderDate : req.body.orderDate});
     let emailId = await  order.findOne({'email': req.body.email});

    if (emailId === null) {
        try {
            await order.create({
                email: req.body.email,
                orderData: [req.body.orderData]
            }).then(() => { res.json({ success: true }) }
            )
        }
        catch (error) {
            console.log(error.message);
            res.send("Server Error", error.message)
        }
    }
    else {
        
        try {
            await order.findOneAndUpdate({ email: req.body.email }, { $push: { orderData: req.body.orderData } }).then(() => {
                res.json({ success: true })
            })
        }
        catch (error) {
            res.send("Server Error", error.message)
        }

    }
});

router.post('/myOrder_data' , async (req,res)=>{
try {
    let myData = await order.findOne({'email' : req.body.email});
    res.json({orderDataPack : myData});

} catch (error) {
    res.send("Server Error" , error.message);
}






});

module.exports = router;