const carousels = document.querySelectorAll("[data-carousel]")

carousels.forEach(carousel => {
  const slides = carousel.querySelector("[data-slides]")
  const dotsContainer = carousel.querySelector(".dots")
  
  Array.from(slides.children).forEach((_, i) => {
    const dot = document.createElement("div")
    dot.classList.add("dot")
    dot.addEventListener("click", () => {
      updateActiveSlide(i)
    })
    dotsContainer.appendChild(dot)
  })

  const updateActiveSlide = (newIndex) => {
    const activeSlide = slides.querySelector("[data-active]")
    let index = newIndex

    if (index < 0) index = slides.children.length - 1
    if (index >= slides.children.length) index = 0

    slides.children[index].dataset.active = true
    delete activeSlide.dataset.active

    // Update active dot
    const activeDot = dotsContainer.querySelector(".dot.active")
    if (activeDot) activeDot.classList.remove("active")
    dotsContainer.children[index].classList.add("active")
  }

  // Initialize first dot as active
  dotsContainer.firstChild.classList.add("active")

  carousel.querySelectorAll("[data-carousel-button]").forEach(button => {
    button.addEventListener("click", () => {
      const offset = button.dataset.carouselButton === "next" ? 1 : -1
      const activeSlide = slides.querySelector("[data-active]")
      let newIndex = [...slides.children].indexOf(activeSlide) + offset
      updateActiveSlide(newIndex)
    })
  })
})
