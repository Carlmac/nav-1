// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"epB2":[function(require,module,exports) {
var localSave = localStorage.getItem('hash');
var localHash = JSON.parse(localSave);
var unitHash = localHash || [{
  "thumbnail": "a",
  "title": "apple.com",
  "URL": "https://www.apple.com"
}, {
  "thumbnail": "b",
  "title": "bilibili.com",
  "URL": "https://www.bilibili.com"
}];
var $addBtn = $('#add-btn');

var render = function render() {
  $('.site-unit').remove();
  unitHash.forEach(function (item, index) {
    var $newSiteUnit = $("<div class=\"site-unit\"><dt class=\"site-thumbnail\">".concat(item['thumbnail'], "</dt>\n    <dd class=\"site-title\">").concat(item['title'], "</dd><div class=\"close-btn\"><svg class=\"icon\"><use xlink:href=\"#icon-close\"></use></svg></div></div>"));
    $newSiteUnit.insertBefore($addBtn);
    $newSiteUnit.on('click', function (e) {
      window.open(item['URL'], '_blank');
    });
    var $closeBtn = $newSiteUnit.find('.close-btn');
    $closeBtn.on('click', function (e) {
      e.stopPropagation();
      unitHash.splice(index, 1);
      render();
    });
  });
};

var formalizeUnit = function formalizeUnit(url) {
  var unit = {};
  var t = url.replace('https://', '').replace('http://', '').replace('www.', '').replace(/\/.*/, '');
  var tn = t[0];
  unit["thumbnail"] = tn;
  unit["title"] = t;
  unit["URL"] = url;
  return unit;
};

$addBtn.on('click', function (e) {
  var str = window.prompt('请输入网址');

  if (str === null) {
    return;
  }

  if (str.indexOf('http') !== 0) {
    str = 'https://' + str;
  }

  unitHash.push(formalizeUnit(str));
  render();
});

window.onbeforeunload = function (e) {
  var str = JSON.stringify(unitHash);
  localStorage.setItem('hash', str);
};

$(document).on('keypress', function (e) {
  // 如果当前搜索栏是激活状态，那就不要响应键盘跳转事件
  if (document.activeElement === document.querySelector('.search-form > input')) {
    return;
  }

  var key = e.key;

  for (var i = 0; i < unitHash.length; i++) {
    if (unitHash[i].thumbnail.toLowerCase() === key) {
      window.open(unitHash[i].URL);
    }
  }
});
render();
},{}]},{},["epB2"], null)
//# sourceMappingURL=main.a8fbe56c.js.map