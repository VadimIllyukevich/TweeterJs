
class  FetchData {
    getResource = async url => {
        const res = await fetch(url)

        if (!res.ok){
            throw new Error('Произошла ошибка: ' + res.status)
        }

        return res.json()
    }

    getPost = () => this.getResource('db/dataBase.json')
}


class Twitter{
    constructor({listElements}) {
        const fetchData = new FetchData()
        this.posts = new Posts();
        this.elements = {
            listElements: document.querySelector(listElements)
        }

        fetchData.getPost()
            .then(data =>{
                data.forEach(this.posts.addPost(data))
        })
        console.log('this.posts: ', this.posts)
    }

    renderPosts(){

    }

    showUserPost(){

    }

    showLikedPost(){

    }

    showAllPost(){

    }

    openModal(){

    }


}

class Posts{
    constructor({ posts = [] } = {}) {
        this.posts = posts
    }

    addPost(tweet){
        const post = new Post(tweet)
        this.posts.push(post)
    }

    deletePost(id){
        console.log(this.posts[Post.id])

    }


    likePost(id){

    }
}


class Post{
    constructor(param) {
        const { id, userName, nickName, postDate, text, img, likes = 0 } = param
        this.id = id || this.generateId()
        this.userName = userName
        this.nickName = nickName
        this.postDate = postDate ? new Date(postDate) : new Date()
        this.text = text
        this.img = img
        this.likes = likes
        this.liked = false
    }

    changeLike(){
        this.liked = !this.liked
        if (this.liked){
            this.likes++
        } else {
            this.likes--
        }
    }

    generateId() {
        return Math.random().toString(32).substring(2, 9) + (+new Date).toString(32)
    }

    getDate() {

        const options = {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        }

        return this.postDate.toLocaleString('ru-RU', options)
    }
}



const twitter = new Twitter({
    listElements: '.tweet-list'
    })

// twitter.posts.addPost({
//
//     userName : 'Натали',
//     nickName : 'Nataly',
//     postDate : '01.19.2021',
//     text : 'супер идея',
//     img : '',
//     likes : '50',
//     liked : 'true',
//
// })

// twitter.posts.addPost({
//     id : '1',
//     userName : 'Натали',
//     nickName : 'Nataly',
//     postDate : '01.19.2021',
//     text : 'супер идея',
//     img : '',
//     likes : '50',
//     liked : 'true',
//
// })

