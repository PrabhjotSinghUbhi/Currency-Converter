import { countryList } from './codes.js';

const selectContainers = document.querySelectorAll('select');
// const flagImage = document.querySelector('img')

for (const container of selectContainers) {
    for (const country in countryList) {
        const option = document.createElement('option');
        option.value = countryList[country];
        option.textContent = country;

        container.append(option)
    }
    container.addEventListener('change', updateFlag)
}

function updateFlag() {
    console.log("function called");
    for (const container of selectContainers) {
        const flagImg = container.parentNode.childNodes[1].children[0]
        flagImg.src = `https://flagsapi.com/${container.value}/flat/64.png`
    }
}

const result = document.getElementById('result')
const input = document.querySelector('input')

const apiKey = 'a45bb0c2b22dee197ceec30a53f69791'

async function getExchangeValue() {

    let from = selectContainers[0].options[selectContainers[0].selectedIndex].text
    let to = selectContainers[1].options[selectContainers[1].selectedIndex].text

    let amount = input.value

    const URL = `https://api.exchangerate.host/convert?from=${from}&to=${to}&amount=${amount}&access_key=${apiKey}`

    let response = await fetch(URL)
    let data = await response.json()

    result.textContent = `${amount} ${from} is ${data.result.toFixed(2)} ${to}`
    console.log(data);
}

const getBtn = document.querySelector('button')

getBtn.addEventListener('click', getExchangeValue)

document.addEventListener('DOMContentLoaded', updateFlag)

input.addEventListener('keydown', (e) => {
    if (e.key === "Enter") {
        getExchangeValue()
    }
})

const swap = document.querySelector('#swapIcon')

swap.addEventListener('click', (e) => {
    const tempValue = selectContainers[0].value
    selectContainers[0].value = selectContainers[1].value
    selectContainers[1].value = tempValue

    updateFlag()
    getExchangeValue()
})  