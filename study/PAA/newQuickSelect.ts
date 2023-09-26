import { mergeSort } from "../sorts/mergesort";

function get_goodPivot<T>(A:T[], callback: (a: any, b: any) => number):[T, number] {
    const medians = [];
    for(let i = 0; i < A.length; i+=5) {
        const list_sorted = mergeSort(A.slice(i, i+5), callback);
        
        // funciona para impares; no caso par, pega o de cima;
        medians.push(list_sorted[Math.floor(list_sorted.length/2)]);
    }

    const medians_sorted = mergeSort(medians, callback);
    const good_pivot = medians_sorted[Math.floor(medians_sorted.length/2)];
    return [good_pivot, A.indexOf(good_pivot)];
}

function partition<T>(A:T[], callback:(a:any, b:any) => number):number {
    const swap = (a:number, b:number) => {[A[a], A[b]] = [A[b], A[a]];}
    const [pivot, idxPivot] = get_goodPivot(A, callback);
    const n = A.length;
    swap(idxPivot, n - 1);

    let i = 0;
    for (let j = 0; j < n; j++) {
        if (callback(pivot, A[j]) > 0) {
            swap(i, j);
            i++;
        }
    }
    swap(i, n - 1);
    return i;
}

function quickSelect<T>(A:T[], k:number, callback: (a:any, b:any) => number){
    if(k <= 0 || k > A.length) return -1
    const idxPartition = partition(A, callback);
    if(idxPartition == k - 1) return A[idxPartition];
    if(idxPartition > k - 1) return quickSelect(A.slice(0, idxPartition), k, callback);
    return quickSelect(A.slice(idxPartition+1), k - idxPartition - 1, callback)
}

console.log(quickSelect([1,10,5,3,8,7], 5, (a, b) => b - a));