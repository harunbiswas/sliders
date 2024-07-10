document.addEventListener('DOMContentLoaded', () => {
  const slider1 = document.querySelector('.slider-1')
  const slides = document.querySelectorAll('.slider-1-slide')
  const btnsContainer = document.querySelector('.slider-1-btns')

  const slideWidth = 270 // Width of each slide
  const slideMargin = 30 // Margin between slides

  let currentIndex = 0 // Current slide index
  let startX = 0 // Initial position of mouse click
  let isDragging = false // Flag to track dragging state
  let translateX = 0 // Current translation value

  // Calculate number of slides visible at a time
  const slidesVisible = Math.floor(
    slider1.clientWidth / (slideWidth + slideMargin)
  )

  const btnCount = Math.ceil(slides.length / slidesVisible)

  // Function to update slider position
  const updateSlider = () => {
    slider1.style.transform = `translateX(${translateX}px)`
  }

  // Function to update active button
  const updateButtons = () => {
    document
      .querySelectorAll('.slider-1-btns button')
      .forEach(btn => btn.classList.remove('active'))
    document
      .querySelectorAll('.slider-1-btns button')
      [currentIndex].classList.add('active')
  }

  // Function to handle slide change
  const goToSlide = index => {
    currentIndex = index
    translateX = -currentIndex * slidesVisible * (slideWidth + slideMargin)
    updateSlider()
    updateButtons()
    restartAutoplay()
  }

  // Create buttons and add event listeners
  for (let i = 0; i < btnCount; i++) {
    const button = document.createElement('button')
    if (i === 0) {
      button.className = 'active'
    }
    btnsContainer.appendChild(button)

    button.addEventListener('click', () => {
      goToSlide(i)
    })
  }

  // Autoplay functionality
  // Function to start autoplay
  function startAutoplay() {
    autoplayInterval = setInterval(() => {
      if (currentIndex < btnCount - 1) {
        currentIndex += 1
        goToSlide(currentIndex)
      } else {
        currentIndex = 0
        goToSlide(currentIndex)
      }
    }, 5000)
  }

  // Function to stop autoplay
  function stopAutoplay() {
    clearInterval(autoplayInterval)
  }

  startAutoplay()
  // Function to restart autoplay
  function restartAutoplay() {
    stopAutoplay() // Clear any existing autoplay interval
    startAutoplay() // Start autoplay again
  }

  // Event listeners for mouse drag
  let start
  slider1.addEventListener('mousedown', e => {
    isDragging = true
    start = e.pageX
    startX = e.pageX - translateX
  })

  let newX
  let pagex
  slider1.addEventListener('mousemove', e => {
    if (isDragging) {
      pagex = e.pageX
      newX = pagex - startX

      slider1.style.transition = 'none'
      slider1.style.transform = `translateX(${newX}px)`
    }
  })

  slider1.addEventListener('mouseup', () => {
    if (isDragging) {
      isDragging = false

      slider1.style.transition = ' 2s ease-in-out'

      // Calculate index based on drag distance
      if (start > pagex + 100) {
        if (currentIndex < btnCount - 1) {
          currentIndex += 1
          goToSlide(currentIndex)
        } else {
          currentIndex = btnCount - 1
          goToSlide(currentIndex)
        }
      } else if (start < pagex + 100) {
        if (currentIndex > 0) {
          currentIndex -= 1
          goToSlide(currentIndex)
        } else {
          currentIndex = 0
          goToSlide(currentIndex)
        }
      }
    }
  })

  const slider1wrp = document.querySelector('.slider-1-wrp')
  slider1wrp.addEventListener('mouseover', () => {
    stopAutoplay()
  })
  slider1wrp.addEventListener('mouseout', () => {
    restartAutoplay()
  })
})
