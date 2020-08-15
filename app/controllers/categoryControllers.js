const Category = require('../models/category')
const categoryControllers = {}

categoryControllers.list = (req,res) => {
    Category.find()
        .then(lists => {
            res.json(lists)
        })
        .catch(err => res.json(err))
}

categoryControllers.create = (req,res) => {
    const { body } = req
    const category = new Category(body)
    category.save()
        .then(category => {
            res.json(category)
        }).catch(err => res.json(err))
}

categoryControllers.show = (req,res) => {
    const id = req.params.id
    Category.findOne({_id: id})
    .then(category => {
        res.json(category)
    }).catch(err => res.json(err))
}

categoryControllers.update = (req,res) => {
    const { body } = req
    const id = req.params.id
    Category.findOneAndUpdate({_id: id}, body, {new: true})
        .then(category => {
            res.json(category)
        }).catch(err => res.json(err))
}

categoryControllers.destroy = (req,res) => {
    const id = req.params.id
    Category.findOneAndRemove({_id: id})
    .then(category => {
        res.json(category)
    }).catch(err => res.json(err))
}

module.exports = categoryControllers