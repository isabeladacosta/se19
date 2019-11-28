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

var postCollection = document.getElementById('posts-collection');

const db = firebase.firestore();

console.log(db.collection('posts').doc());

var alertMessage = document.getElementById('alertMessage');

var alertCloseButton = document.getElementById('alertCloseButton');
alertCloseButton.addEventListener("click", fail);


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

//get posts
function getPosts() {
    db.collection('posts')
    .get()
    .then(snapshot => {
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

//new post
var submitPost = document.getElementById('submitPost');
submitPost.addEventListener('click', newPost);

function newPost() {      
    var title = document.getElementById('title-post').value; 
    var image = document.getElementById('picture-post').value; 
    var content = document.getElementById('content-post').value;

    console.log(title);
    if(
        title === '' ||
        image === '' ||
        content === '' 
    ) {
        alertMessage.style.display = 'block';
        popupBG.style.display = 'block';
    } else {
        db.collection('posts').doc().set({
            postContent: content,
            postImg: image,
            postName: title  
        })

        setTimeout(function(){ 
            location.reload();
        }, 1000);
        
    }
}

function fail() {
    alertMessage.style.display = 'none';
    popupBG.style.display = 'none';
}
