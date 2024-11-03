const express = require('express');
const router = express.Router();
const authBLL = require("../BLL/authBLL");

router.post('/register', async (req, res) => {
    let obj = req.body;
    let response = await authBLL.register(obj);
    res.send(response);
})
router.post('/login', async (req, res) => {
    let obj = req.body;
    let response = await authBLL.login(obj);
    if (response.msg=="logged-in") {
        // Set status code to 200 (OK) for successful login
        req.session.token = response.token;
        req.session.userId = response.userId;
        req.session.userName = response.userName
        res.status(200).send(
          {msg:'Login successful',token:req.session.token, userId:req.session.userId, userName:req.session.userName});
      } else {
        // Set status code to 401 (Unauthorized) for unsuccessful login
        res.status(401).send('Unauthorized');
      }

})

module.exports = router;