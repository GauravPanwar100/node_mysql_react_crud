const productsModel = require('../models/products.model');

exports.addProduct = (req, res, next) => {

    //apply validations here

    const data = {
        product_name: req.body.product_name,
        os: req.body.os,
        manufacturer: req.body.manufacturer,
        lastCheckedOutDate: req.body.lastCheckedOutDate,
        lastCheckOutBy: req.body.lastCheckOutBy,
        isCheckedOut: req.body.isCheckedOut
    }

    productsModel.checkProductLimit(null, (err, result) => {
        //console.log("resultttt",result)
        
        // res.status(200).send({ success: true, data: result[0].totalProducts });
        // return result[0].totalProducts;
        if (result[0].totalProducts > 10) {
            return res.status(201).json({ success: false, data: {}, message: "Max Limit of product creation Exceeded" });
        }
        
        productsModel.addProduct(data, (err, result) => {
            if (err) {
                console.log(err);
                return res.status(400).send({ success: false, data: 'Bad Request' });
            }
            return res.status(200).send({ success: true, data: result });
        })
    });
}

exports.getAllProducts = (req, res, next) => {

    const data = {};
    productsModel.getAllProducts(data, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(400).send({ success: false, data: 'Bad Request' });
        }
        return res.status(200).send({ success: true, data: result });
    })
}

exports.changeStatus = (req, res, next) => {
    const data = {
        id: req.params.id
    };
    productsModel.changeStatus(data, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(400).send({ success: false, data: 'Bad Request' });
        }
        return res.status(200).send({ success: true, data: result });
    })
}

exports.editProduct = (req, res, next) => {
    const data = {
        id: req.params.id,
        product_name: req.body.productName,
        os: req.body.os,
        manufacturer: req.body.manufacturer,
        lastCheckedOutDate: req.body.lastCheckedOutDate,
        lastCheckOutBy: req.body.lastCheckOutBy
    };
    productsModel.editProduct(data, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(400).send({ success: false, data: 'Bad Request' });
        }
        return res.status(200).send({ success: true, data: result });
    })
}

exports.deleteProduct = (req, res, next) => {
    const data = {
        id: req.params.id
    };
    productsModel.deleteProduct(data, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(400).send({ success: false, data: 'Bad Request' });
        }
        return res.status(200).send({ success: true, data: result });
    })
}
