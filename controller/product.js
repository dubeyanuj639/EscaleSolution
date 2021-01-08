import { response } from '../common/fnc';
import productModel from '../model/products';
import businessModel from '../model/business';
import userModel from '../model/user';

export var create = async (req, res) => {
    try {
        if ((!req.body.name || !req.body.mrp || !req.body.description || !req.file) || (!req.body.userId && !req.body.businessId)) return response(res, 400, 'Bad Request.')
        var query = { name: req.body.name }
        if (req.body.userId) query.userId = req.body.userId
        else query.businessId = req.body.businessId
        let exist = await productModel.findOne(query)
        if (exist) return response(res, 404, 'Product is already exist with this user/business.')
        let result = await productModel({
            name: req.body.name,
            mrp: req.body.mrp,
            description: req.body.description,
            image2: req.file.filename,
            userId: req.body.userId,
            businessId: req.body.businessId
        }).save()
        if (req.body.userId)
            await userModel.findByIdAndUpdate(req.body.userId, { $push: { productId: result._id } }, { new: true })
        await businessModel.updateOne({ _id: req.body.businessId }, { $push: { productId: result._id } }, { new: true })
        return response(res, 200, result)
    }
    catch (e) {
        return response(res, 500, 'Internal Server Error.', e)
    }
}

export var get = async (req, res) => {
    try {
        if (!req.params.productId) return response(res, 400, 'Bad Request.')
        let result = await productModel.findById(req.params.productId)
        if (!result) return response(res, 404, 'Product Information not found.')
        return response(res, 200, result)
    }
    catch (e) {
        return response(res, 500, 'Internal Server Error.', e)
    }
}

export var update = async (req, res) => {
    try {
        if (!req.params.productId) return response(res, 400, 'Bad Request.')
        var obj = {}
        if (req.body.name) obj.name = req.body.name
        if (req.body.mrp) obj.mrp = req.body.mrp
        if (req.body.description) obj.description = req.body.description
        if (req.file) obj.image2 = req.file.filename
        let result = await productModel.findByIdAndUpdate(req.params.productId, obj, { new: true })
        if (!result) return response(res, 404, 'Product Information not found.')
        return response(res, 200, result)
    }
    catch (e) {
        return response(res, 500, 'Internal Server Error.', e)
    }
}

export var remove = async (req, res) => {
    try {
        if (!req.params.productId) return response(res, 400, 'Bad Request.')
        await productModel.deleteOne({ _id: req.params.productId })
        return response(res, 200, 'Deleted')
    }
    catch (e) {
        return response(res, 500, 'Internal Server Error.', e)

    }
}
