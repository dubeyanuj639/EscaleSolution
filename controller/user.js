import userModel from '../model/user';
import { response } from '../common/fnc';

export var create = async (req, res) => {
    try {
        if (!req.body.name || !req.body.email || !req.body.bio || !req.file) return response(res, 400, 'Bad Request.')
        let userExist = await userModel.findOne({ email: req.body.email })
        if (userExist != null) return response(res, 409, 'User already exist.')
        let result = await userModel(
            {
                name: req.body.name,
                email: req.body.email,
                bio: req.body.bio,
                profilePic: req.file.filename

            }).save()
        return response(res, 200, { userId: result._id, name: req.body.name, email: req.body.email, bio: req.body.bio, profilePic: req.file.filename })
    }

    catch (e) {
        return response(res, 500, 'Internal Server Error.', e)
    }
}

export var get = async (req, res) => {
    try {
        if (!req.params.email) return response(res, 400, 'Bad Request.')
        let result = await userModel.findOne({ email: req.params.email })
            .populate({
                path: 'businessId',
                select: 'name email registrationNo',
                populate: {
                    path: 'productId',
                    select: 'name mrp description image2'
                }
            })
            .populate('productId', 'name mrp description image2')
        if (!result) return response(res, 404, 'EmailId not exist.')
        return response(res, 200, result)
    }
    catch (e) {
        return response(res, 500, 'Internal Server Error.', e)
    }
}
