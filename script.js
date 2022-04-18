const box = document.querySelector('.box')

const random = (number) => {
    let rand = Math.floor(Math.random() * number)
    return rand
}

let gemPocket = [
'aquamarine', 
'circle', 
'hexagon', 
'octagon', 
'pentagon', 
'ruby', 
'tourmaline', 
'triangle'
]


let gemSplice
const gemManage = (arrGem) => {
    let gemRandom = random(arrGem.length)
    gemSplice = arrGem.splice(gemRandom, 1)
}

const createCard = () => {
    let gem1 = [...gemPocket]
    let gem2 = [...gemPocket]
    for (let i = 1; i <= 16; i++) {
        if (i <= 8) {
            gemManage(gem1)
        }else {
            gemManage(gem2)
        }
        const card = document.createElement('div')
        card.classList.add('card')
        card.setAttribute('data-value', gemSplice)
        card.addEventListener('click', openCard)
    
        const cardImg = document.createElement('img')
        cardImg.setAttribute('draggable', false)
        card.append(cardImg)
        box.append(card)
    }
}

let dataGem
let arrCheck = []
let select2gem = 0
let collectGem = []
const score = document.querySelector('.score-num')
const nextCardset = document.querySelector('.next-set')
const openCard = (event) => {
    let clickGem = event.target.querySelector('img')
        dataGem = event.target.getAttribute('data-value')
        if (select2gem < 2) {
            /* flip card */
            clickGem.style.transition = '1.2s ease-in-out'
            clickGem.style.transform = 'rotatey(180deg)'
            event.target.style.transition = '1s'
            event.target.style.transform = 'rotatey(180deg)'
            clickGem.classList.add('card-img')
            clickGem.src = `./image/${dataGem}.png`
            event.target.style.backgroundImage = "url('./image/frontcard.jpg')"
            arrCheck.push(event)
            arrCheck[0].target.removeEventListener('click', openCard)
            if (select2gem === 1) {
                let value1 = arrCheck[0].target.getAttribute('data-value')
                let value2 = arrCheck[1].target.getAttribute('data-value')
                select2gem ++ 
                if (value1 != value2) {
                    setTimeout(() => {
                        /* flip card */
                        clickGem.style.transform = 'rotatey(360deg)'
                        arrCheck[0].target.style.transform = 'rotatey(360deg)'
                        arrCheck[1].target.style.transform = 'rotatey(360deg)'
                        notSame(arrCheck)
                        select2gem = 0
                    }, 1000);
                }else {
                    score.innerHTML = Number(score.innerHTML) + 10
                    same(arrCheck)
                    arrCheck = []
                    select2gem = 0
                    collectGem.push(value1)
                    if (collectGem.length % 8 === 0) {
                        nextCardset.innerHTML = 'Press <b> enter </b> for next card set'
                        nextCardset.addEventListener('click', tabOrClickToNextCard)
                        document.addEventListener('keydown', entertoNextCard)
                    }
                }
            }else {
                select2gem ++ 
            }
        }
}

const notSame = () => {
    /* not the same */
    arrCheck[0].target.addEventListener('click', openCard)
     /* gem remove */
    arrCheck[0].target.querySelector('img').classList.remove('card-img')
    arrCheck[0].target.querySelector('img').src = ``
    arrCheck[1].target.querySelector('img').classList.remove('card-img')
    arrCheck[1].target.querySelector('img').src = ``
    /* background reset */
    arrCheck[0].target.style.backgroundImage = "url('./image/backcard.jpg')"
    arrCheck[1].target.style.backgroundImage = "url('./image/backcard.jpg')"
    arrCheck = []
}

const same = (arrCheck) => {
    arrCheck[0].target.addEventListener('click', openCard)
    arrCheck[0].target.removeEventListener('click', openCard)
    arrCheck[1].target.removeEventListener('click', openCard)
}

createCard()

const entertoNextCard = (value) => {
    if (value.key === 'Enter') {
        nextCardset.innerHTML = ''
        box.innerHTML = ''
        createCard()
    }
}

const tabOrClickToNextCard = () => {
    nextCardset.innerHTML = ''
    box.innerHTML = ''
    createCard()
}
