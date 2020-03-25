const NAVIGATION = document.getElementById('navigation');
const NAV_BAR = document.getElementById('nav__bar');
const SECTIONS = document.querySelectorAll('body>section');

const ITEMS_LIST = document.querySelectorAll('.slider__inner .slider__phone');
const SLIDER = document.getElementById('home');
const LEFT_ARROW = document.querySelector('.arrow-control.left');
const RIGHT_ARROW = document.querySelector('.arrow-control.right');

const PHONE_VERT = document.getElementById('phone-vert');
const BLACK_SCREEN_VERT = document.getElementById('black-screen-vert');
const PHONE_HOR = document.getElementById('phone-hor');
const BLACK_SCREEN_HOR = document.getElementById('black-screen-hor');

const TAGS = document.getElementById('tags__list');
const IMG = document.getElementById('portfolio__art');

const GET_FORM = document.getElementById('get__form');
const SUBMIT = document.getElementById('submit');
const CLOSE = document.getElementById('close');

let current = 0;
let isEnabled = true;

//header
NAVIGATION.addEventListener('click', (event) =>{
    NAVIGATION.querySelectorAll('a').forEach(el => el.classList.remove('nav__list-item_active'));
    event.target.classList.add('nav__list-item_active');
});
NAV_BAR.addEventListener('click', (event) =>{
    NAV_BAR.querySelectorAll('a').forEach(el => el.classList.remove('nav__bar-item_active'));
    event.target.classList.add('nav__bar-item_active');
});


document.addEventListener('scroll', function (event){
    const currentPos = window.scrollY;

    SECTIONS.forEach(el => {
        if(el.offsetTop-86 <= currentPos){
            NAVIGATION.querySelectorAll('a').forEach(a => {
                a.classList.remove('nav__list-item_active');
                if(el.getAttribute('id') === a.getAttribute('href').substring(1)){
                    a.classList.add('nav__list-item_active');
                }
            });
        }
    })
});

// slider
function changeCurrent(count) {
	current = (count + ITEMS_LIST.length) % ITEMS_LIST.length;
}

function hide_slide(direction) {
	isEnabled = false;
	ITEMS_LIST[current].classList.add(direction);
	ITEMS_LIST[current].addEventListener('animationend', function() {
		this.classList.remove('active', direction);
	});
}

function show_slide(direction) {
	ITEMS_LIST[current].classList.add('next', direction);
	ITEMS_LIST[current].addEventListener('animationend', function() {
		this.classList.remove('next', direction);
		this.classList.add('active');
		isEnabled = true;
	});
}

function next_slide(count) {
	hide_slide('to-left');
	changeCurrent(count + 1);
	show_slide('from-right');
}

function previous_slide(count) {
	hide_slide('to-right');
	changeCurrent(count - 1);
	show_slide('from-left');
}

LEFT_ARROW.addEventListener('click', function() {
	if (isEnabled) {
		previous_slide(current);
    }
    if(!SLIDER.classList.contains('blue-slide')) SLIDER.classList.add('blue-slide');
    else SLIDER.classList.remove('blue-slide');
});

RIGHT_ARROW.addEventListener('click', function() {
	if (isEnabled) {
		next_slide(current);
    }
    if(!SLIDER.classList.contains('blue-slide')) SLIDER.classList.add('blue-slide');
    else SLIDER.classList.remove('blue-slide');
});

// slider black screen
PHONE_VERT.addEventListener('click', () =>{

    if(BLACK_SCREEN_VERT.classList.contains('hidden')) {
        BLACK_SCREEN_VERT.classList.remove('hidden');
    }
    else BLACK_SCREEN_VERT.classList.add('hidden');
});
BLACK_SCREEN_VERT.addEventListener('click', () =>{
    BLACK_SCREEN_VERT.classList.add('hidden');
});

PHONE_HOR.addEventListener('click', () =>{
    if(BLACK_SCREEN_HOR.classList.contains('hidden')) {
        BLACK_SCREEN_HOR.classList.remove('hidden');
    }
    else BLACK_SCREEN_HOR.classList.add('hidden');
});
BLACK_SCREEN_HOR.addEventListener('click', () =>{
    BLACK_SCREEN_HOR.classList.add('hidden');
});

// portfolio tags
TAGS.addEventListener('click', (event) => {
    TAGS.querySelectorAll('li').forEach(elem => elem.classList.remove('tags__item_active'));
    event.target.classList.add('tags__item_active');
    let imgList = IMG.getElementsByTagName('img');
    let temptSrc;
    for(let i = 0; i< imgList.length-1; i++){
        temptSrc = imgList[i].src;
        imgList[i].src = imgList[i+1].src;
        imgList[i+1].src = temptSrc;
    }
});

// portfolio img
IMG.addEventListener('click', (event) => {
    IMG.querySelectorAll('img').forEach(item => item.classList.remove('border'));
    event.target.classList.add("border");
});

// form
SUBMIT.addEventListener('click', () =>{
    const get_subject = document.getElementById('get-subject').value.toString();
    const get_description = document.getElementById('description-area').value.toString();

    if(get_subject) document.getElementById('subject').innerText = 'Тема: ' + get_subject;
    else document.getElementById('subject').innerText = 'Без темы';

    if(get_description) document.getElementById('description_mes').innerText = 'Описание: ' + get_description;
    else document.getElementById('description_mes').innerText = 'Без описания';
        
});

GET_FORM.addEventListener('submit', (event) => {
    event.preventDefault();
    document.getElementById('message-block').classList.remove('hidden');
});

CLOSE.addEventListener('click', () =>{
    document.getElementById('subject').innerText = '';
    document.getElementById('description_mes').innerText = '';

    document.getElementsByTagName('form')[0].reset();
    
    document.getElementById('message-block').classList.add('hidden');
});


