const express = require("express");
const uuid = require("uuid");
const router = express.Router();
const members = require("../../Members");

//Gets all members
router.get("/", (req, res) => res.json(members));

//Get single member
router.get("/:id", (req, res) => {
  const found = members.some(member => member.id === parseInt(req.params.id));

  if (found) {
    res.json(members.filter(member => member.id === parseInt(req.params.id)));
  } else {
    res.status(400).json({
      msg: `No members found with the id of ${req.params.id}`
    });
  }
});

//Create one or more members
router.post("/", (req, res) => {
  console.log(req.body.name, req.body.email);
  const newMembers = 
    Array.from(req.body).length === 0 
      ? Array.from([req.body]) 
      : Array.from(req.body);

  newMembers.forEach(member => {
    let newMember = {
      id: uuid.v4(),
      name: member.name,
      email: member.email,
      status: 'active'
    }

    if (!member.name || !member.email) {
      return res.status(400).json({
        msg: "Please enter a name and email"
      });
    }

    members.push(newMember);
  });

  res.json(members);
  // res.redirect('/')
});

//Update member
router.put("/:id", (req, res) => {
  const found = members.some(member => member.id === req.params.id);

  if (found) {
    const updatedMember = req.body;
    members.forEach(member => {
      if (member.id === req.params.id) {
        member.name = updatedMember.name ? updatedMember.name : member.name;
        member.email = updatedMember.email ? updatedMember.email : member.email;

        res.json({msg: `Member with id of ${req.params.id} has been updated`, member});
      }
    })
  } else {
    res.status(400).json({
      msg: `No members found with the id of ${req.params.id}`
    });
  }
});

//Delete member 
router.delete("/:id", (req, res) => {
  const found = members.some(member => member.id === req.params.id);

  if (found) {
    res.json({msg: 'Member deleted', member: members.filter(member => member.id !== req.params.id)});
  } else {
    res.status(400).json({
      msg: `No members found with the id of ${req.params.id}`
    });
  }
});

module.exports = router;