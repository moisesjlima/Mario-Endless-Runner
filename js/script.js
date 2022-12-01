const mario = document.querySelector('.mario')
const pipe = document.querySelector('.pipe')
const clouds = document.querySelector('.clouds')
const gameInfo = document.querySelector('.game-info')
const gameOver = document.querySelector('.game-over')
const countJump = document.querySelector('.count-jump')
const distance = document.querySelector('.distance')


var count = 1
var score = 0
var end = 0
const jump = (e) => {
    if (e.which == 32) { // 32 (ASCII code for spacebar)
        mario.classList.add('jump')

        if (count == 10) {
            countJump.style.color = 'blue'
            countJump.style.fontSize = '16px'
            setTimeout(score += 15, 2000) 
        }

        if (count == 20) {
            countJump.style.color = 'orange'
            countJump.style.fontSize = '18px'
            setTimeout(score += 30, 2000) 
        }

        if (count == 30) {
            countJump.style.color = 'red'
            countJump.style.fontSize = '20px'
            setTimeout(score += 50, 2000) 
        }

        setTimeout(() => {
            mario.classList.remove('jump')
        }, 500)

        gameInfo.remove()
    }
}


const loop = setInterval(() => {
    const cloudsPosition = clouds.offsetLeft
    const pipePosition = pipe.offsetLeft
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '')

    if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
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
        score--
        distance.innerText = `<h4>Distância: ${score}</h4>`
        end = 1

        clearInterval(loop)
    } 

    if (pipePosition >= -12 && pipePosition <= 56) {
        countJump.innerHTML = `<h3>${count}</h3>`
        count++
    }
}, 75)

const scoreLoop = setInterval(() => {
    updateScore()
    if (end == 1) {
        clearInterval(scoreLoop)
    }
}, 300)

function updateScore() {
    score++
    distance.innerHTML = `<h4>Distância: ${score}</h4>`
}

var key = document.addEventListener('keydown', jump);