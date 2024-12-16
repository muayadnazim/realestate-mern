import { errorHandeler } from '../utils/error.js'
import bcryptjs from 'bcryptjs'
import User from '../models/user.model.js'
import Listing from '../models/listing.model.js'



export const user = (req, res) => {
    res.json({ 'message': "hello world 2" })



}
export const upDateUserInfo = async (req, res, next) => {
    if (req.user.id !== req.params.id) return next(errorHandeler(402, 'you can only update own account'))
    try {
        if (req.body.password) {
            req.body.password = bcryptjs.hashSync(req.body.password, 10)
        }

        const updateUser = await User.findByIdAndUpdate(req.user.id, {
            $set: {
                username: req.body.username,
                password: req.body.password,
                email: req.body.email,
                avatar: req.body.avatar,
            }
        }, { new: true })


        const { password, ...rest } = updateUser._doc;


        res.status(200).json(rest)
    } catch (error) {
        next(error)
    }


}

export const deleteUser = async (req, res, next) => {
    if (req.user.id !== req.params.id) return next(errorHandeler(402, 'you can only delet own account'))

    try {
        await User.findByIdAndDelete(req.params.id)
        res.clearCookie('access_token')
        res.status(200).json('user has been deleted!')
    } catch (error) {
        next(error)
    }


}

export const getUserList = async (req, res, next) => {

    if (req.user.id === req.params.id) {
        try {
            const list = await Listing.find({ userRef: req.params.id })
            res.status(200).json(list)
        } catch (error) {
            next(error)
        }

    } else {
        next(errorHandeler(401, 'you can only view your own listing'))
    }

}

export const getUser = async (req, res, next) => {

    try {
        const user = await User.findById(req.params.id)

        if (!user) {
            return next(errorHandeler(404, 'User not found'))
        }

        const { password: pass, ...rest } = user._doc



        res.status(200).json(rest)
    } catch (error) {
        next(error)
    }

}