/*
    10. Dada uma lista de inteiros A de tamanho n um numero ´ x maior que zero,
    projete um algoritmo que retorne a lista B com o maior numero de elementos ´
    de A cuja maior diferenc¸a entre dois elementos de B seja menor ou igual a
    x. O algoritmo deve ter complexidade O(n log n) no pior caso.
*/
import { mergeSort } from "../../sorts/mergesort";

const get_list = (A: number[], x: number): number[] => {
    const n = A.length;
    if (n == 0) return [];
    if (n == 1) return A;

    const A_ordenado = mergeSort(A, (a: number, b: number) => a - b);
    let maxSize = 0, j = 0, startIndex = 0;

    for(let i = 0; i < n; i++) {
        while(j < n && A_ordenado[j] - A_ordenado[i] <= x) {
            j++;
        }

        const sizeAtual = j - i;

        if(sizeAtual > maxSize) {
            maxSize = sizeAtual;
            startIndex = i;
        }
        if(j == n) break;
    }

    return A_ordenado.slice(startIndex, startIndex + maxSize);
}


console.log(get_list([1,2,3,4,4,5,5,5,5,7,10], 3));