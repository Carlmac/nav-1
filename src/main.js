let localSave = localStorage.getItem('hash');
let localHash = JSON.parse(localSave);
console.log(localHash);
let unitHash = localHash || [
  {
    "thumbnail": "a",
    "title": "apple.com",
    "URL": "https://www.apple.com"
  },
  {
    "thumbnail": "b",
    "title": "bilibili.com",
    "URL": "https://www.bilibili.com"
  }
];

const $addBtn = $('#add-btn');

const render = () => {

  $('.site-unit').remove();

  unitHash.forEach((item, index) => {

    let $newSiteUnit = $(`<div class="site-unit"><dt class="site-thumbnail">${item['thumbnail']}</dt>
    <dd class="site-title">${item['title']}</dd><div class="close-btn"><svg class="icon"><use xlink:href="#icon-close"></use></svg></div></div>`);

    $newSiteUnit.insertBefore($addBtn);

    $newSiteUnit.on('click', function (e) {
      window.open(item['URL'], '_blank');
    });

    let $closeBtn = $newSiteUnit.find('.close-btn');
    $closeBtn.on('click', function (e) {
      e.stopPropagation();
      unitHash.splice(index, 1);
      render();
    });
  });
};

const formalizeUnit = (url) => {
  let unit = {};
  let t = url.replace('https://', '')
    .replace('http://', '')
    .replace('www.', '')
    .replace(/\/.*/, '');
  let tn = t[0];
  unit["thumbnail"] = tn;
  unit["title"] = t;
  unit["URL"] = url;
  return unit;
}

$addBtn.on('click', function (e) {
  let str = window.prompt('请输入网址');
  if (str === null) { return }
  if (str.indexOf('http') !== 0) {
    str = 'https://' + str;
  }
  unitHash.push(formalizeUnit(str));
  render();
});

window.onbeforeunload = function (e) {
  const str = JSON.stringify(unitHash);
  localStorage.setItem('hash', str);
}

$(document).on('keypress', (e) => {
  // 如果当前搜索栏是激活状态，那就不要响应键盘跳转事件
  if (document.activeElement === document.querySelector('.search-form > input')) { return }
  
  const { key } = e;
  for (let i = 0; i < unitHash.length; i++) {
    if (unitHash[i].thumbnail.toLowerCase() === key) {
      window.open(unitHash[i].URL);
    }
  }
})

render();