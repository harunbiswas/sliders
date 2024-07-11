// slider 1
document.addEventListener('DOMContentLoaded', () => {
  const slider1 = document.querySelector('.slider-1')
  const slides = document.querySelectorAll('.slider-1-slide')
  const btnsContainer = document.querySelector('.slider-1-btns')

  const slideWidth = 270 // Width of each slide
  const slideMargin = 30 // Margin between slides

  let currentIndex = 0 // Current slide index
  let startX = 0 // Initial position of mouse click or touch
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
  let autoplayInterval

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

  // Event listeners for mouse drag and touch drag
  let start
  let pagex

  const startDrag = e => {
    isDragging = true
    start = e.pageX || e.touches[0].pageX
    startX = start - translateX
  }

  const onDrag = e => {
    if (isDragging) {
      pagex = e.pageX || e.touches[0].pageX
      const newX = pagex - startX

      slider1.style.transition = 'none'
      slider1.style.transform = `translateX(${newX}px)`
    }
  }

  const endDrag = e => {
    if (isDragging) {
      isDragging = false
      slider1.style.transition = '0.2s ease-in-out'

      // Determine direction of slide change
      if (start > pagex + 100) {
        if (currentIndex < btnCount - 1) {
          currentIndex += 1
        }
      } else if (start < pagex - 100) {
        if (currentIndex > 0) {
          currentIndex -= 1
        }
      }
      goToSlide(currentIndex)
    }
  }

  slider1.addEventListener('mousedown', startDrag)
  slider1.addEventListener('mousemove', onDrag)
  slider1.addEventListener('mouseup', endDrag)
  slider1.addEventListener('touchstart', startDrag)
  slider1.addEventListener('touchmove', onDrag)
  slider1.addEventListener('touchend', endDrag)

  const slider1wrp = document.querySelector('.slider-1-wrp')
  slider1wrp.addEventListener('mouseover', () => {
    stopAutoplay()
  })
  slider1wrp.addEventListener('mouseout', () => {
    restartAutoplay()
  })

  // Initialize slider
  updateSlider()
})

// slider 2
document.addEventListener('DOMContentLoaded', () => {
  const slider2 = document.querySelector('.slider-2')
  const slides = document.querySelectorAll('.slider-2-slide')
  const btnsContainer = document.querySelector('.slider-2-btns')

  const slideWidth = window.innerWidth < 750 ? 425 : 670 // Width of each slide
  const slideMargin = window.innerWidth < 750 ? 0 : 60 // Margin between slides

  let currentIndex = 0 // Current slide index
  let translateX = 0 // Current translation value

  // Calculate number of slides visible at a time
  const slidesVisible = Math.floor(
    slider2.clientWidth / (slideWidth + slideMargin)
  )

  const btnCount = Math.ceil(slides.length / slidesVisible)

  // Function to update slider position
  const updateSlider = () => {
    slider2.style.transform = `translateX(${translateX}px)`
  }

  // Function to handle slide change
  const goToSlide = index => {
    currentIndex = index
    translateX = -currentIndex * (slideWidth + slideMargin)
    updateSlider()

    restartAutoplay()
  }

  // Autoplay functionality
  let autoplayInterval

  let removeNum

  if (window.innerWidth > 1440) {
    removeNum = 0
  } else if (window.innerWidth <= 1440 && window.innerWidth >= 750) {
    removeNum = 2
  } else {
    removeNum = 1
  }

  console.log(removeNum)

  // Function to start autoplay
  function startAutoplay() {
    autoplayInterval = setInterval(() => {
      if (currentIndex < btnCount - removeNum) {
        currentIndex += 1
        goToSlide(currentIndex)
      } else {
        currentIndex = 0
        goToSlide(currentIndex)
      }
    }, 6000)
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

  // Event listeners for mouse drag and touch drag
  let startX = 0
  let isDragging = false
  let start
  let pagex

  const startDrag = e => {
    isDragging = true
    start = e.pageX || e.touches[0].pageX
    startX = start - translateX
  }

  const onDrag = e => {
    if (isDragging) {
      pagex = e.pageX || e.touches[0].pageX
      const newX = pagex - startX
      slider2.style.transition = 'none'
      slider2.style.transform = `translateX(${newX}px)`
    }
  }

  const endDrag = e => {
    if (isDragging) {
      isDragging = false
      slider2.style.transition = '0.2s ease-in-out'

      // Determine direction of slide change
      if (start > pagex + 100) {
        if (currentIndex < btnCount - removeNum) {
          currentIndex += 1
        }
      } else if (start < pagex - 100) {
        if (currentIndex > 0) {
          currentIndex -= 1
        }
      }
      goToSlide(currentIndex)
    }
  }

  slider2.addEventListener('mousedown', startDrag)
  slider2.addEventListener('mousemove', onDrag)
  slider2.addEventListener('mouseup', endDrag)
  slider2.addEventListener('touchstart', startDrag)
  slider2.addEventListener('touchmove', onDrag)
  slider2.addEventListener('touchend', endDrag)

  // Pause autoplay on mouseover
  slider2.addEventListener('mouseover', () => {
    stopAutoplay()
  })

  // Restart autoplay on mouseout
  slider2.addEventListener('mouseout', () => {
    restartAutoplay()
  })

  // Initialize slider
  updateSlider()
})
