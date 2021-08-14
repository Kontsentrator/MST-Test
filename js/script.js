$(document).ready(function() {
    var header_link_list = $(".header-nav__item");
    var header_link_active = $(".header-nav__link_active");
    var header_nav_line = $(".header-nav__line");
    header_nav_line.css("width", header_link_active.innerWidth());

    $(".header-nav__item").hover(function() {
        var id_from = header_link_list.find(".header-nav__link_active").parent().index();
        var id_where = $(this).index();
        var translateX = 0;

        if(id_from > id_where) {
            translateX = calcTranslateX(id_from, id_where, header_link_list);
            [id_from, id_where] = [id_where, id_from];
        }

        var width = calcWidth(id_from, id_where, header_link_list);
        
        header_nav_line.css("transform", "translateX(" + translateX + "px)");
        header_nav_line.css("width", width);
    }, function() {
        header_nav_line.css("width", header_link_active.innerWidth());

        id_from = $(this).index();
        id_where = header_link_list.find(".header-nav__link_active").parent().index();
        translateX = calcTranslateX(id_from, id_where, header_link_list);
        header_nav_line.css("transform", "translateX(" + translateX + "px)");
    });

    $(".header-nav__item").click( function() {
        var id_from = header_link_list.find(".header-nav__link_active").parent().index();
        header_link_active.removeClass("header-nav__link_active");
        $(this).children().addClass("header-nav__link_active");
        header_link_active = $(".header-nav__link_active");
        var id_where = $(this).index();

        translateX = calcTranslateX(id_from, id_where, header_link_list);
        header_nav_line.css("width", header_link_active.innerWidth());
        header_nav_line.css("transform", "translateX(" + translateX + "px)");
    });

    var slider_img_list = $(".slider__img"); // Массив картинок для разделов (Архитектура, Безопасность, ...)
    var aside_link_list = $(".aside-nav__link"); // Массив ссылкок на разделы
    var content_item_list = $(".content__item"); // Массив элементов, содержащих описание разделов
    
    var slider_img_active = $(".slider__img_active"); // Активная картинка раздела
    var aside_link_active = $(".aside-nav__link_active"); // Активная ссылка раздела
    var content_item_active = $(".content__item_active"); // Активное описание раздела
    
    var page_num = $(".content-navigation__active"); // Номер текущего раздела
    page_num.text("1");

    var all_pages = $(".content-navigation__all"); // Всего разделов
    all_pages.text(aside_link_list.length);

    $(".aside-nav__list").on('click', ".aside-nav__item", function() {
        aside_link_active.removeClass("aside-nav__link_active");
        $(this).children().addClass("aside-nav__link_active");
        aside_link_active = $(".aside-nav__link_active");
        var id = $(this).index();

        content_item_active.removeClass("content__item_active");
        content_item_list.eq(id).addClass("content__item_active");
        content_item_active = $(".content__item_active");

        slider_img_active.removeClass("slider__img_active");
        slider_img_list.eq(id).addClass("slider__img_active");
        slider_img_active = $(".slider__img_active");

        page_num.text(id + 1);
    });
});

function calcTranslateX(id_from, id_where, object) {
    translateX = calcWidth(id_from, id_where, object, true)
    return translateX;
}

function calcWidth(id_from, id_where, object, only_outer = false) {

    // Считаем внутреннюю длину элемента, к которому стремится линия
    var inner_width = 0;
    if(!only_outer) {
        inner_width = object.eq(id_where).innerWidth();
    }

    // Считаем внешнюю длину элементов на пути линии (margin и т.д.)
    var outer_width = 0;
    for(i = id_where - 1; i >= id_from; i--) {
        outer_width += object.eq(i).outerWidth(true);
    }

    // Складываем внешние длины элементов с внутренней длиной элемента
    width = outer_width + inner_width;
    return width;
}