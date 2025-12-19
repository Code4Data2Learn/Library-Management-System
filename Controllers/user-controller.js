const {userModel, bookModel} = require('../models');

exports.getAllUsers = async (req,res) =>{
    const users = await userModel.find();

    if(!users || users.length === 0){
        return res.status(404).json({
            success: false,
            message: 'No users found'
        });
    }
    res.status(200).json({
        success: true,
        data: users
    });
}

exports.getSingleUserById = async(req,res)=>{
    const {id} = req.params;
    const user = await userModel.findById(id);
    
    if(!user){
        return res.status(404).json({
            success: false,
            message: `User not found for id: ${id}`
        });
    }
    res.status(200).json({
        success: true,
        data: user
    });
}

exports.addUser = async(req,res) =>{
    const {data} = req.body;

    if(!data || Object.keys(data) === 0){
        return res.status(400).json({
            success: false,
            message: "Please provide the data to add a new user"
        })
    }

    await userModel.create(data);
    const allUsers = await userModel.find();

    res.status(200).json({
        success: true,
        message: "User added successfully",
        data: allUsers
    });
}

exports.updateUserById = async (req,res) =>{
    const {id} = req.params;
    const {data} = req.body;

    const updateUser = await userModel.findOneAndUpdate(
        {_id: id},
        data,
        {new: true}
    );

    if(!updateUser){
        return res.status(404).json({
            success: false,
            message: `User not found for ${id}`,
        })
    }

    res.status(200).json({
        success: true,
        message: "User updated successfully",
        data: updateUser
    })
}

exports.deleteUserById = async (req,res) =>{
    const {id} = req.params;

    const user = await userModel.findById(id);

    if(!user){
        return res.status(404).json({
            success: false,
            message: `User not found for id: ${id}`
        })
    }

    await userModel.findByIdAndDelete(id);
    res.status(200).json({
        success: true,
        message: 'User deleted successfully'
    })
}

