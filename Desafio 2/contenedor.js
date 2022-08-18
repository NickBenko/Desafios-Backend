const fs = require('fs');

class ProductContainer {
    constructor(filename) {
        console.log("Iniciando Contenedor");
        this.countID = 0;
        this.file = filename;
        this.productList = [];
    }

    async getAll() {
        try {

            if (this.productList !== []) {
                return this.productList;
            } else {
                throw 'Cannot get Product List'
            }

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
            let fileRead = await fs.promises.readFile(this.file);            
            this.productList = JSON.parse(fileRead);       

            for (const element of this.productList) {
                if (element.id > this.countID) this.countID = element.id;
            }
            //console.log(`Archivo Leido :${this.file}, \n Data: ${JSON.stringify(this.productList)}`);
        } catch (error) {
            console.error("There is no file yet");
            //console.log(`Error: ${error}`)
        }


    }
}
module.exports = ProductContainer;