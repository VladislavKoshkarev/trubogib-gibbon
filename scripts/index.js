import declinateNum from "./declinateNum.js";
const orderPopup = document.querySelector('.form-popup');
const orderButton = document.querySelector('.order-button');

orderButton.addEventListener('click', () => {
    orderPopup.classList.toggle('popup-open')
    document.body.classList.toggle('scroll-lock')
    orderPopup.addEventListener('click', (event) => {
      if (event.target.classList.contains('form-popup') || event.target.classList.contains('close-button')) {
        orderPopup.classList.remove('popup-open')
        document.body.classList.remove('scroll-lock')
      }
    })
})

document.addEventListener('DOMContentLoaded', function() {
  const enddate = new Date(2024, 1, 1);
  let timerId = null;

  const days = document.querySelector('.timer__days');
  const hours = document.querySelector('.timer__hours');
  const minutes = document.querySelector('.timer__minutes');
  const seconds = document.querySelector('.timer__seconds');

  function countdownTimer() {
    const diff = enddate - new Date();
    if (diff <= 0) {
      clearInterval(timerId);
    }
    const daysNum = diff > 0 ? Math.floor(diff / 1000 / 60 / 60 / 24) : 0;
    const hoursNum = diff > 0 ? Math.floor(diff / 1000 / 60 / 60) % 24 : 0;
    const minutesNum = diff > 0 ? Math.floor(diff / 1000 / 60) % 60 : 0;
    const secondsNum = diff > 0 ? Math.floor(diff / 1000) % 60 : 0;
    days.textContent = daysNum < 10 ? '0' + daysNum : daysNum;
    hours.textContent = hoursNum < 10 ? '0' + hoursNum : hoursNum;
    minutes.textContent = minutesNum < 10 ? '0' + minutesNum : minutesNum;
    seconds.textContent = secondsNum < 10 ? '0' + secondsNum : secondsNum;
    days.dataset.title = declinateNum(daysNum, ['день', 'дня', 'дней']);
    hours.dataset.title = declinateNum(hoursNum, ['час', 'часа', 'часов']);
    minutes.dataset.title = declinateNum(minutesNum, ['минута', 'минуты', 'минут']);
    seconds.dataset.title = declinateNum(secondsNum, ['секунда', 'секунды', 'секунд']);
  }

  countdownTimer();

  timerId = setInterval(countdownTimer, 1000);
});

const kitSelectList = document.querySelector('.custom-list');
const discount = document.querySelector('.discount')
const price = document.querySelector('.new-price span')
const kitPicture = document.querySelector('.kit-pic')
const orderForm = document.querySelector('.order-form')
const popupOptions = document.querySelectorAll('.item')
const checkboxes = document.querySelectorAll('.custom-checkbox_input')

const kitsObj = {
  gibbon: {
    discount: '50',
    price: '7990',
    pic: './assets/gibbon-new.png',
    options: [],
  },
  gibbon_pro: {
    discount: '55',
    price: '8490',
    pic: './assets/gibbon-pro-new.png',
    options: [],
  },
  gibbon_premium: {
    discount: '55',
    price: '15650',
    pic: './assets/gibbon-pro-new.png',
    options: ['centroboy_gift', 'adapter', 'roliki', 'uglogib', 'kolca'],
  },
}

const optionsObj = {
  centroboy: {
    price: '1490',
    pic: './assets/centroboy.png',
  },
  adapter: {
    price: '990',
    pic: './assets/adapter.png',
  },
  ugol: {
    price: '990',
    pic: './assets/ugol.png',
  },
  roliki: {
    price: '2990',
    pic: './assets/roliki.png',
  },
  uglogib: {
    price: '2390',
    pic: './assets/uglogib.png',
  },
  kolca: {
    price: '790',
    pic: './assets/kolca.png',
  },
  affe915: {
    price: '7990',
    pic: './assets/affe915.png',
  },
}

const optionPicsArr = [];

kitSelectList.addEventListener('change', selectKit)
orderForm.addEventListener('click', addOptions);

function selectKit(event) {
  const kit = event.target.value
  // if (kit === 'gibbon_premium') {
  // }
  console.log(kitsObj[kit].options)
  checkOptions(kitsObj[kit].options)
  discount.textContent = kitsObj[kit].discount;
  price.textContent = kitsObj[kit].price;
  kitPicture.setAttribute('src', kitsObj[kit].pic)
}

function addOptions(event) {
  if (event.target.classList.contains('custom-checkbox_input')) {
    if (!event.target.hasAttribute('added')) {
      const option = event.target.getAttribute('data-dop')
      displayOption(option);
      price.textContent = +price.textContent + +optionsObj[option].price
      event.target.setAttribute('added', 'added')
      optionPicsArr.push(option);
    }
    else if (event.target.hasAttribute('added')) {
      const option = event.target.getAttribute('data-dop')
      hideOption(option);
      price.textContent = +price.textContent - +optionsObj[option].price
      event.target.removeAttribute('added', 'added')
    }

  }
}

function displayOption(option) {
  popupOptions.forEach(el => {
    if (el.classList.contains(`item-${option}`)) el.classList.remove('hidden')
  })
}

function hideOption(option) {
  popupOptions.forEach(el => {
    if (el.classList.contains(`item-${option}`)) el.classList.add('hidden')
  })
}

function checkOptions(arr) {
  console.log(arr.length)
  if (arr.length !== 0) {
    arr.forEach(el => {
      checkboxes.forEach(box => {
        if (box.getAttribute('data-dop') === 'centroboy') {
          box.parentElement.classList.add('hidden')
        }
        if (box.getAttribute('data-dop') === 'centroboy_gift') {
          box.parentElement.classList.remove('hidden')
        }
        if (box.getAttribute('data-dop') === el) {
          box.checked = true
          box.setAttribute('added', 'added')
          displayOption(el)
        }
      })
    })
  }
  else {
    checkboxes.forEach(box => {
      if (box.getAttribute('data-dop') === 'centroboy') {
        box.parentElement.classList.remove('hidden')
      }
      if (box.getAttribute('data-dop') === 'centroboy_gift') {
        box.parentElement.classList.add('hidden')
      }
      box.checked = false
      })
    popupOptions.forEach(el => el.classList.add('hidden'))
  }
}
