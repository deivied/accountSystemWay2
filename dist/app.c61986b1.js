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
})({"src/classes/caisse.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Caisses = void 0;

var Caisses =
/** @class */
function () {
  function Caisses(solde, trsc) {
    this.observer = [];
    this.solde = solde;
    this.transactions = trsc;
    this.notify();
  }

  Caisses.prototype.subscribe = function (obs) {
    this.observer.push(obs);
    console.log('subscribe');
  };

  Caisses.prototype.unsubscribe = function (obs) {
    var index = this.observer.indexOf(obs);
    this.observer.splice(index, 1);
    console.log('unsubscribe');
  };

  Caisses.prototype.addTransac = function (transac) {
    // this.tr=transac
    // this.notify()
    this.transactions.push(transac);
    console.log('addtransaction');
  };

  Caisses.prototype.notify = function () {
    var _this = this;

    this.observer.forEach(function (obs) {
      return obs.update(_this);
    });
    console.log('notify');
  };

  Caisses.prototype.getTransac = function () {
    return this.transactions;
  };

  Caisses.prototype.getSolde = function () {
    return this.solde;
  };

  Caisses.prototype.setSoldeDebit = function (montant) {
    this.solde -= montant;
  };

  Caisses.prototype.setSoldeCredit = function (montant) {
    this.solde += montant;
  };

  return Caisses;
}();

exports.Caisses = Caisses;
},{}],"src/classes/listetransac.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.listeTransac = void 0;

var listeTransac =
/** @class */
function () {
  function listeTransac() {
    this.ul = document.querySelector('.listeOrdonnee');
  }

  listeTransac.prototype.update = function (caisse) {
    var transac = caisse.getTransac();
    var liHtml = document.createElement('li');
    var headHtml = document.createElement('h4');
    var paraHtml = document.createElement('p');
    transac.forEach(function (trsc) {
      liHtml.className = trsc.getType();
      headHtml.innerText = "".concat(trsc.getType() === 'debit' ? 'Debit' : 'Credit');
      paraHtml.innerHTML = trsc.setText();
    });
    this.ul.append(liHtml);
    liHtml.append(headHtml);
    liHtml.append(paraHtml);
  };

  return listeTransac;
}();

exports.listeTransac = listeTransac;
},{}],"src/classes/transaction.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Transaction = void 0;

var Transaction =
/** @class */
function () {
  function Transaction(nomClient, type, montant, motif) {
    this.typeTransac = type;
    this.montantTtransac = montant;
    this.motifTransac = motif;
    this.client = nomClient;
  }

  Transaction.prototype.getNomClient = function () {
    return this.client;
  };

  Transaction.prototype.getType = function () {
    return this.typeTransac;
  };

  Transaction.prototype.getMontant = function () {
    return this.montantTtransac;
  };

  Transaction.prototype.getMotif = function () {
    return this.motifTransac;
  };

  Transaction.prototype.setText = function () {
    return "".concat(this.getMontant(), " a \xE9t\xE9 ").concat(this.getType() === 'debit' ? 'retiré' : 'déposé', " suite a ").concat(this.getMotif());
  };

  return Transaction;
}();

exports.Transaction = Transaction;
},{}],"src/classes/viewEtat.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ViewEtat = void 0;

var ViewEtat =
/** @class */
function () {
  function ViewEtat() {
    this.div = document.querySelector('.etat');
    this.head = document.createElement('h3');
    this.head.innerText = 'Etat'; // this.head.className = 'etatVert';

    this.div.append(this.head);
  }

  ViewEtat.prototype.update = function (caisse) {
    var solde = caisse.getSolde();

    if (solde >= 0) {
      this.head.innerText = 'A couvert';
      this.div.className = 'etatVert';
    } else {
      this.head.innerText = 'A découvert';
      this.div.className = 'etatRouge';
    }
  };

  return ViewEtat;
}();

exports.ViewEtat = ViewEtat;
},{}],"src/classes/viewListClient.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ViewListClient = void 0;

var ViewListClient =
/** @class */
function () {
  function ViewListClient() {
    this.tables = document.querySelector('.table-liste-client');
  } // updateListClient(caisse: Caisses, transaction: Transaction) {
  //     let results = [];
  //     let transactions = caisse.getTransac();
  //     let result = transactions.filter(tr => tr.getNomClient() === transaction.getNomClient());
  //     console.log(result);
  //     if (result.length === 0) {
  //         if(transaction.getType() === 'debit'){
  //             results.push({
  //                 "nomClient": transaction.getNomClient(),
  //                 "typeTransac": transaction.getType(),
  //                 "debitCumulTr": transaction.getMontant(),
  //                 "creditCumulTr": 0
  //             });
  //         }
  //         else{
  //             results.push({
  //                 "nomClient": transaction.getNomClient(),
  //                 "typeTransac": transaction.getType(),
  //                 "debitCumulTr": 0,
  //                 "creditCumulTr": transaction.getMontant()
  //             });
  //         }
  //     }
  //     else {
  //         let idTr = results.findIndex(tr => tr.getNomClient() === transaction.getNomClient());
  //         if (transaction.getType() === 'debit') {
  //             let transacCumul = {
  //                 "nomClient": transaction.getNomClient(),
  //                 "typeTransac": 'debit',
  //                 "debitCumulTr": results[idTr].debitCumulTr + transaction.getMontant(),
  //                 "creditCumulTr": results[idTr].creditCumulTr
  //             }
  //             results.splice(idTr, 1, transacCumul);
  //         }
  //         else {
  //             let transacCumul = {
  //                 "nomClient": transaction.getNomClient(),
  //                 "typeTransac": 'credit',
  //                 "debitCumulTr": results[idTr].debitCumulTr,
  //                 "creditCumulTr": results[idTr].creditCumulTr + transaction.getMontant(),
  //             }
  //             results.splice(idTr, 1, transacCumul);
  //         }
  //     }
  //     console.log(results);
  //     results.forEach(result => {
  //         this.tdClient.innerText = result.nomClient;
  //         this.tdClCredit.innerText =  result.creditCumulTr
  //         this.tdClDebit.innerText = result.debitCumulTr
  //     });
  // }


  ViewListClient.prototype.update = function (caisse) {
    var _this = this;

    this.tr = document.createElement('tr');
    this.tdClCredit = document.createElement('td');
    this.tdClDebit = document.createElement('td');
    this.tdClient = document.createElement('td');
    this.tr.append(this.tdClient, this.tdClDebit, this.tdClCredit);
    this.tables.append(this.tr);
    var transactions = caisse.getTransac();
    var results = [];
    results = transactions.filter(function (tr) {
      return tr.getNomClient() === tr.getNomClient();
    });
    console.log(results);
    transactions.forEach(function (transaction) {
      if (transaction.getType() === 'debit') {
        _this.tdClient.innerText = transaction.getNomClient();
        _this.tdClCredit.innerText = '0';
        _this.tdClDebit.innerText = transaction.getMontant().toString();
      } else {
        _this.tdClient.innerText = transaction.getNomClient();
        _this.tdClCredit.innerText = transaction.getMontant().toString();
        _this.tdClDebit.innerText = '0';
      }
    });
  };

  return ViewListClient;
}();

exports.ViewListClient = ViewListClient;
},{}],"src/classes/viewNbreTransac.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ViewNbreTransac = void 0;

var ViewNbreTransac =
/** @class */
function () {
  function ViewNbreTransac() {
    this.table = document.querySelector('.table-nbr-transac');
    this.tr = document.createElement('tr');
    this.tdDebit = document.createElement('td');
    this.tdCredit = document.createElement('td');
    this.tdCredit.innerText = '0';
    this.tdDebit.innerText = '0';
    this.tr.append(this.tdDebit, this.tdCredit);
    this.table.append(this.tr);
  }

  ViewNbreTransac.prototype.update = function (caisse) {
    var _this = this;

    var transactions = caisse.getTransac();
    var cptDebit = 0;
    var cptCredit = 0;
    transactions.forEach(function (transaction) {
      if (transaction.getType() === 'debit') {
        cptDebit++;
        _this.tdDebit.innerText = cptDebit.toString();
      } else {
        cptCredit++;
        _this.tdCredit.innerText = cptCredit.toString();
      }
    });
  };

  return ViewNbreTransac;
}();

exports.ViewNbreTransac = ViewNbreTransac;
},{}],"src/classes/viewSolde.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ViewSolde = void 0;

var ViewSolde =
/** @class */
function () {
  function ViewSolde() {
    this.div = document.querySelector('.solde');
    this.head = document.createElement('h2');
    this.head.innerText = 'Solde : ';
    this.span = document.createElement('span');
    this.head.append(this.span);
    this.div.append(this.head);
  }

  ViewSolde.prototype.viewSolde = function (caisse, transac) {
    if (transac.getType() === 'debit' && caisse.getSolde() >= transac.getMontant()) {
      caisse.setSoldeDebit(transac.getMontant());
      this.span.innerText = caisse.getSolde().toString();
      console.log("Compte debite de : ".concat(transac.getMontant(), " nouveau solde ").concat(caisse.getSolde()));
    } else if (transac.getType() === 'debit' && caisse.getSolde() <= transac.getMontant()) {
      caisse.setSoldeDebit(transac.getMontant());
      this.span.className = 'soldeDecouver';
      this.span.innerText = caisse.getSolde().toString();
      console.log("Votre solde est inferieur au montant à débiter");
      console.log("Compte debite de : ".concat(transac.getMontant(), " nouveau solde ").concat(caisse.getSolde()));
    } else if (transac.getType() === 'credit') {
      caisse.setSoldeCredit(transac.getMontant());
      this.span.className = 'soldeCouver';
      this.span.innerText = caisse.getSolde().toString();
      console.log("Compte credite de : ".concat(transac.getMontant(), " nouveau solde ").concat(caisse.getSolde()));
    } else {
      console.log("Non pris en compte");
    }
  };

  ViewSolde.prototype.update = function (caisse) {
    this.span.className = 'soldeCouver';
    this.span.innerText = caisse.getSolde().toString();
  };

  return ViewSolde;
}();

exports.ViewSolde = ViewSolde;
},{}],"app.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var caisse_1 = require("./src/classes/caisse");

var listetransac_1 = require("./src/classes/listetransac");

var transaction_1 = require("./src/classes/transaction");

var viewEtat_1 = require("./src/classes/viewEtat");

var viewListClient_1 = require("./src/classes/viewListClient");

var viewNbreTransac_1 = require("./src/classes/viewNbreTransac");

var viewSolde_1 = require("./src/classes/viewSolde");

var form = document.querySelector('#form');
var typeOp = document.querySelector('#typeOperation');
var montant = document.querySelector('#montant');
var motif = document.querySelector('#motif');
var nomClient = document.querySelector('#clientNom'); // let localStore = window.localStorage.account;
// let listForm : object [];
//let maCaisse = new Caisses(100000, []);

var caisse = new caisse_1.Caisses(10000, []);
var viewSolde = new viewSolde_1.ViewSolde();
var viewNbreTransac = new viewNbreTransac_1.ViewNbreTransac();
var viewEtat = new viewEtat_1.ViewEtat();
viewSolde.update(caisse);
form.addEventListener('submit', function (e) {
  e.preventDefault();
  var laTransaction = new transaction_1.Transaction(nomClient.value, typeOp.value, montant.valueAsNumber, motif.value);
  var viewListClient = new viewListClient_1.ViewListClient();
  caisse.addTransac(laTransaction);
  viewListClient.update(caisse);
  var liste1 = new listetransac_1.listeTransac();
  caisse.subscribe(liste1);
  liste1.update(caisse);
  viewSolde.viewSolde(caisse, laTransaction);
  viewNbreTransac.update(caisse);
  viewEtat.update(caisse);
}); // const render = (container : HTMLElement): void => {
//     const li = document.createElement('li');
//     const titreOp = document.createElement('h4');
//     const parag = document.createElement('p');
//     titreOp.innerText = `${typeOp.value} === debit ? Debit : Credit`;
//     parag.innerText = ` `;
// }
},{"./src/classes/caisse":"src/classes/caisse.ts","./src/classes/listetransac":"src/classes/listetransac.ts","./src/classes/transaction":"src/classes/transaction.ts","./src/classes/viewEtat":"src/classes/viewEtat.ts","./src/classes/viewListClient":"src/classes/viewListClient.ts","./src/classes/viewNbreTransac":"src/classes/viewNbreTransac.ts","./src/classes/viewSolde":"src/classes/viewSolde.ts"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "52590" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","app.ts"], null)
//# sourceMappingURL=/app.c61986b1.js.map