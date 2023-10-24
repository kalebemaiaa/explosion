"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
    10. Dada uma lista de inteiros A de tamanho n um numero ´ x maior que zero,
    projete um algoritmo que retorne a lista B com o maior numero de elementos ´
    de A cuja maior diferenc¸a entre dois elementos de B seja menor ou igual a
    x. O algoritmo deve ter complexidade O(n log n) no pior caso.
*/
var mergesort_1 = require("../sorts/mergesort");
var get_list = function (A, x) {
    var n = A.length;
    if (n == 0)
        return [];
    if (n == 1)
        return A;
    var A_ordenado = (0, mergesort_1.mergeSort)(A, function (a, b) { return a - b; });
    var maxSize = 0, j = 0, startIndex = 0;
    for (var i = 0; i < n; i++) {
        while (j < n && A_ordenado[j] - A_ordenado[i] <= x) {
            j++;
        }
        var sizeAtual = j - i;
        if (sizeAtual > maxSize) {
            maxSize = sizeAtual;
            startIndex = i;
        }
        if (j == n)
            break;
    }
    return A_ordenado.slice(startIndex, startIndex + maxSize);
};
console.log(get_list([1, 2, 3, 4, 4, 5, 5, 5, 5, 7, 10], 3));
