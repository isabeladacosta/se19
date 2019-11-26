// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBSF4CH_vdyRrXycp6BtO4TuHutC46Ghiw",
    authDomain: "se19-blog.firebaseapp.com",
    databaseURL: "https://se19-blog.firebaseio.com",
    projectId: "se19-blog",
    storageBucket: "se19-blog.appspot.com",
    messagingSenderId: "805688627328",
    appId: "1:805688627328:web:69873c8a88051d8654d665"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

var dbPosts = firebase.firestore().collection('posts');

var postCollection = document.getElementById('posts-collection');

var submitPost = document.getElementById('submitPost');
submitPost.addEventListener("click", newPost);

//create post
function createPost(title, image, content) {
    var div = document.createElement('div');
    div.setAttribute("class", "create_posts");

    let h2 = document.createElement('h2');
    let p = document.createElement('p');
    let img = document.createElement('img');
    img.setAttribute("src", image);

    h2.textContent = title;
    p.textContent = content;

    div.appendChild(h2);
    div.appendChild(p);
    div.appendChild(img);

    postCollection.appendChild(div);
}

//new post
function newPost() {  
    var title = document.getElementById('title').value; 
    var image = document.getElementById('picture').value; 
    var content = document.getElementById('content').value;

    if(
        title === '' ||
        image === '' ||
        content === '' 
    ) {
        alert('Fields empty')
    } else {
        dbPosts.doc().set({
            postName: title,
            postImg: image,
            postContent: content
        })
    }

    location.reload();
}


//get posts
function getPosts() {
    dbPosts.get().then(snapshot => {
        snapshot.docs.forEach(docs => {
            createPost(
                docs.data().postName,
                docs.data().postImg,
                docs.data().postContent,
                );
        });
    }).catch(err => {
        console.log(err);
    });
}

getPosts();
