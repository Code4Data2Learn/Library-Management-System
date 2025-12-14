const express = require('express');
const {users} =  require('../data/user.json');
const router = express.Router();

/**
 * Route: /users
 * Method: GET
 * Description: Get all the list of users in the system
 * Access: Public
 * Parameters: None
*/
router.get('/',(req,res)=>{
    res.status(200).json({
        success: true,
        data: users
    });
});

/**
 * Route: /users
 * Method: POST
 * Description: Create a new user
 * Access: Public
 * Parameters: None
*/
router.post('/',(req,res)=>{
    const {id,name,surname,email,issuedBook,issuedDate,returnDate,subscriptionType,subscriptionDate} = req.body
    if(!id || !name || !surname || !email || !issuedBook || !issuedDate || !returnDate || !subscriptionType || !subscriptionDate){
        res.status(400).json({
            success: false,
            message: "Please provide the required details"
        });
    }
    const user = users.find(each=>each.id === id)
    if(user){
        return res.status(409).json({
            success: false,
            message: "User Already Created"
        });
    }else{
        users.push({
        id,
        name,
        surname,
        email,
        issuedBook,
        issuedDate,
        returnDate,
        subscriptionType,
        subscriptionDate
    });

    res.status(201).json({
        success: true,
        message: "User Created Successfully"
    });
    }
});


/**
 * Route: /users/:id
 * Method: GET
 * Description: Get user by their ID
 * Access: Public
 * Parameters: id
*/
router.get('/:id',(req,res)=>{
    const {id} = req.params;
    const user = users.find(each=>each.id === id)

    if(!user){
        res.status(404).json({
            success: false,
            data: `User not found ${id}`
        });
    }else{
        res.status(200).json({
            success: true,
            data: user
        });
    }
});

/**
 * Route: /users/:id
 * Method: PUT
 * Description: Update the user by its ID
 * Access: Public
 * Parameters: id
*/
router.put('/:id',(req,res)=>{
    const {id} = req.params;
    const {data} = req.body;

    const user = users.find(each=>each.id === id);
    
    if(!user){
        res.status(404).json({
            success: false,
            data: `User not found for ID: ${id}`
        });
    }else{
        const updateUser = users.map((each)=>{
            if(each.id === id){
                return{
                    ...each,
                    ...data,
                }
            }
            return each
        });

        res.status(200).json({
            success: true,
            data: updateUser,
            message: `User updated successfully`
        });
    }
});

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

router.get('/subscription/:id',(req,res)=>{
    const {id} = req.params;

    const user = users.find(each => each.id === id);

    if(!user){
        res.status(200).json({
            success: false,
            message: "User not found"
        });
    }else{
        const getDateInDays = (data = '')=>{
        let date;
        if(data){
            date = new Date(data);
        }else{
            data = new Date();
        }
        let days = Math.floor(data / (1000 * 60 * 60 * 24));
        return days;
    }

        const subscriptionType = (data) =>{
            if(user.subscriptionType === "Basic"){
                date = date + 90;
            }else if(user.subscriptionType === "Standard"){
                date = date + 180;
            }else if(user.subscriptionType === "Premium"){
                date = date + 365;
            }
            return date
        }

        let returnDate = getDateInDays(user.returnDate);
        let currentDate = getDateInDays();
        let subscriptionDate = getDateInDays(user.subscriptionDate);
        let subscriptionExpiration = subscriptionType(subscriptionDate);

        const data = {
            ...user,
            subscriptionExpiration: subscriptionExpiration < currentDate,
            subscriptionDaysLeft: subscriptionExpiration - currentDate,
            daysLeftForExpiration: returnDate - currentDate,
            returnDate: returnDate < currentDate ? "Book is overdue" : returnDate,
            fine: returnDate < currentDate ? subscriptionExpiration <= currentDate ? 200 : 100 : 0
        }

        res.status(200).json({
            success: true,
            data: data
        })
    }
});

module.exports = router;
