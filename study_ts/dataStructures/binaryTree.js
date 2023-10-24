"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BinaryTreeSearch = void 0;
var BinaryTreeSearch = /** @class */ (function () {
    function BinaryTreeSearch(n) {
        this.root = null;
        if (n)
            this.root = this.createNode(n);
    }
    BinaryTreeSearch.prototype.createNode = function (n) {
        return { key: n, leftNode: null, rightNode: null };
    };
    BinaryTreeSearch.prototype.insert = function (n) {
        var newNode = this.createNode(n);
        var x = this.root;
        var y = null;
        while (x != null) {
            y = x;
            x = n < x.key ? x.leftNode : x.rightNode;
        }
        if (!y)
            this.root = newNode;
        else if (n < y.key)
            y.leftNode = newNode;
        else
            y.rightNode = newNode;
        return newNode;
    };
    BinaryTreeSearch.prototype.auxiliarPrintTree = function (noh, tabs, direction) {
        if (tabs === void 0) { tabs = 0; }
        if (direction === void 0) { direction = 0; }
        var printGalho = function (noh) {
            var s = [];
            var begin = direction == 0 ? "|" : direction == -1 ? "/" : "\\";
            for (var i = 0; i < tabs; i++) {
                if (i != tabs - 1)
                    s.push("\t");
                else
                    s.push("".concat(begin).concat(begin, "==="));
            }
            if (!noh)
                console.log("".concat(s.join(""), " X"));
            else
                console.log("".concat(s.join(""), " ").concat(noh.key));
        };
        if (noh == null) {
            printGalho(noh);
            return;
        }
        this.auxiliarPrintTree(noh.leftNode, tabs + 1, -1);
        printGalho(noh);
        this.auxiliarPrintTree(noh.rightNode, tabs + 1, 1);
    };
    BinaryTreeSearch.prototype.bts2array = function (noh) {
        var btsArray = [];
        var auxiliarToArray = function (noh) {
            if (!noh)
                return;
            auxiliarToArray(noh.leftNode);
            btsArray.push(noh);
            auxiliarToArray(noh.rightNode);
        };
        auxiliarToArray(noh ? noh : this.root);
        return btsArray;
    };
    BinaryTreeSearch.prototype.printTreeInorder = function () {
        this.auxiliarPrintTree(this.root);
    };
    BinaryTreeSearch.prototype.getRoot = function () {
        return this.root;
    };
    return BinaryTreeSearch;
}());
exports.BinaryTreeSearch = BinaryTreeSearch;
