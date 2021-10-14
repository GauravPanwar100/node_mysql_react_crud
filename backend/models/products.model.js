const moment = require('moment');
const db = require("../config/db.config");

exports.addProduct = (data, callback) => {

    const insertQuery = 'INSERT INTO products (product_name, os, manufacturer, lastCheckedOutDate, lastCheckOutBy, isCheckedOut) VALUES (?, ?, ?, ?, ?, ?)';

    db.query(insertQuery, [data.product_name, data.os, data.manufacturer, data.lastCheckedOutDate, data.lastCheckOutBy, data.isCheckedOut], (error, result) => {
        if (error) {
            return callback(error);
        }
        return callback(null, 'Product added successfully.');
    })
}

exports.getAllProducts = (data, callback) => {

    const fetchQuery = 'SELECT * FROM products';

    db.query(fetchQuery, [], (error, result) => {
        if (error) {
            return callback(error);
        }
        return callback(null, result);
    })
}

exports.changeStatus = async (data, callback) => {
    let status = await fetchProductById(data.id);

    const updateQuery = 'UPDATE products SET isCheckedOut = ?, lastCheckedOutDate = ? WHERE id = ?';

    db.query(updateQuery, [!status, new Date(), data.id], (error, result) => {
        if (error) {
            return callback(error);
        }
        return callback(null, 'Product status updated successfully.');
    })
}

function fetchProductById(id) {
    
    return new Promise((resolve, reject) => {
        const productByIdQuery = 'SELECT isCheckedOut from products WHERE id = ?';
        return db.query(productByIdQuery, [id], (err, result) => {
            if (err) return null;
            // console.log("aqqq",result[0].isCheckedOut)
            resolve(result[0].isCheckedOut);
        });
    });
    
}

exports.editProduct = (data, callback) => {
    const ID = data.id;

    const sqlEdit = 'UPDATE products SET product_name = ?, os = ?, manufacturer = ?, lastCheckedOutDate = ?, lastCheckOutBy = ? WHERE id = ?';

    db.query(sqlEdit, [data.product_name, data.os, data.manufacturer, data.lastCheckedOutDate, data.lastCheckOutBy , ID], (error, result) => {
        if (error) {
            return callback(error);
        }
        return callback(null, 'Product edited successfully.');
    });
}

exports.deleteProduct = (data, callback) => {
    const ID = data.id;

    const sqlDelete = 'DELETE FROM products WHERE id=?';

    db.query(sqlDelete, ID, (error, result) => {
        if (error) {
            return callback(error);
        }
        return callback(null, 'Product deleted successfully.');
    });
}

exports.checkProductLimit = (data, callback) => {
    const sqlSelect = 'SELECT COUNT(*) AS totalProducts FROM products';
    db.query(sqlSelect, (error, result) => {
        if (error) {
            return callback(error);
        }
        return callback(null, result);
    })
}