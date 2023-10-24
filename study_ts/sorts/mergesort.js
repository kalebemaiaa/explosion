"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergeSort = void 0;
function merge(array1, array2, callback) {
    var i = 0, j = 0;
    var len1 = array1.length, len2 = array2.length;
    var A = [];
    while (i < len1 && j < len2) {
        if (callback(array1[i], array2[j]) > 0)
            A.push(array2[j++]);
        else
            A.push(array1[i++]);
    }
    while (i < len1)
        A.push(array1[i++]);
    while (j < len2)
        A.push(array2[j++]);
    return A;
}
function mergeSort(arr, callback) {
    var len = arr.length;
    if (len == 0)
        return [];
    if (len == 1)
        return arr;
    var mid = len % 2 == 0 ? len / 2 : (len + 1) / 2;
    var arrL = mergeSort(arr.slice(0, mid), callback);
    var arrR = mergeSort(arr.slice(mid, len), callback);
    return merge(arrL, arrR, callback);
}
exports.mergeSort = mergeSort;
