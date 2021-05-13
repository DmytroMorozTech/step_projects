$('.grid').masonry({
    // options
    itemSelector: '.grid-item',
    columnWidth: '.grid-item',
    gutter: 21,
});

/* Переключение вкладок (TABS) в секции "Our Services"*/
/*--------------------------------------------------------------------*/
let tabs = document.getElementById("tabs-switching");
tabs.addEventListener("click", chooseTab );

function chooseTab (evt) {
    let allTabs = evt.currentTarget.children;
    let allTabsAsArray = Array.from(allTabs);

    let contentTabs = document.getElementById("content-tabs").children;
    let contentTabsAsArray = Array.from(contentTabs);

    let numbOfActiveTab = 0;

    for (let key of allTabsAsArray) {
        key.classList.remove("active");
        if (key===evt.target) {
            evt.target.classList.add("active");
            numbOfActiveTab = allTabsAsArray.indexOf(key);
        }
    }

    for (let item of contentTabsAsArray) {
        item.classList.add("hidden");
        if (contentTabsAsArray.indexOf(item)===numbOfActiveTab) {
            item.classList.remove('hidden');
        }
    }
}
/*--------------------------------------------------------------------*/

/* Фильтр продукции в секции "Our Amazing Work"*/
let $tabsForFiltering = $('#tabs-filter');
$tabsForFiltering.click(filterTabs);
let numberOfActiveImgs = 12;
let activeCategory='all';
let loadBtnClicked = 0;
let amazingPicsArray = Array.from(document.getElementById("amazing-pics-block").children);

function filterTabs (evt) {
    let allTabsAsArray = Array.from(evt.currentTarget.children);
    let numbOfActiveTab = 0;
    let previousActiveCategory ='all';

    for (let key of allTabsAsArray) {
        key.classList.remove("active");
        if (key===evt.target) {
            evt.target.classList.add("active");
            numbOfActiveTab = allTabsAsArray.indexOf(key);
            activeCategory = key.getAttribute("data-category");

            if (activeCategory!==previousActiveCategory) {
                    $amazingPicsContainer.css('height', 630);
                    numberOfActiveImgs = 12;
                    loadBtnClicked = 0;
            }
            previousActiveCategory = activeCategory;
            if (activeCategory!=="all") {$loadMoreBtnAmaz.fadeOut(1500)}
            if (activeCategory==="all") {$loadMoreBtnAmaz.fadeIn(1500)}
            // Если вдруг мы переходим со вкладки "All" на другую вкладку, то кнопка "Load more" исчезает,
            // так как в каждой из других вкладок находится не более 12 изображений и по сути нечего подгружать.
            // Если снова возвращается на вкладку "All", то кнопка "Load more" снова появляется.
        }
    }
    showMoreImages();
}

function showMoreImages() {
    let filteredImgArray = amazingPicsArray.filter((item)=>{
        let currentCategory = item.firstElementChild.firstElementChild.getAttribute('data-category');
        return currentCategory === activeCategory;
    });
    if (activeCategory==="all") {filteredImgArray=[...amazingPicsArray]}

    for (let item of amazingPicsArray) {
        item.classList.add("hidden");
    }

    filteredImgArray.forEach((cardWrapper) => {
        cardWrapper.classList.remove('hidden');
        cardWrapper.style.opacity="0";
    });

    for (let item of filteredImgArray) {
        let itemIndex = filteredImgArray.indexOf(item);
            itemIndex<numberOfActiveImgs ? showAtRandomTime(item) : item.classList.add('hidden');
    }
}

function showAtRandomTime(item) {
    setTimeout(()=>{item.style.opacity="1"}, randomTime());
    setTimeout(()=>{item.style.opacity=""}, 3000);
}

function randomTime() {
    let min = 1;
    let max = 3;
    let randomSec = Math.floor(Math.random() * (max - min + 1) + min); //Генерируем рандомное число в диапазоне от 3 до 6.
    return randomSec*1000;
}

/*--------------------------------------------------------------------*/
const $loadMoreBtnAmaz = $('#amazing-load-more');
$loadMoreBtnAmaz.click(loadMoreImgAmazing);

const $animationElement = $('#animationElem1');

function loadMoreImgAmazing() {
    loadBtnClicked++;
    $animationElement.fadeToggle(1500);
    // Начинаем показывать анимацию (имитация загрузки изображений с сервера).

    $loadMoreBtnAmaz.off();
    // после нажатия на кнопку "Load More" мы выключаем обработчик событий, который на нее "повешен".
    setTimeout(()=> {$loadMoreBtnAmaz.click(loadMoreImgAmazing)}, 3000);
    // кнопка снова начнет работать через 3 секунды. Это сделано для избежание багов при многократном нажатии на кнопку.

    setTimeout(()=>{$animationElement.fadeToggle(1000)},2000);
    // К моменту, когда скрипт начнет добавлять новую порцию изображений на сервер, анимация прекратится.

    if (loadBtnClicked===2) {
        $loadMoreBtnAmaz.fadeOut(3000);
    }
    setTimeout(addMoreImg,3000);
    // спустя 3сек. после нажатия на кнопку "Load more" запускаем ф-цию addMoreImg, которая добавит на стр. + 12 изображений.
}

let $amazingPicsContainer = $('#amazing-pics-block');
function addMoreImg() {
    let currentHeight = parseInt($amazingPicsContainer.css("height"));
    $amazingPicsContainer.css('height', currentHeight+630);
    numberOfActiveImgs+=12;
    showMoreImages();
    // при каждом нажатии на кнопку "Load" высота контейнера amazingPicsContainer будет увеличиваться на 630px.
    // этого достаточно, чтобы дополнительно разместить в нем не более 12 картинок.
}

/*--------------------------------------------------------------------*/
/*Слайдер в секции "What People Say About theHam" */
const $quotationBlocks = $('.quotation-block');
const $sliderItems = $('.slider-item');

// Кнопки
const $previousBtn = $('#previousBtn');
const $nextBtn = $('#nextBtn');

let $activeSlideIndex;
let $nextSlideIndex;

$nextBtn.click(nextClickHandler);
function nextClickHandler() {
    $activeSlideIndex = +$('.slider-item.activated').attr("data-slideNumber");
    // узнаем порядковый номер (индекс) активного слайда с использованием дата-атрибута "data-slideNumber".
    turnOffHandlers();
    showNextSlide($activeSlideIndex,true);
}

$previousBtn.click(previousClickHandler);
function previousClickHandler() {
    $activeSlideIndex = +$('.slider-item.activated').attr("data-slideNumber");
    turnOffHandlers();
    showNextSlide($activeSlideIndex,false);
}

function showNextSlide($activeSlideIndex, forwards) {
    // в зависимости от того, какая кнопка была нажата(влево/вправо), будет назначен след. номер слайда.
    if (forwards) {
        $activeSlideIndex === 4 ? $nextSlideIndex = 1 : $nextSlideIndex = $activeSlideIndex + 1;
    }
    if (!forwards) {
        $activeSlideIndex === 1 ? $nextSlideIndex = 4 : $nextSlideIndex = $activeSlideIndex - 1;
    }
    let $activeQuotationBlock= $quotationBlocks.filter(`[data-slideNumber="${$activeSlideIndex}"]`);
    let $nextQuotationBlock = $quotationBlocks.filter(`[data-slideNumber="${$nextSlideIndex}"]`);

    // Анимация смены основного блока в слайдере (с цитатой и большим круглым фото).
    $activeQuotationBlock.fadeOut(1000);
    setTimeout(()=>{$activeQuotationBlock.addClass("hidden")},1000);
    setTimeout(()=>{
        $nextQuotationBlock.fadeIn(1000);
        $nextQuotationBlock.removeClass("hidden");
    },1000);

    // Анимация нижней части слайдера (маленький круглые иконки с фото).
    let $activeSliderItem= $sliderItems.filter(`[data-slideNumber="${$activeSlideIndex}"]`);
    let $nextSliderItem = $sliderItems.filter(`[data-slideNumber="${$nextSlideIndex}"]`);
    $activeSliderItem.removeClass("activated");
    $nextSliderItem.addClass("activated");
}

$sliderItems.click(directClickHandler);
function directClickHandler(evt) {
    let $activeSlideIndex = +$('.slider-item.activated').attr("data-slideNumber");
    let $nextSlideIndex = +$(evt.currentTarget).attr("data-slideNumber");
    if ($activeSlideIndex===$nextSlideIndex) {return false}
    // Если пользователь несколько раз подряд кликнет на одну и ту же вкладку, то удастся избежать багов.
    // Или если он просто кликнет на уже выбранную вкладку, то мы избежим нежелательной повторной анимации.
    turnOffHandlers();

    let $currentQuotationBlock= $quotationBlocks.filter(`[data-slideNumber="${$activeSlideIndex}"]`);
    let $nextQuotationBlock = $quotationBlocks.filter(`[data-slideNumber="${$nextSlideIndex}"]`);

    // Анимация смены основного блока в слайдере (с цитатой и большим круглым фото).
    $currentQuotationBlock.fadeOut(1000);
    setTimeout(()=>{$currentQuotationBlock.addClass("hidden")},1000);
    setTimeout(()=>{
        $nextQuotationBlock.fadeIn(1000);
        $nextQuotationBlock.removeClass("hidden");
    },1000);

    // Анимация нижней части слайдера (маленький круглые иконки с фото).
    let $activeSliderItem= $sliderItems.filter(`[data-slideNumber="${$activeSlideIndex}"]`);
    let $nextSliderItem = $sliderItems.filter(`[data-slideNumber="${$nextSlideIndex}"]`);
    $activeSliderItem.removeClass("activated");
    $nextSliderItem.addClass("activated");
}

// Эта функция позволяет при переключении слайдов избежать багов, путем выключения всех обработчиков событий в слайдере на 2сек.
// Через 2 сек. после отключения все обработчики будут перезапущены с помощью метода setTimeout.
function turnOffHandlers() {
    $sliderItems.off();
    setTimeout(()=>{$sliderItems.click(directClickHandler)}, 2000);
    $previousBtn.off();
    setTimeout(()=>{$previousBtn.click(previousClickHandler)}, 2000);
    $nextBtn.off();
    setTimeout(()=>{$nextBtn.click(nextClickHandler)}, 2000);
}

/*--------------------------------------------------------------------*/
/* Прописываем логику работы скрипта после нажатия на кнопку "Load More" в секции "Gallery of best images".*/
const $loadMoreBtnBestImg = $('#best-img-load-more');
$loadMoreBtnBestImg.click(loadMoreBestImg);

function loadMoreBestImg() {
    const $animationElement2 = $('#animationElem2');
    $animationElement2.fadeToggle(1500);
    setTimeout(()=>{$animationElement2.fadeToggle(1000)},2000);
    $loadMoreBtnBestImg.off();
    $loadMoreBtnBestImg.fadeOut(3000);

    let $loaderAnimContainer = $('#loader-animation-container');
    setTimeout(()=>{
        $loaderAnimContainer.css("height","0");
        $loaderAnimContainer.removeClass("loaderAnimation");
    },3000);

    setTimeout(addMoreBestImg,3000);
    // спустя 3сек. после нажатия на кнопку "Load more" запускаем ф-цию addMoreBestImg, которая добавит порцию новых изображений.
}

let $bestImgsContainer = $('.grid');

function addMoreBestImg() {
    let currentHeight = parseInt($bestImgsContainer.css("height"));
    $bestImgsContainer.css('maxHeight', currentHeight+960);

    let $hiddenBestImgs = $('.grid-item.opacity-zero');
    $hiddenBestImgs.each(function() {
        let $currentElem = $(this);
        $currentElem.removeClass('opacity-zero')
                    .css("opacity","");
        setTimeout(()=>{$currentElem.fadeIn(500)},randomTime());
        $('.best-images-container').css('padding-bottom','20px');
    })
}






