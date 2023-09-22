import { mergeSort } from "../sorts/mergesort";
import { h_node } from "./hashImplementation";

function get_goodPivot<T>(A:T[], callback: (a: any, b: any) => number):[T, number] {
    const medians = [];
    for(let i = 0; i < A.length; i+=5) {
        const list_sorted = mergeSort(A.slice(i, i+5), callback);

        // console.log("MINHA LISTA _> ", list_sorted)
        //console.log("MINHA MEDIANA -> ", list_sorted[Math.floor(list_sorted.length/2)])
        
        // funciona para impares; no caso par, pega o de cima;
        medians.push(list_sorted[Math.floor(list_sorted.length/2)]);
    }

    const medians_sorted = mergeSort(medians, callback);
    const good_pivot = medians_sorted[Math.floor(medians_sorted.length/2)];
    return [good_pivot, A.indexOf(good_pivot)];
}

function partition<T>(A:T[], left:number, right:number, callback: (a: any, b: any) => number) {
    const swap = (a:number, b:number) => {
        [A[a], A[b]] = [A[b], A[a]];
    }
    if(left == right) return left;
    const pivot = get_goodPivot(A, callback);
    let i = right + 1;
    for(let j = right; j >= left; j--){
        if(callback(A[j], pivot[0]) > 0){
            swap(j, --i);
        }
    }
    swap(pivot[1], --i);
    return i;
}

export function quickSelect<T>(A: T[],low:number,high:number, k: number, callback: (a: any, b: any) => number) {
    const idxPivot = partition(A, low, high, callback);
    // console.log(A.slice(low, high + 1), k, idxPivot)
    if(k == idxPivot) return A[k];
    if(idxPivot < k) return quickSelect(A, idxPivot + 1, high, k, callback);
    return quickSelect(A, low, high - 1, k, callback);
}