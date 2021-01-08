import { response } from '../common/fnc';
import businessModel from '../model/business';
import userModel from '../model/user';

export var create = async (req, res) => {
    try {
        if (!req.body.name || !req.body.email || !req.body.registrationNo || !req.params.userId) return response(res, 400, 'Bad Request.')
        let exist = await businessModel.findOne({ registrationNo: req.body.registrationNo })
        if (exist != null) return response(res, 409, 'Business already exist with this registration Number.')
        let result = await businessModel({
            name: req.body.name,
            email: req.body.email,
            registrationNo: req.body.registrationNo
        }).save()
        await userModel.updateOne({ _id: req.params.userId }, { $push: { businessId: result._id } })
        return response(res, 200, result)
    }
    catch (e) {
        return response(res, 500, 'Internal Server Error.', e)
    }
}

export var get = async (req, res) => {
    try {
        if (!req.params.registrationNo) return response(res, 400, 'Bad Request.')
        let result = await businessModel.findOne({ registrationNo: req.params.registrationNo }).populate('productId','name mrp description image2')
        if (!result) return response(res, 404, 'No business found with this registration Number.')
        return response(res, 200, result)
    }
    catch (e) {
        return response(res, 500, 'Internal Server Error.', e)
    }
}
