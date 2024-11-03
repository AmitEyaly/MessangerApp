const express = require("express");
const router = express.Router();
const usersBLL = require ('../BLL/usersBLL')

// localhost:3030/users/showInfo
router.get("/allUsers", async(req,res) => {
  // let response = await usersBLL.getAllUsers(token);
  let response = await usersBLL.getAllUsers();
  res.send(response);
  })

  router.get('/myContacts', async(req, res) =>{
    const token = req.headers.authorization;
    let response = await usersBLL.getUserMobileContacts(token);
    res.send(response);
  
  });

router.get('/:id', async(req, res) =>{
  const token = req.headers.authorization;
  const id = req.params.id;
  let response = await usersBLL.getUserById(token, id);
  res.send(response);

});






  
  module.exports = router;