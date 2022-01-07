const { db } = require("../db");


exports.Query = {
    hello: () => {
        return "hello"
    },
    products: (parent, { filter }, { db }) => {
        let filteredProducts = db.products;


        if (filter) {
            const {onSale,avgRating} = filter;
            if (onSale) {
                filteredProducts = filteredProducts.filter(product => {
                    return db.product.onSale
                })
            }
            if([1,2,3,4,5].includes(avgRating)){
                filteredProducts = filteredProducts.filter(product => {
                    let sumrating = 0;
                    let numberofreviews = 0;
                    db.reviews.forEach(review => {
                        if(review.productId === db.product.id){
                            sumrating += review.rating
                            numberofreviews++;
                        }

                    })
                    const averageProductRating = sumrating/numberofreviews;
                    return averageProductRating >= avgRating
                })
            }
        }
        return filteredProducts
    },
    product: (parent, args, { db }) => {
        const productId = args.id;
        return db.products.find(product => product.id === productId);

    },
    categories: (parent, args, { db }) => db.categories,
    category: (parent, args, { db }) => {
        const { id } = args;
        return db.categories.find(category => category.id === id)
    }
}