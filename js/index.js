const baseUrl = 'https://dog.ceo/api/';
let imgsRandom = baseUrl + 'breeds/image/random';

const doc = document;
const btnText = 'Random dog';
const getDataBtn = doc.querySelector('.get-data');
const numImg = doc.querySelector('.number-img');
const isBreedsSelectEl = doc.querySelector('.checkbox');
let isBreedsSelect = false;
const breedsSelectEl = doc.querySelector('.select-breeds');
const breedOption = doc.querySelectorAll('.breed-option');

const imgBlockEl = doc.querySelector('.img-block');

showBreedsSelect();
renderSelectBreeds();

isBreedsSelectEl.onchange = (e) => {
  isBreedsSelect = e.target.checked;
  showBreedsSelect();
}

getDataBtn.onclick = () => {
  const numImgValue = numImg.value ? numImg.value : 0;
  const selectedBreedValue = breedsSelectEl.value;
  const imgsRandomNum = imgsRandom + '/' + numImgValue;
  const imgsBreedRandomNum = baseUrl + 'breed/' + selectedBreedValue + '/images/random/' + numImgValue;

  if(!isBreedsSelect) {
    fetch(imgsRandomNum)
      .then(res => res.json())
      .then(data => {
        const src = data.message;
        audit(src);
      });
  } else if (isBreedsSelect) {
    fetch(imgsBreedRandomNum)
      .then(res => res.json())
      .then(data => {
        const src = data.message;
        audit(src);
      });
  } else {
    const imgItem = 
    `
      <div class="img-block__item">
        <p>Error! Select a breed.</p>
      </div>
    `;

    imgBlockEl.innerHTML = '';
    imgBlockEl.insertAdjacentHTML('afterbegin', imgItem);
  }
}

function renderSelectBreeds() {
  fetch('https://dog.ceo/api/breeds/list/all')
    .then(res => res.json())
    .then(data => {
      let selectBreeds = '';
      
      for (let item in data.message) {
        const breed = wordUpperCase(item);

        console.log(item, data.message[item]);

        if (data.message[item].length > 0) {
          for (let i = 0; i < data.message[item].length; i++) {
            const subBreed = wordUpperCase(data.message[item][i]);
            selectBreeds += 
            `
              <option class="breed-option" value="${item}/${data.message[item][i]}">${breed} ${subBreed}</option>
            `;
          }
        } else {
          selectBreeds += 
          `
            <option class="breed-option" value="${item}">${breed}</option>
          `;
        }
        
        breedsSelectEl.innerHTML = '';
        breedsSelectEl.insertAdjacentHTML('afterbegin', selectBreeds);
      };
    }); 
}

function showBreedsSelect() {
  breedsSelectEl.style.display = isBreedsSelect ? 'initial' : 'none';
  getDataBtn.innerHTML = !isBreedsSelect ? btnText : btnText + ' (of breeds)';
}

function renderImg(src) {
  const imgItem = 
  `
    <div class="img-block__item">
      <img src="${ src }" alt="">
    </div>
  `;

  imgBlockEl.innerHTML = '';
  imgBlockEl.insertAdjacentHTML('afterbegin', imgItem);
}

function renderImgs(srcArr) {
  let imgItems = '';

  for(let item of srcArr) {
    imgItems += 
    `
      <div class="img-block__item">
        <img src="${ item }" alt="">
      </div>
    `;

    imgBlockEl.innerHTML = '';
    imgBlockEl.insertAdjacentHTML('afterbegin', imgItems);
  }
}

function wordUpperCase(word) {
  const parts = word.split('');
  const first = parts[0].toUpperCase();
  const rest = parts.slice(1);
  const result = [first, ...rest].join("");

  return result;
}

function audit(src) {
  const numImgValue = numImg.value ? numImg.value : 0;
  
  if (numImgValue == 1) {
    renderImg(src);
  }

  if (numImgValue > 1) {
    renderImgs(src);
  }

  if (isNaN(numImgValue) || numImgValue <= 0) {
    const imgItem = 
      `
        <div class="img-block__item">
          <p>Error! Enter a number greater than 0.</p>
        </div>
      `;

    imgBlockEl.innerHTML = '';
    imgBlockEl.insertAdjacentHTML('afterbegin', imgItem);
  }
}