const express = require("express");
const router = express.Router();
const chatsBLL = require ('../BLL/chatsBLL');


router.get("/:userId", async(req,res) => {
    const token = req.headers.authorization;
    let response = await chatsBLL.getChatListByUserId(token);
    res.send(response);
    })

router.post('/new', async (req, res) => {
        let token = req.headers.authorization;
        let obj = req.body;
        console.log(obj);
        let response = await chatsBLL.newChat( token, obj);
        res.send(response);
});

router.put('/:userId', async (req, res) => {
    let token = req.headers.authorization;
    let updatedDetails = req.body;
    let response = await chatsBLL.updateChatById(token, updatedDetails);
    if (response.msg === "Chat updated successfully!"){
        res.status(202).send(response);
    }
    else{
    res.status(404).send(response);
    }
});

router.delete('/:userId', async (req, res) => {
    // let token = req.session.token;
    let userId = req.params.userId;
    let chatId = req.body._id;
    // let response = await filmsBLL.deleteFilmById(token, userId, chatId);
    let response = await chatsBLL.deleteChatById( userId, chatId);
    res.send(response);
});

module.exports = router;