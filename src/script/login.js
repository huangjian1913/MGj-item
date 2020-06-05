const btns = document.querySelectorAll('.login_wrap .tabsbox .tabs');
const items = document.querySelectorAll('.login_wrap .logintab .items');
const social = document.querySelector('.login_wrap .social');
btns[0].onclick = function() {
    items[0].style.display = "flex";
    items[1].style.display = "none";
    social.style.top = 410 + 'px';
    for (let i = 0; i < btns.length; i++) {
        btns[i].className = "tabs";
    }
    this.className += " active";
}
btns[1].onclick = function() {
    items[0].style.display = "none";
    items[1].style.display = "block";
    social.style.top = 370 + 'px';
    for (let i = 0; i < btns.length; i++) {
        btns[i].className = "tabs";
    }
    this.className += " active";
}