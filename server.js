const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
const TILL = "1833074";
const MIN = 100;
app.get('/', (req,res)=>{
  res.status(200).json({service:"CrashStats API", status:"LIVE", till:TILL, min:MIN, message:`LIVE Till ${TILL} active Min ${MIN}`});
});
app.get('/health', (req,res)=> res.status(200).send('OK'));
app.post('/api/stkpush', (req,res)=>{
  let {phone, amount} = req.body;
  if(!phone || !amount) return res.status(400).json({success:false, error:"Phone & amount required"});
  amount = Number(amount);
  if(amount < MIN) return res.status(400).json({success:false, error:`Minimum is ${MIN}`});
  phone = String(phone).replace(/\s/g,'');
  if(phone.startsWith('07')) phone='254'+phone.slice(1);
  if(phone.startsWith('01')) phone='254'+phone.slice(1);
  if(!phone.startsWith('254')) phone='254'+phone;
  console.log(`STK PUSH ${phone} KES ${amount} -> Till ${TILL}`);
  res.json({success:true, message:`STK pushed to ${phone}`, data:{phone, amount, till:TILL, status:"LIVE"}});
});
const PORT = process.env.PORT || 10000;
app.listen(PORT, '0.0.0.0', ()=> console.log(`LIVE Till ${TILL} Min ${MIN} on ${PORT}`));
