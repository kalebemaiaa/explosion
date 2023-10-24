"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.quickSort = void 0;
function partition(A, left, right, callback) {
    var swap = function (a, b) {
        var _a;
        _a = [A[b], A[a]], A[a] = _a[0], A[b] = _a[1];
    };
    var pivo = A[right - 1];
    for (var i = left; i < right; i++) {
        if (callback(A[i], pivo) > 0) {
            console.log("DJAISDJISD");
            swap(left, i);
            left++;
        }
    }
    // swap(left, i);
    return left - 1;
}
function quickSort(A, callback, low, high) {
    low = low ? low : 0;
    high = high ? high : A.length - 1;
    if (low < high) {
        var pivot = partition(A, low, high, callback);
        quickSort(A, callback, low, pivot - 1);
        quickSort(A, callback, pivot + 1, high);
    }
    return A;
}
exports.quickSort = quickSort;
console.log(quickSort([10, 2, 5, 4, 152, 30, 56, 40], function (a, b) { return a - b; }));
