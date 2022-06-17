function Category(){
    BaseAPI.call(this);
    this.getAll=function(){
        return this.get(`category`).then(data=>data.json());
    }
    this.addCategory=function(categoryData){
        return this.post(`category`,categoryData);
       }
    this.deleteCategory=function(id){
        return this.delete(`category/${id}`);
    }
    this.updateCategory=(id,categoryData)=>{
        return this.update(`category`,id,categoryData);
    }
}