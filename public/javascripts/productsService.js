function Products(){
    BaseAPI.call(this);
    this.getAll=function(){
        return this.get(`products`).then(data=>data.json());
    }
    this.addProduct=function(productData){
        return this.post(`products`,productData);
       }
    this.deleteProduct=function(id){
        return this.delete(`products/${id}`);
    }
    this.updateProduct=(id,categoryData)=>{
        return this.update(`products`,id,categoryData);
    }
}