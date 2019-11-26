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

  var dbMessages = firebase.firestore().collection('messages');

window.onload = function(){ 
    
    var btnMore = document.getElementById("btn_more");
    btnMore.addEventListener("click", showText);

    var textOne = document.getElementById("text_secOne");
    textOne.style.visibility = "hidden";
    
    var form = document.getElementById('contact_form');
    form.addEventListener('submit', submitForm);

    var loginBox = document.getElementById('loginBox');

    var logoutBox = document.getElementById('logoutBox');

    var popLogin = document.getElementById('popLogin');
    popLogin.innerHTML = '<i class="fa fa-sign-in" id="iconIn"></i>  Log In';
    popLogin.addEventListener("click", pop);

    var closeBtn = document.getElementById('closeBtn');
    closeBtn.addEventListener("click", close);

    var closeBtnOut = document.getElementById('closeBtnOut');
    closeBtnOut.addEventListener("click", closeOut);

    var btnLogin = document.getElementById('btnLogin');
    btnLogin.addEventListener("click", login);

    var nameLogin = document.getElementById('nameLogin');

    var emailLogin = document.getElementById('emailLogin');

    var createProject = document.getElementById('createProject');
    createProject.style.visibility = "hidden";
    
    var popLogout = document.getElementById('popLogout');
    popLogout.addEventListener("click", logout);

    var createProject = document.getElementById('createProject');
    createProject.innerHTML = '';

    //var messageSentBox = document.getElementById('messageSentBox');

    //user authentication
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            createProject.style.visibility = "visible";
            popLogout.innerHTML = '<i class="fa fa-sign-out" id="iconOut"></i>   Log Out';
            popLogin.innerHTML = '';
            createProject.innerHTML = '<a href="create.html" target="_blank">Create project</a>';

        } else {
        // No user is signed in.
        }
    });

    //open login box
    function pop() {
        loginBox.style.display = 'block';
    }

    //close login box
    function close() {
        loginBox.style.display = 'none';
    }

    //close logout box
    function closeOut() {
        logoutBox.style.display = 'none';
        location.reload();
    }

    function logout() {
        firebase.auth().signOut();
        logoutBox.style.display = 'block';
    }

    function showText() {
        btnMore.style.visibility = "hidden";
        textOne.style.visibility = "visible";
    };

    //log in
    function login(e) {
        e.preventDefault();
        
        var email = nameLogin.value;
        var password = emailLogin.value;

        firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...

            alert('error');
          });

          loginBox.style.display = 'none';
    };

    //submit contact form
    function submitForm(e) {
        e.preventDefault();

        var name = document.getElementById('name').value;
        var email = document.getElementById('email').value;
        var message = document.getElementById('textMessage').value;

        if (name === '' ||
            email === '' ||
            message === '') {
            alert('Fields empty');
        } else {
            saveMessage(name, email, message);
            alert('Message sent!');
            //messageSentBox.style.display = 'block';
            //clean form input values
            form.reset();
        }
    };

    //save message to firebase
    function saveMessage(name, email, message) {
        dbMessages.doc().set({
            name: name,
            email: email,
            message: message
        });

        console.log('message sent');
    };
};