/*
    8. Dados dois arrays de inteiros A e B de mesmo tamanho n, projete um algoritmo 
    que encontre o par de elementos (a, b) onde a ∈ A e b ∈ B, de modo que a distancia 
    entre ˆ a e b seja m´ınima. O algoritmo deve ter complexidade O(n log n) no pior caso.
*/
import { mergeSort } from "../../sorts/mergesort";

const get_min_distance = (A: number[], B: number[]):
    [number, number] | null => {
    const A_ordenado = mergeSort(A, (a: number, b: number) => a - b);
    const B_ordenado = mergeSort(B, (a: number, b: number) => a - b);

    const n = A.length;
    if (n != B.length || n == 0) {
        console.log("Tamanhos de listas diferentes!");
        return null;
    }

    let pair: [number, number] = [A[0], B[0]];
    let i = 0, j = 0;
    while (j < n && i < n) {
        // distancia = 0
        console.log(A_ordenado[i], B_ordenado[j])
        if (A_ordenado[i] == B_ordenado[j])
            return [A_ordenado[i], B_ordenado[j]];

        const dist_pair = Math.abs(pair[0] - pair[1]);

        if (A_ordenado[i] > B_ordenado[j]) {
            if (Math.abs(A_ordenado[i] - B_ordenado[j++]) < dist_pair)
                pair[1] = B_ordenado[j];
        }
        else {
            if (Math.abs(A_ordenado[i++] - B_ordenado[j]) < dist_pair)
                pair[0] = A_ordenado[i];
        }
    }

    return pair;
}

console.log(get_min_distance([5,1,2,3,4],[10,-2,-6,-7,16]))