const fs = require('fs');

class ProductContainer {
    constructor(filename) {        
        this.countID = 0;
        this.file = filename;
        this.productList = [];
    }

    async getAll() {         
        try {           
            let allProducts = JSON.stringify(this.productList);            
             return allProducts
        } catch (error) {
            console.log(`Error: ${error}`);
        }
    }

    async save(product) {
        try {
            this.countID++;
            product["id"] = this.countID;
            this.productList.push(product);
            await this.write();
            return this.countID;
        } catch (error) {
            console.error(`Error: ${error}`);
        }
    }

    async getByID(ID) {
        try {
            let productFind=this.productList.filter(elem => elem.id == ID);
            
            if (productFind.length === 0){                
                return null;
            }else{
                return productFind;
            }
            
        } catch (error) {
            console.error(`Error: ${error}`);
        }
    }

    async deleteByID(ID) {
        try {
            let deletedProduct = this.productList.filter(elem => elem.id == ID);
            this.productList = this.productList.filter(elem => elem.id !== ID);
            this.write();
            return deletedProduct;
        } catch (error) {
            console.error(`Error: ${error}`);
        }
    }

    async deleteAll() {
        let message = "Se eliminaron todos los productos del archivo." 
        this.productList = [];
        this.write();
        return message;
    }

    //FUNCIONES WRITE E INIT

    async write() {
        try {
            let stringProductList = JSON.stringify(this.productList);
            await fs.promises.writeFile(this.file, stringProductList);
        } catch (error) {
            console.error(`Error: ${error}`);
        }

    }

    async init() {
        try {
            let data = await fs.promises.readFile(this.file);                     
            this.productList = JSON.parse(data);                  

            for (const element of this.productList) {
                if (element.id > this.countID) this.countID = element.id;
            }
            
        } catch (error) {
            console.log(error);
            console.error("There is no file yet");            
        }
    }
}
module.exports = ProductContainer;