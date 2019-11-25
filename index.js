window.onload = function(){ 
    console.log('entrei');
    
    var btnMore = document.getElementById("btn_more");
    btnMore.addEventListener("click", showText);

    var textOne = document.getElementById("text_secOne");
    textOne.style.visibility = "hidden";
    

    function showText() {
        console.log('alllo');

        btnMore.style.visibility = "hidden";
        textOne.style.visibility = "visible";
        
    };

};