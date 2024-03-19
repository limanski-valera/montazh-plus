// Підключення функціоналу "Чертоги Фрілансера"
import { isMobile } from "./functions.js";
// Підключення списку активних модулів
import { flsModules } from "./modules.js";

import IMask from "imask";

function initSuperSpollers() {
    if (document.querySelector(".super-spollers")) {
        document.addEventListener("click", (e) => {
            if (e.target.closest(".spollers__title") && e.target.closest("._spoller-active")) {
                const wrapper = e.target.closest(".super-spollers");
                if (wrapper) {
                    const imagesList = wrapper.querySelectorAll(
                        ".super-spollers__image-wrapper img"
                    );
                    const titlesList = wrapper.querySelectorAll(".spollers__title");
                    let currentIndex = null;
                    titlesList.forEach((title, index) =>
                        title === e.target.closest(".spollers__title")
                            ? (currentIndex = index)
                            : null
                    );

                    if (currentIndex !== null) {
                        imagesList.forEach((img, index) => {
                            if (index !== currentIndex && img.classList.contains("_active")) {
                                img.classList.remove("_active");
                            } else if (
                                index === currentIndex &&
                                !img.classList.contains("_active")
                            ) {
                                img.classList.add("_active");
                            }
                        });
                    }
                }
            }
        });
    }
}
function initSpecialize() {
    function showGallery(parentWrapper) {
        document.documentElement.classList.add("lock");
        if (parentWrapper) {
            parentWrapper.classList.add("_show-gallery");

            function onCloseClick(e) {
                const isCloseButton = (target) => target.closest(".section-specialize__close-btn");

                if (isCloseButton(e.target)) {
                    hideGallery();
                }
            }
            function onKeydown(e) {
                if (e.code == "Escape") {
                    hideGallery();
                }
            }

            function hideGallery() {
                parentWrapper.classList.remove("_show-gallery");
                document.documentElement.classList.remove("lock");
                document.removeEventListener("click", onCloseClick);
                document.removeEventListener("keydown", onKeydown);
            }

            document.addEventListener("click", onCloseClick);
            document.addEventListener("keydown", onKeydown);
        }
    }
    function showAllInfo(currentBlock) {
        currentBlock.classList.add("_mob-active");
    }
    if (document.querySelector(".section-specialize")) {
        const isOpenButton = (target) => target.closest(".offer-section-specialize__arrow");
        document.addEventListener("click", (e) => {
            if (isOpenButton(e.target)) {
                e.preventDefault();
                const wrapper = e.target.closest(".section-specialize");
                showGallery(wrapper);
            } else if (e.target.closest(".section-specialize")) {
                e.preventDefault();
                showAllInfo(e.target.closest(".section-specialize"));
            }
        });
    }
}

function initPhoneMask() {
    const maskOptions = {
        mask: "+{38 (0}00) 000 00 00",
    };
    const inputs = document.querySelectorAll('[type="tel"]');
    inputs.forEach((input) => {
        IMask(input, maskOptions);
    });
}
function windowLoad() {
    initSuperSpollers();
    initSpecialize();
    initPhoneMask();
}

document.addEventListener("DOMContentLoaded", windowLoad);
