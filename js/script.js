$(document).ready(function() {
    var header_link_list = $(".header-nav__item");
    var header_link_active = $(".header-nav__link_active");
    var header_nav_line = $(".header-nav__line");
    header_nav_line.css("width", header_link_active.innerWidth());

    $(".header-nav__item").hover(function() {
        var id = $(this).index();
        var width = calc_width(0, id, header_link_list);
        
        header_nav_line.css("width", width);
    }, function() {
        header_nav_line.css("width", header_link_active.innerWidth());
    });

    $(".header-nav__item").click( function() {
        header_link_active.removeClass("header-nav__link_active");
        $(this).children().addClass("header-nav__link_active");
        header_link_active = $(".header-nav__link_active");
        var id = $(this).index();

        header_nav_line.css("transform", "translateX(" + header_link_active.outerWidth(true) + "px)");

        page_num.text(id + 1);
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

function calc_width(id_from, id_where, object) {
    for(i = 0; i <= id_where; i++) {
        innerWidth = object.eq(i).innerWidth();
        outerWidth = 0;

        for(j = i; j > 0; j--) {
            outerWidth += object.eq(j - 1).outerWidth(true);
        }
        width = innerWidth + outerWidth;
    }

    return width;
}