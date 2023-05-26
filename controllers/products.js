const Product  = require('../models/product')
const getAllProducts = async (req,res)=> {

    const{company,name,featured,sort,select} = req.query

    const queryObj = {}
    if(company) {
        queryObj.company = company
    }
    if(featured) {
        queryObj.featured = featured
    }
    if(name) {
        queryObj.name = { $regex: name, $options: "i"}
    }
    let apiData = Product.find(queryObj)
    if(select) {
        // let selectFix = select.replace(",", " ")
        let selectFix = select.split(',').join(" ")
        apiData = apiData.select(selectFix)
    }
    let page = Number(req.query.page) || 1
    let limit  = Number(req.query.limit) || 10
    let skip = (page -1) * limit
    apiData = apiData.skip(skip).limit(limit)
    

    if(sort) {
        let sortFix = sort.replace(",", " ")
        apiData = apiData.sort(sortFix)
    }
    const Products = await apiData
    res.status(200).json({Products, nbHits: Products.length})
}
const getAllProductsTesting = async (req,res)=> {
    const mydata = await Product.find(req.query).select("name company")
    res.status(200).json({mydata})
}

module.exports = {getAllProducts,getAllProductsTesting}