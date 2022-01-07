const { gql } = require("apollo-server");


exports.typeDefs = gql`
   type Query{
        hello: String
        products(filter: ProductsFilter):[Product!]! 
        product(id:ID!):Product   
        categories:[Category!]!
        category(id:ID!):Category
}
    type Product {
        id:ID!
        name:String!,
        description:String!,
        image:String!
        price:Float!,
        onSale:Boolean!
        categoryId:String!
        category:Category
        reviews:[Review!]!
    }
    type Mutation{
        addCategory(input:addCategoryInput):Category!
        addProduct(input:addProductInput):Product!
        addReview(input:addReviewInput):Review!
        deleteCategory(id:ID!):Boolean!
        deleteProduct(id:ID!):Boolean!

    }
    type Category{
        id:ID!
        name:String
        products(filter: ProductsFilter):[Product!]!
    }
    type Review{
        id:ID!
        date:String!
        title:String!
        comment:String!
        rating:Int!
    }
    input ProductsFilter{
        onSale:Boolean
        avgRating:Int
    }
    input addCategoryInput{
        name:String!
    }
    input addProductInput{
        name:String!
        description:String!
        image:String!
        quantity:Int!
        price:Float!
        onSale:Boolean!
        categoryId:String!
    }
    input addReviewInput{
        date:String!
        title:String!
        comment:String!
        rating:Int!
        productId:ID!
    }

`