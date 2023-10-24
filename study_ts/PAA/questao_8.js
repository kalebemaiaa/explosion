"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
    8. Dados dois arrays de inteiros A e B de mesmo tamanho n, projete um algoritmo
    que encontre o par de elementos (a, b) onde a ∈ A e b ∈ B, de modo que a distancia
    entre ˆ a e b seja m´ınima. O algoritmo deve ter complexidade O(n log n) no pior caso.
*/
var mergesort_1 = require("../sorts/mergesort");
var get_min_distance = function (A, B) {
    var A_ordenado = (0, mergesort_1.mergeSort)(A, function (a, b) { return a - b; });
    var B_ordenado = (0, mergesort_1.mergeSort)(B, function (a, b) { return a - b; });
    var n = A.length;
    if (n != B.length || n == 0) {
        console.log("Tamanhos de listas diferentes!");
        return null;
    }
    var pair = [A[0], B[0]];
    var i = 0, j = 0;
    while (j < n && i < n) {
        // distancia = 0
        console.log(A_ordenado[i], B_ordenado[j]);
        if (A_ordenado[i] == B_ordenado[j])
            return [A_ordenado[i], B_ordenado[j]];
        var dist_pair = Math.abs(pair[0] - pair[1]);
        if (A_ordenado[i] > B_ordenado[j]) {
            if (Math.abs(A_ordenado[i] - B_ordenado[j++]) < dist_pair)
                pair[1] = B_ordenado[j];
        }
        else {
            if (Math.abs(A_ordenado[i++] - B_ordenado[j]) < dist_pair)
                pair[0] = A_ordenado[i];
        }
    }
    // while(i < n) {
    //     const dist_pair = Math.abs(pair[0] - pair[1]);
    //     if (Math.abs(A_ordenado[i] - pair[1]) < dist_pair)
    //         pair[0] = A_ordenado[i];
    //     i++;
    // }
    // while(j < n) {
    //     const dist_pair = Math.abs(pair[0] - pair[1]);
    //     if (Math.abs(B_ordenado[j] - pair[0]) < dist_pair)
    //         pair[1] = B_ordenado[j];
    //     j++;
    // }
    return pair;
};
console.log(get_min_distance([5, 1, 2, 3, 4], [10, -2, -6, -7, 16]));
