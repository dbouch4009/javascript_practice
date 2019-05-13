export default class Likes{
    constructor(){
        this.likes = [];
    }

    addLike(id, title, author, img){
        const like = {id,title,author,img};
        this.likes.push(like);

        return like;
    }

    deleteLike(id){
        //console.log(id);
        const index = this.likes.findIndex(el => el.id ===id);
        //console.log(index);
        this.likes.splice(index,1);
    }

    isLiked(id){
        //console.log(this.likes);

        return this.likes.findIndex(el => el.id == id) !== -1;  //-1 returns when element not found
    }

    getNumLikes(){
        return this.likes.length;
    }
}