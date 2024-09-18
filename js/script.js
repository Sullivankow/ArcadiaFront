// Carousel de navigation//

let slideIndex = 1;
showSlides(slideIndex);

function changeSlide(n) {

    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    
    let slides = document.getElementsByClassName("Carousel-slide");
    

    if(n > slides.lenght) {
        slideIndex = 1;
    }
    if (n < 1) {
        slideIndex = slides.lenght;
    }


    slides[slideIndex - 1].computedStyleMap.display = "block";
    
}