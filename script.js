document.addEventListener('DOMContentLoaded', () => {
  var currslide = 0
  var slides = document.querySelectorAll('.slide')
  var maxslides = slides.length
  const slideanimation = () => {
    currslide = (currslide + 1) % maxslides
    slides.forEach((s, i) => {
      s.style.display = `${i === currslide ? 'block' : 'none'}`
    })
  }
  setInterval(slideanimation, 6000)
})

