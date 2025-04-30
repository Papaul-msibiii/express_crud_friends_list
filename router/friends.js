const express = require('express');

const router = express.Router();

let friends = {
    "johnsmith@gamil.com": {"firstName": "John","lastName": "Doe","DOB":"22-12-1990"},
    "annasmith@gamil.com":{"firstName": "Anna","lastName": "smith","DOB":"02-07-1983"},
    "peterjones@gamil.com":{"firstName": "Peter","lastName": "Jones","DOB":"21-03-1989"}
};


// GET request: Retrieve all friends
router.get("/",(req,res)=>{
  res.send(JSON.stringify(friends, null, 4))//This line is to be replaced with actual return value
});

// GET by specific ID request: Retrieve a single friend with email ID
router.get("/:email",(req,res)=>{
  let email = req.params.email;
  res.send(friends[email])
});


// POST request: Add a new friend
router.post("/",(req,res)=>{
  // Check if email is provided in the request body
  console.log(req.query)
  if(req.query.email) {
    friends[req.query.email] = {
        "firstName": req.query.firstName,
        "lastName": req.query.lastName,
        "DOB": req.query.DOB
    }
  }
  res.send("The user " +  (' ') + req.query.firstName + " Has been added!")
});


// PUT request: Update the details of a friend with email id
router.put("/:email", (req, res) => {
  // Extract email parameter from request URL
  const email = req.params.email;
  let friend = friends[email];  // Retrieve friend object associated with email

  if(friend) {
    let DOB = req.body.DOB;
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;

    if(DOB) {
        friend["DOB"] = DOB
    }
    if(firstName) {
        friend["firstName"] = firstName
    }
    if(lastName) {
        friend["lastName"] = lastName
    }

    friends[email] = friend // Update friend details in 'friends' object
    res.send(`Friend with the email ${email} updated.`);
  } else {
    // Respond if friend with specified email is not found
    res.send("Unable to find friend!");
    }
});


// DELETE request: Delete a friend by email id
router.delete("/:email", (req, res) => {
  // Extraire le paramètre email de l'URL de la requête
    const email = req.params.email;
    if (email) {
        // Supprimer l'ami de l'objet 'friends' en fonction de l'email fourni
        delete friends[email];
    }
    
    // Envoyer une réponse confirmant la suppression de l'ami
    res.send(`Ami avec l'email ${email} supprimé.`);
});

module.exports=router;
