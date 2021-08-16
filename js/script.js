// Функция для рассчёта перемещения линии по оси X
function calcTranslateX(id, object) {
    // Считаем расстояние от первого элемента до текущего
    translateX = calcWidth(0, id, object, true);
    return translateX;
}

// Функция для рассчёта длины линии
function calcWidth(id_from, id_where, object, only_outer = false) {
    // Считаем внутреннюю длину элемента, к которому стремится линия
    var inner_width = 0;
    if(!only_outer) {
        inner_width = object.eq(id_where).innerWidth();
    }

    // Считаем внешнюю длину элементов на пути линии
    var outer_width = object.eq(id_where).offset().left - object.eq(id_from).offset().left;

    // Складываем внешние длины элементов с внутренней длиной элемента
    width = outer_width + inner_width;
    return width;
}

function cutText(object) {
    line_height = object.css("line-height").replace("px", '');
    array_text = object.text().split(' ');

    while(object.innerHeight()/line_height >= 4) {
        array_text.pop();
        new_text = '';
        for(i = 0; i < array_text.length; i++) {
            new_text += array_text[i] + " ";
        }
        object.text(new_text);
        object.append("<a href='#' class='content__link-detail'>...</a>");         
    }
}

$(document).ready(function() {

    // ---------------- Работа с линией хэдера ----------------

    var header_link_list = $(".header-nav__item"); // Массив ссылок в хэдере
    var header_link_active = $(".header-nav__link_active"); // Активная ссылка в хэдере
    var header_nav_line = $(".header-nav__line"); // Линия
    var header_nav_line_scale = 1.1; // Множитель длины линии

    // Установка начальных параметров линии
    header_nav_line.css("width", header_link_active.innerWidth());
    header_nav_line.css("transform", "scaleX("+ header_nav_line_scale +")");

    $(".header-nav__item").hover(function() {
        var id_from = header_link_list.find(".header-nav__link_active").parent().index(); // Из активного элемента
        var id_where = $(this).index(); // В выбранный

        if(id_from != id_where) {
            var translateX = 0;
            if(id_from > id_where) {
                translateX = calcTranslateX(id_where, header_link_list);
                
                [id_from, id_where] = [id_where, id_from];
            } else {
                translateX = calcTranslateX(id_from, header_link_list);
            }
            header_nav_line.css("transform", "translateX(" + translateX + "px)");
            var width = calcWidth(id_from, id_where, header_link_list);
            header_nav_line.css("width", width);
        }
    }, function() {
        var id = header_link_list.find(".header-nav__link_active").parent().index(); // Активный элемент

        translateX = calcTranslateX(id, header_link_list);
        header_nav_line.css("transform", "translateX(" + translateX + "px) scaleX("+ header_nav_line_scale +")");
        header_nav_line.css("width", header_link_active.innerWidth());
    });

    var pages_list = $(".page");
    var page_active = $(".page_active");
    var page_active_id = pages_list.find(".page_active").index();

    $(".header-nav__item").click( function() {
        header_link_active.removeClass("header-nav__link_active");
        $(this).children().addClass("header-nav__link_active");
        header_link_active = $(".header-nav__link_active");
        var id = $(this).index();

        page_active.removeClass("page_active");
        pages_list.eq(id).addClass("page_active");
        page_active = $(".page_active");

        translateX = calcTranslateX(id, header_link_list);
        header_nav_line.css("width", header_link_active.innerWidth());
        header_nav_line.css("transform", "translateX(" + translateX + "px) scaleX("+ header_nav_line_scale +")");
    });

    // ---------------- Работа контентом страницы ----------------

    var aside_link_list = $(".aside-nav__link"); // Массив ссылкок на разделы (Архитектура, Безопасность, ...)
    var aside_link_active = $(".aside-nav__link_active"); // Активная ссылка раздела
    var aside_link_active_id = aside_link_active.parent().index(); // id активной ссылки
    
    var slider_img_list = $(".slider__img"); // Массив картинок для разделов 
    var slider_img_active = $(".slider__img_active"); // Активная картинка раздела
    
    var content_item_list = $(".content__item"); // Массив элементов, содержащих описание разделов
    var content_item_active = $(".content__item_active"); // Активное описание раздела
    
    var page_num = $(".content-navigation__active"); // Номер текущего раздела
    // Устанавливаем текущий номер раздела
    page_num.text(aside_link_active_id + 1);
    // Ищем кол-во разделов
    var all_pages = $(".content-navigation__all");
    all_pages.text(aside_link_list.length);

    content_text = content_item_active.find(".content__text");
    cutText(content_text);

    $(".aside-nav__list").on('click', ".aside-nav__item", function() {
        // Устанавливаем активную ссылку раздела
        aside_link_active.removeClass("aside-nav__link_active");
        $(this).children().addClass("aside-nav__link_active");
        aside_link_active = $(".aside-nav__link_active");
        var id = $(this).index();

        // Устанавливаем активный контент раздела
        content_item_active.removeClass("content__item_active");
        content_item_list.eq(id).addClass("content__item_active");
        content_item_active = $(".content__item_active");
        content_text = content_item_active.find(".content__text");
        cutText(content_text);

        // Устанавливаем активную картинку раздела
        slider_img_active.removeClass("slider__img_active");
        slider_img_list.eq(id).addClass("slider__img_active");
        slider_img_active = $(".slider__img_active");

        page_num.text(id + 1);
    });
});