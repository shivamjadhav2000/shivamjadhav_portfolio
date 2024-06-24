const main = () => {
  var currslide = 0
  var slides = document.querySelectorAll('.slide')
  console.log('slides', slides)
  var maxslides = slides.length
  const slideanimation = () => {
    console.log('slideanimation', currslide, maxslides)
    currslide = (currslide + 1) % maxslides
    slides.forEach((s, i) => {
      s.style.display = `${i === currslide ? 'block' : 'none'}`
    })
  }
  setInterval(slideanimation, 6000)
}
document.addEventListener('DOMContentLoaded', main)

