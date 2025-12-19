const express = require('express');
const {users} =  require('../data/user.json');

const {userModel,bookModel} = require('../models/index');
const { getAllUsers, getSingleUserById, addUser, updateUserById } = require('../Controllers/user-controller');

const router = express.Router();

/**
 * Route: /users
 * Method: GET
 * Description: Get all the list of users in the system
 * Access: Public
 * Parameters: None
*/
router.get('/',getAllUsers);

/**
 * Route: /users
 * Method: POST
 * Description: Create a new user
 * Access: Public
 * Parameters: None
*/
router.post('/',addUser);


/**
 * Route: /users/:id
 * Method: GET
 * Description: Get user by their ID
 * Access: Public
 * Parameters: id
*/
router.get('/:id',getSingleUserById);

/**
 * Route: /users/:id
 * Method: PUT
 * Description: Update the user by its ID
 * Access: Public
 * Parameters: id
*/
router.put('/:id',updateUserById);

/**
 * Route: /users/:id
 * Method: DELETE
 * Description: Delete a user by its ID
 * Access: Public
 * Parameters: id
*/
router.delete('/:id',(req,res)=>{
    const {id} = req.params;
    const user = users.find(each=>each.id === id);

    if(!user){
        res.status(404).json({
            success: false,
            message: `User not found for id: ${id}`
        });
    }else{
           const deleteUser = users.filter(each=>each.id !== id);

        res.status(200).json({
            success:true,
            data: deleteUser,
            message: "User deleted Successfully"
        });
    }
});


module.exports = router;
