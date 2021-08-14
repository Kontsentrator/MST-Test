var slider_img_list = $(".slider__img");
var aside_links_list = $(".aside-nav__link");

var slider_img_active = $(".slider__img_active");
var aside_link_active = $(".aside-nav__link_active");

$(document).ready(function() {
    $(".aside-nav__list").on('click', ".aside-nav__item", function() {
        aside_link_active.removeClass("aside-nav__link_active");
        $(this).children().addClass("aside-nav__link_active");
        aside_link_active = $(".aside-nav__link_active");
        var id = $(this).index();

        slider_img_active.removeClass("slider__img_active");
        slider_img_list.eq(id).addClass("slider__img_active");
        slider_img_active = $(".slider__img_active");
    });
});