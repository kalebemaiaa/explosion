import { mergeSort } from "../sorts/mergesort";

function get_goodPivot<T>(A: T[],
    callback: (a: any, b: any) => number): T {
    const medians = [];
    for (let i = 0; i < A.length; i += 5) {
        const list_sorted = mergeSort(A.slice(i, i + 5), callback);

        // funciona para impares; no caso par, pega o de cima;
        medians.push(list_sorted[Math.floor(list_sorted.length / 2)]);
    }

    const medians_sorted = mergeSort(medians, callback);
    const good_pivot = medians_sorted[Math.floor(medians_sorted.length / 2)];
    return good_pivot;
}

function partition<T>(A: T[], low: number, high: number,
    callback: (a: any, b: any) => number): number {
    const swap = (a: number, b: number) => { [A[a], A[b]] = [A[b], A[a]]; }
    const pivot = get_goodPivot(A.slice(low, high + 1), callback);
    const idxPivot = A.indexOf(pivot);

    swap(idxPivot, high);

    let i = low;
    for (let j = low; j < high; j++) {
        if (callback(A[j], pivot) > 0) {
            swap(i, j);
            i++;
        }
    }
    swap(i, high);

    return i;
}

export function quickSelect<T>(A: T[], k: number,
    callback: (a: any, b: any) => number): [T[], number] {
    let low = 0, high = A.length - 1;

    if (k > high || k < 1 || high == 0) return [A, -1];

    while (low <= high) {
        const idxPartition = partition(A, low, high, callback);
        // console.log(A);
        if (idxPartition == k - 1)
            return [A, idxPartition];
        if (idxPartition > k - 1)
            high = idxPartition - 1;
        else
            low = idxPartition + 1;
    }

    return [A, -1];
}
