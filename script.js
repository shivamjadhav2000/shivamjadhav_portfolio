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

document.addEventListener('DOMContentLoaded', () => {
  const yearofCopyright=document.querySelector('#yearofCopyright')
  const year = new Date().getFullYear()
  yearofCopyright.textContent = year
})

document.addEventListener('DOMContentLoaded', () => {
  const resumeDownload = document.querySelector('#resumeDownload')
  resumeDownload.addEventListener('click', () => {
    window.open('./shivamjadhav-software-egineer-resume.pdf', '_blank')
  })

})
