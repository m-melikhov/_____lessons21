const contentCotainer = document.querySelector('#content-container');
const cartCouterLabel = document.querySelector('#cart-counter-label');

let cartCouter = 0;
let cartPrice = 0;

const btnClickhandler = (e) => {
  const target = e.target;
  const interval = 2000;

  let restoreHTML = null;

  if (typeof target !== 'object') return;
  if (!target.matches('.item-actions__cart')) return;

  incrementCounter(cartCouterLabel, ++cartCouter);
  cartPrice = getPrice(target, cartPrice, getMockData);

  restoreHTML = target.innerHTML;
  target.innerHTML = `Added ${cartPrice.toFixed(2)} $`;
  disabledControls(target, contentCotainer, btnClickhandler);

  setTimeout(() => {
    target.innerHTML = restoreHTML;
    enabledControls(target, contentCotainer, btnClickhandler);
  }, interval);
};

contentCotainer.addEventListener('click', btnClickhandler);

function incrementCounter($label, cn) {
  $label.innerText = cn;
  if (cn === 1) $label.style.display = 'block';
};

function getMockData(t) {
  return +t.parentElement
    .previousElementSibling
    .innerHTML
    .replace(/^\$(\d+)\s\D+(\d+).*$/, '$1.$2');
};

function getPrice(t, p, cb) {
  return cartPrice = Math.round((cartPrice + getMockData(target)) * 100) / 100;
}

function disabledControls(t, $el, fn) {
  t.disabled = true;
  $el.removeEventListener('click', fn);
}

function enabledControls(t, $el, fn) {
  t.disabled = false;
  $el.removeEventListener('click', fn);
}