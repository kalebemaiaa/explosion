const get_mediana = () => {
    // usar mergeSort;
}

function partition<T>(A:T[], left:number, right:number, callback: (a: any, b: any) => number) {
    const swap = (a:number, b:number) => {
        [A[a], A[b]] = [A[b], A[a]];
    }
    const pivot = A[left];
    let i = right + 1;
    for(let j = right; j > left; j--){
        // console.log(A, j, A.length, pivot);
        if(callback(A[j], pivot) > 0){
            swap(j, --i);
        }
    }
    swap(left, --i);
    return i;
}

export function quickSelect<T>(A: T[],low:number,high:number, k: number, callback: (a: any, b: any) => number) {
    const idxPivot = partition(A, low, high, callback);
    if(k == idxPivot) return A[k];
    if(idxPivot < k) return quickSelect(A, idxPivot + 1, high, k, callback);
    return quickSelect(A, low, high - 1, k, callback);
}