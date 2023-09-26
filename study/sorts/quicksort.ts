function partition<T>(A:T[], left:number, right:number, callback: (a: any, b: any) => number) {
    const swap = (a:number, b:number) => {[A[a], A[b]] = [A[b], A[a]];}
    
    const pivo = A[right - 1]
    for(let i = left; i < right; i++) {
        if(callback(A[i],pivo) > 0) {
            swap(left, i);
            left++;
        }
    }

    // swap(left, i);
    return left - 1;
}

export function quickSort<T>(A:T[], callback: (a:any, b:any) => number, low?:number, high?:number) {
    low = low ? low : 0;
    high = high? high : A.length - 1;
    
    if (low < high) {
        const pivot = partition(A, low, high, callback);
        quickSort(A, callback, low, pivot - 1)
        quickSort(A, callback, pivot + 1, high);
    }

    return A;
}

console.log(quickSort([10,2,5,4,152,30,56,40], (a, b) => a - b));