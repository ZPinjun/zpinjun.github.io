(function () {
    document.documentElement.classList.add("has-js");
    const toggle = document.querySelector(".nav-toggle");
    const navigation = document.querySelector(".site-navigation");
    if (toggle && navigation) {
        const closeNavigation = function () {
            navigation.classList.remove("is-open");
            toggle.setAttribute("aria-expanded", "false");
            toggle.setAttribute("aria-label", "Open navigation");
        };
        toggle.addEventListener("click", function () {
            const open = navigation.classList.toggle("is-open");
            toggle.setAttribute("aria-expanded", String(open));
            toggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
        });
        navigation.querySelectorAll("a").forEach(function (link) {
            link.addEventListener("click", closeNavigation);
        });
        document.addEventListener("keydown", function (event) {
            if (event.key === "Escape" && navigation.classList.contains("is-open")) {
                closeNavigation();
                toggle.focus();
            }
        });
    }


})();

document.addEventListener("DOMContentLoaded", function () {
    if (typeof window.renderMathInElement === "function") {
        window.renderMathInElement(document.body, {
            delimiters: [
                { left: "$$", right: "$$", display: true },
                { left: "$", right: "$", display: false }
            ],
            throwOnError: false
        });
    }

        // Keep the original template's optional showcase and carousel behavior.
    if (!window.jQuery) return;
    const $ = window.jQuery;
    if ($.fn.Lazy) {
        const options = {
            scrollDirection: "vertical", effect: "fadeIn", effectTime: 300, placeholder: "",
            afterLoad: function (element) {
                if (element.is("img")) element.css("background-image", "none");
                else element.css({ "background-size": "cover", "background-position": "center" });
            }
        };
        $("img.lazy, div.lazy:not(.always-load)").Lazy({ visibleOnly: true, ...options });
        $("div.lazy.always-load").Lazy({ visibleOnly: false, ...options });
    }
    if ($.fn.tooltip) $("[data-toggle='tooltip']").tooltip();
    if ($.fn.masonry && $(".grid").length) {
        const grid = $(".grid").masonry({ percentPosition: true, itemSelector: ".grid-item", columnWidth: ".grid-sizer" });
        if ($.fn.imagesLoaded) grid.imagesLoaded().progress(function () { grid.masonry("layout"); });
        $(".lazy").on("load", function () { grid.masonry("layout"); });
    }

});

