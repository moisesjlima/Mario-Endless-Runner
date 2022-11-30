const mario = document.querySelector('.mario')
const pipe = document.querySelector('.pipe')
const clouds = document.querySelector('.clouds')
const gameInfo = document.querySelector('.game-info')
const gameOver = document.querySelector('.game-over')
const countJump = document.querySelector('.count-jump')

const jump = (e) => {
  if(e.which == 32) { // 32 (ASCII code for spacebar)
    mario.classList.add('jump')

    if(count == 5) {
      countJump.style.color = 'blue'
      countJump.style.fontSize = '1.2em'
    }

    if(count == 30) {
      countJump.style.color = 'orange'
      countJump.style.fontSize = '1.4em'
    }

    if(count == 50) {
      countJump.style.color = 'red'
      countJump.style.fontSize = '1.8em'
    }
    
    setTimeout(() => {
      mario.classList.remove('jump')
    }, 500)
    
    gameInfo.remove()
  }
}

var count = 1
const loop = setInterval(() => {
  const cloudsPosition = clouds.offsetLeft
  const pipePosition = pipe.offsetLeft
  const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '')

  if(pipePosition <= 120 && pipePosition > 0 && marioPosition < 80 ) {
    clouds.style.animation = 'none'
    clouds.style.left = `${cloudsPosition}px`

    pipe.style.animation = 'none'
    pipe.style.left = `${pipePosition}px`

    mario.style.animation = 'none'
    mario.style.bottom = `${marioPosition}px`

    mario.src = 'images/game-over.png'
    mario.style.width = '70px'
    mario.style.marginLeft = '50px'

    gameInfo.remove()
    count--
    gameOver.innerHTML = '<h3>Game Over</h3>'
    
    clearInterval(loop)
  }

  if (pipePosition >= -10 && pipePosition <= 50) {
    countJump.innerHTML = `<h3>${count}</h3>`
    count++
  }
}, 76)

var key = document.addEventListener('keydown', jump);
