const { v4: uuid } = require("uuid")

exports.Mutation = {
    addCategory: (parent, { input }, { db }) => {

        const { name } = input

        const addedCategory = {
            id: uuid(),
            name
        }
        db.categories.push(addedCategory)
        return addedCategory;
    },
    addProduct: (parent, { input }, { db }) => {

        const { name, description, image, price, onSale, categoryId, quantity } = input;

        const addProduct = {
            id: uuid(),
            name,
            description,
            image,
            quantity,
            price,
            onSale,
            categoryId
        }
        db.products.push(addProduct)
        return addProduct
    },
    addReview: (parent, { input }, { db }) => {
        const { date, title, comment, rating,productId } = input;
        const addReview = {
            id: uuid(),
            date,
            title,
            comment,
            rating,
            productId
        }
        db.reviews.push(addReview);
        return addReview;
    },
    deleteCategory:(parent,{id},{db}) => {
        db.categories = db.categories.filter(category => {
            category.id !== id
        })
        db.products = db.products.map(product => {
            if(product.categoryId === id){
                return{
                    ...product,
                    categoryId:null
                }
            }
            else return product
        })
        return true;
    },
    deleteProduct:(parent,{id},{db}) => {
        db.products = db.products.filter(product => {
            product.id !== id;
        })
        db.reviews = db.reviews.filter(review => {
            review.productId !== id
        });
       
        return true
    }
}