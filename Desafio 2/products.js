const ProductContainer = require('./contenedor');
const testObjetct = {name:"Notebook", price: 1500, group:"Computers"}

const run = async function (){
    const products = new ProductContainer("products.json");
    await products.init();
    let newItemID = await products.save(testObjetct);
    console.log(`Nuevo producto guardado. \n ID: ${newItemID}`);
    console.log(await products.getAll());
    console.log(await products.getByID(5));
    console.log(await products.deleteByID(5));

}

run();