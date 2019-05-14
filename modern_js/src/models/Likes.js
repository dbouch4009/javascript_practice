export default class Likes{
    constructor(){
        this.likes = [];
    }

    addLike(id, title, author, img){
        const like = {id,title,author,img};
        this.likes.push(like);
        
        // persist data in local storage
        this.persistData();
        return like;
    }

    deleteLike(id){
        //console.log(id);
        const index = this.likes.findIndex(el => el.id ===id);
        //console.log(index);
        this.likes.splice(index,1);

        // persist data in local storage
        this.persistData();
    }

    isLiked(id){
        //console.log(this.likes);

        return this.likes.findIndex(el => el.id == id) !== -1;  //-1 returns when element not found
    }

    getNumLikes(){
        return this.likes.length;
    }

    persistData() {
        //local storage only likes strings
        localStorage.setItem('likes',JSON.stringify(this.likes));  
    }

    readStorage(){
        const storage = JSON.parse(localStorage.getItem('likes'));
        if(storage){
            this.likes = storage;   //restoring likes from storage
        }
    }
}