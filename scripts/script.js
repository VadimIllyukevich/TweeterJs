
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
                data.forEach(this.posts.addPost)
                this.showAllPost()
        })
    }

    renderPosts(posts){
        this.elements.listElements.textContent = ''

        posts.forEach(({ id, userName, nickName, postDate, text, img, likes, getDate }) =>{
            this.elements.listElements.insertAdjacentHTML('beforeend', `
            <li>
                <article class="tweet">
                    <div class="row">
                        <img class="avatar" src="images/${nickName}.jpg" alt="Аватар пользователя ${nickName}">
                        <div class="tweet__wrapper">
                            <header class="tweet__header">
                            <h3 class="tweet-author">${userName}
                                <span class="tweet-author__add tweet-author__nickname">@${nickName}</span>
                                <time class="tweet-author__add tweet__date">${getDate()}</time>
                            </h3>
                            <button class="tweet__delete-button chest-icon" data-id="${id}"></button>
                        </header>
                        <div class="tweet-post">
                            <p class="tweet-post__text">${text}</p>
                            ${
                                img ?
                                    `<figure class="tweet-post__image">
                                        <img src="${img}" alt="иллюстрация из поста ${nickName}">
                                    </figure>`:
                                    ``
                            }
                        </div>
                    </div>
                </div>
                <footer>
                    <button class="tweet__like">
                        ${likes}
                    </button>
                </footer>
            </article>
        </li>`)
        })

    }

    showUserPost(){

    }

    showLikedPost(){

    }

    showAllPost(){
        this.renderPosts(this.posts.posts)
    }

    openModal(){

    }


}

class Posts{
    constructor({ posts = [] } = {}) {
        this.posts = posts
    }

    addPost = (tweet) => {
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

    getDate = () => {

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