const template = document.querySelector('.template__image').content
const templateButton = document.querySelector('.template__button').content
const containerImage = document.querySelector('.slider__container-images')
const containerButton = document.querySelector('.slider__select-image')

const arrayList = ['/slider-image/image-1.jpg', '/slider-image/image-2.jpg', '/slider-image/image-3.jpg', '/slider-image/image-4.jpg', '/slider-image/image-5.jpg', '/slider-image/image-6.jpg', '/slider-image/image-7.jpg', '/slider-image/image-8.jpg', '/slider-image/image-9.jpg', '/slider-image/image-10.jpg']

arrayList.forEach((item) => {
  const templateElement = template.querySelector('.slider__container-image').cloneNode(true)
  templateElement.querySelector('.slider__image').src = item
  containerImage.append(templateElement)

  const templateElementButton = templateButton.querySelector('.slider__button-item').cloneNode(true)
  containerButton.append(templateElementButton)
})

const containerImages = document.querySelector('.slider__container-images')
const buttonRight = document.querySelector('.slider__button_right')
const buttonLeft = document.querySelector('.slider__button_left')
const imageWidth = containerImages.offsetWidth

let offset = 0
let animationInterval
let imageSelect = 1
let translateImage = false

function translateImageRight() {
  containerImages.style.transform = `translateX(${500}px)`
}
function translateImageLeft() {
  containerImages.style.transform = `translateX(${-5540}px)`
  console.log('qweqweqweq')
}
function deleteFantomImage() {
  const imageRemoveAll = document.querySelectorAll('.slider__container-image_fantom-left, .slider__container-image_fantom-right')
  imageRemoveAll.forEach(item => {
    item.remove()
  })
}

// Animation image for right button
buttonRight.addEventListener('click', () => {
  if (imageSelect < arrayList.length) {
    imageSelect++
  } else {
    imageSelect = 1
  }

  updateActiveButton(imageSelect - 1)

  deleteFantomImage()

  if(translateImage) {
    translateImageRight()
    console.log('kekeke')
  }

  if (imageSelect === 1) {
    translateImage = true
    const clonedImage = document.querySelector('.slider__container-image').cloneNode(true);
    clonedImage.classList.add('slider__container-image_fantom-right')
    containerImages.appendChild(clonedImage);
  } else {
    translateImage = false
  }

  console.log(imageSelect)
  buttonRight.disabled = true
  clearInterval(animationInterval)

  const step = 560
  const frames = 60
  const duration = 600
  const interval = duration / frames

  let currentFrame = 0
  let imagesCount = arrayList.length + 1

  animationInterval = setInterval(() => {
    if (currentFrame < frames) {
      offset -= step / frames
      containerImages.style.transform = `translateX(${offset}px)`
      currentFrame++
    } else {
      const currentPosition = Math.abs(offset) / imageWidth
      if (currentPosition >= imagesCount) {
        offset = 0
      }

      containerImages.style.transform = `translateX(${offset}px)`
      clearInterval(animationInterval)
      buttonRight.disabled = false
    }
  }, interval)
})

// Animation image for left button
buttonLeft.addEventListener('click', () => {
  if (imageSelect > 1) {
    imageSelect--
  } else {
    imageSelect = 10
  }

  deleteFantomImage()

  updateActiveButton(imageSelect - 1)

  if (imageSelect === 10) {
    translateImage = true
    translateImage = true
    const containerImages = document.querySelectorAll('.slider__container-image');
    const lastImage = containerImages[containerImages.length - 1].cloneNode(true);
    lastImage.classList.add('slider__container-image_fantom-left')
    containerImage.insertBefore(lastImage, containerImage.firstChild);
    translateImageLeft()
  } else {
    translateImage = false
  }

  buttonLeft.disabled = true
  buttonRight.disabled = true
  clearInterval(animationInterval)

  const step = 560
  const frames = 60
  const duration = 600
  const interval = duration / frames

  let currentFrame = 0

  animationInterval = setInterval(() => {
    if (currentFrame < frames) {
      offset += step / frames
      containerImages.style.transform = `translateX(${offset}px)`
      currentFrame++
    } else {
      if (offset >= 1) {
        offset = -((imageWidth + 4) * arrayList.length)
      }
      containerImages.style.transform = `translateX(${offset}px)`
      clearInterval(animationInterval)
      buttonLeft.disabled = false
      buttonRight.disabled = false
    }
  }, interval)
})

// Buttons for switching any slide
const buttons = document.querySelectorAll('.slider__button-select')
const images = containerImage.querySelectorAll('.slider__container-image')

function updateActiveButton(index) {
  buttons.forEach((button, i) => {
    if (i === index) {
      button.classList.add('slider__button-select_active')
    } else {
      button.classList.remove('slider__button-select_active')
    }
  })
}

buttons.forEach((button, index) => {
  button.addEventListener('click', () => {
    imageSelect = index + 1
    updateActiveButton(index)
    offset = -560 * index
    containerImages.style.transform = `translateX(${offset}px)`
  })
})

updateActiveButton(0)
