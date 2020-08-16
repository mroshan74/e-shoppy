const Product = require('../models/product')
const formidable = require('formidable')
const _ = require('lodash')
const fs = require('fs')
const { join } = require('path')
const uploadFolderStatus = require('../../config/uploadFolder')
const productControllers = {}

productControllers.show = (req,res) => {
    const id = req.params.id
    Product.findOne({_id: id})
    .then(product => {
        res.json(product)
    }).catch(err => res.json(err))
}

productControllers.list = (req,res) => {
    const limit = req.query.limit ? parseInt(req.query.limit) : 8
    const sortType = req.query.sortType ? req.query.sortType : 'desc'
    const sortBy = req.query.sortBy ? req.query.sortBy : '_id'
    Product.find()
        .populate('category')
        .limit(limit)
        .sort({[sortBy]: sortType})
        .then(lists => {
            res.json(lists)
        })
        .catch(err => res.json(err))
}

productControllers.create = async (req,res) => {

    const uploadFolder = './uploads'
    const uploadDirExists = await uploadFolderStatus(uploadFolder)

    if(!uploadDirExists){
        return res.status(503).json({
            errors: 'Upload path not found',
            message: 'Could not find directory to save data',
            success: false,
        })
    }

    let form = new formidable.IncomingForm({
        keepExtensions: true,
        //multiples: true,
        uploadDir: uploadFolder
    })

    form.parse(req, (err, fields, file) => {
        if(err){
            return res.status(400).json({
                errors: 'Invalid data',
                message: 'Data received cannot be processed.',
                success: false,
            })
        }
        else{
            // restriction on fields
            let product = new Product(fields)

            // handle file
            function validateFileType(file){
                //console.log(file.type)
                const type = file.type.split('/').pop()
                const validTypes = [ 'jpeg', 'jpg', 'png']
                if(validTypes.includes(type)){
                    return true
                }
                else{
                    return false
                }
            }

            if(file.image){
                if(file.image.size > 3*1024*1024){
                    fs.unlink(file.image.path, err => {
                        if(err) throw err
                        //console.log('deleted',file.image.path)
                    })
                    return res.status(400).json({
                        errors: 'Invalid data',
                        message: 'Data received cannot be processed - Image size too large > 3Mb.',
                        success: false,
                    })
                }
                else if(!validateFileType(file.image)){
                    fs.unlink(file.image.path, err => {
                        if(err) throw err
                        //console.log('deleted',file.image.path)
                    })
                    return res.status(400).json({
                        errors: 'Invalid data',
                        message: 'Data received cannot be processed - Not of image type',
                        success: false,
                    })
                }
                else{
                    const fileName = encodeURIComponent(Date.now() + file.image.name.replace(/&. *;+/g, '-'))
                    try{
                        fs.rename(file.image.path, join(uploadFolder, fileName), err => {
                            if(err) throw err
                            //console.log('renamed',file.image.path)
                        })
                    }catch(e){
                        try { 
                                fs.unlink(file.image.path, err => {
                                if(err) throw err
                                //console.log('deleted',file.image.path)
                            }) 
                        }catch(e){}
                    }
                    console.log(file.image.path)
                    product.image.fileName = fileName
                    product.image.path = req.protocol + '://' + req.get('host')+ '/' + fileName
                    product.image.contentType = file.image.type
                }
            }

            // save to DB
            product.save()
                .then(product => {
                    res.json(product)
                }).catch(err => res.json(err))
        }
    })

}

productControllers.update = async(req,res) => {
    const id = req.params.id
    let product = await Product.findOne({_id:id})
    if(product){
        const uploadFolder = './uploads'
        const uploadDirExists = await uploadFolderStatus(uploadFolder)

        if(!uploadDirExists){
            return res.status(503).json({
                errors: 'Upload path not found',
                message: 'Could not find directory to save data',
                success: false,
            })
        }

        let form = new formidable.IncomingForm({
            keepExtensions: true,
            //multiples: true,
            uploadDir: uploadFolder
        })

        form.parse(req, (err, fields, file) => {
            if(err){
                return res.status(400).json({
                    errors: 'Invalid data',
                    message: 'Data received cannot be processed.',
                    success: false,
                })
            }
            else{
                // update product
                product = _.extend(product,fields)

                // handle file
                function validateFileType(file){
                    //console.log(file.type)
                    const type = file.type.split('/').pop()
                    const validTypes = [ 'jpeg', 'jpg', 'png']
                    if(validTypes.includes(type)){
                        return true
                    }
                    else{
                        return false
                    }
                }

                //console.log('product image path ---> ', product.image.fileName, product)
                if(file.image){
                    fs.unlink('./uploads/'+product.image.fileName, err => {
                        if(err) throw err
                        console.log('deleted old image')
                    })
                    if(file.image.size > 3*1024*1024){
                        fs.unlink(file.image.path, err => {
                            if(err) throw err
                            //console.log('deleted',file.image.path)
                        })
                        return res.status(400).json({
                            errors: 'Invalid data',
                            message: 'Data received cannot be processed - Image size too large > 3Mb.',
                            success: false,
                        })
                    }
                    else if(!validateFileType(file.image)){
                        fs.unlink(file.image.path, err => {
                            if(err) throw err
                            //console.log('deleted',file.image.path)
                        })
                        return res.status(400).json({
                            errors: 'Invalid data',
                            message: 'Data received cannot be processed - Not of image type',
                            success: false,
                        })
                    }
                    else{
                        const fileName = encodeURIComponent(Date.now() + file.image.name.replace(/&. *;+/g, '-'))
                        try{
                            fs.rename(file.image.path, join(uploadFolder, fileName), err => {
                                if(err) throw err
                                //console.log('renamed',file.image.path)
                            })
                        }catch(e){
                            try { 
                                    fs.unlink(file.image.path, err => {
                                    if(err) throw err
                                    //console.log('deleted',file.image.path)
                                }) 
                            }catch(e){}
                        }
                        console.log(file.image.path)
                        product.image.fileName = fileName
                        product.image.path = req.protocol + '://' + req.get('host')+ '/' + fileName
                        product.image.contentType = file.image.type
                    }
                }
                // save to DB
                product.save()
                    .then(product => {
                        res.json(product)
                    }).catch(err => res.json(err))
            }
        })
    }
    else{
        res.status(400).json({
            success: false,
            errors: 'Not found',
            message: 'Product not found'
        })
    }
}

productControllers.destroy = (req,res) => {
    const id = req.params.id
    Product.findOneAndRemove({_id: id})
    .then(product => {
        fs.unlink('./uploads/'+product.image.fileName, err => {
            if(err) throw err
            console.log('deleted')
        })
        res.json(product)
    }).catch(err => res.json(err))
}


productControllers.updateStock = (req,res,next) => {
    let updateStockOperation = req.body.order.products.map(product => {
        return {
            updateOne: {
                filter: { _id: product._id },
                update: { $inc: {
                    sold: +product.quantity,
                    stock: -product.quantity,
                }}
            }
        }
    })

    Product.bulkWrite(updateStockOperation, {}, (err,products) => {
        if(err){
            return res.status(400).json({
                success: false,
                errors: 'Bulk operation failed',
                message: 'Unable to update stocks by order'
            })
        }
    })
}

module.exports = productControllers