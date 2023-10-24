"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HashTable = void 0;
var HashTable = /** @class */ (function () {
    function HashTable(tamanho) {
        this.tamanho = 0;
        this.data = [];
        this.loadFactor = 0;
        this.tamanho = tamanho;
        this.hashKey = this.make_hashKey(tamanho);
        this.data = [];
        for (var i = 0; i < tamanho; i++) {
            this.data[i] = null;
        }
    }
    HashTable.prototype.make_hashKey = function (n) {
        var get_primo = function (n) {
            // n = 1 retorna 1;
            if (n == 1)
                return n;
            var is_primo = function (k) {
                if (k == 1 || k % 2 == 0)
                    return false;
                for (var i = 3; i < k / 2; i += 2) {
                    if (k % i == 0)
                        return false;
                }
                return true;
            };
            while (!is_primo(n)) {
                n++;
            }
            return n;
        };
        return get_primo(n);
    };
    HashTable.prototype.resize = function () {
        var _this = this;
        var newData = [];
        var newTamanho = Math.ceil(this.loadFactor * this.tamanho * 2);
        this.hashKey = this.make_hashKey(newTamanho);
        for (var i = 0; i < newTamanho; i++) {
            newData[i] = null;
        }
        this.data
            .forEach(function (v) {
            if (!v)
                return;
            var count = 0;
            while (count < newTamanho) {
                var index = _this.hash(v.key + count++);
                var cur = newData[index];
                // não tem nada na posição || tem mas foi removido, então add e sai;
                if (!cur || cur.removed) {
                    newData[index] = v;
                    break;
                }
                // tem algo e é diferente, então procuramos outra posição
                if (cur.key != v.key)
                    continue;
            }
        });
        this.tamanho = newTamanho;
        this.loadFactor = newData.filter(function (v) { return v != null; }).length / newData.length;
        this.data = newData;
    };
    HashTable.prototype.hash = function (data) {
        return data % this.hashKey;
    };
    HashTable.prototype.insert = function (value, optionalObject) {
        var count = 0;
        var newElement = __assign({ key: value, removed: false, frequency: 1 }, optionalObject);
        while (count < this.tamanho) {
            var index = this.hash(value + count++) % this.tamanho;
            var cur = this.data[index];
            // não tem nada na posição || tem mas foi removido, então add e sai;
            if (!cur || cur.removed) {
                this.data[index] = newElement;
                this.loadFactor = this.loadFactor + 1 / this.tamanho;
                break;
            }
            // tem algo e é diferente, então procuramos outra posição
            if (cur.key != value)
                continue;
            // tem algo e é igual
            this.data[index].frequency++;
            break;
        }
        if (this.loadFactor > 0.7)
            this.resize();
        if (count > this.tamanho)
            console.log("Error:\n\t-Lista cheia e erro no resize, ".concat(value, " n\u00E3o foi inserido!"));
    };
    HashTable.prototype.search = function (value) {
        var count = 0;
        while (count < this.tamanho) {
            var index = this.hash(value + count++) % this.tamanho;
            var cur = this.data[index];
            if (!cur)
                return -1;
            if (cur.key != value || cur.removed)
                continue;
            return index;
        }
        console.log("".concat(value, " n\u00E3o foi encontrado na lista!"));
        return -1;
    };
    HashTable.prototype.remove = function (value) {
        var index = this.search(value);
        if (index == -1)
            return false;
        this.data[index].removed = true;
        return true;
    };
    HashTable.prototype.printTable = function () {
        console.log(this.data);
    };
    HashTable.prototype.getTable = function () {
        return this.data;
    };
    HashTable.prototype.getSize = function () {
        return this.tamanho;
    };
    HashTable.prototype.getHashKey = function () {
        return this.hashKey;
    };
    HashTable.prototype.getLoadFactor = function () {
        return this.loadFactor;
    };
    return HashTable;
}());
exports.HashTable = HashTable;
