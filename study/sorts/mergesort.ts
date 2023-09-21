function merge<T>(array1: T[], array2: T[], callback: (a:any, b:any) => number):T[] {
    let i:number = 0, j:number = 0;
    const len1 = array1.length, len2 = array2.length;
    const A:T[] = [];

    while(i < len1 && j < len2) {
        if(callback(array1[i], array2[j]) > 0)  A.push(array2[j++]);
        else A.push(array1[i++]);
    }

    while(i < len1) A.push(array1[i++]);
    while(j < len2) A.push(array2[j++]);
    
    return A;
}

export function mergeSort<T>(arr:T[], callback: (a:any, b:any) => number):T[] {
    const len = arr.length;
    if(len == 0) return [];
    if(len == 1) return arr;

    const mid = len % 2 == 0? len/2 : (len + 1) / 2;
    
    const arrL = mergeSort(arr.slice(0, mid), callback);
    const arrR = mergeSort(arr.slice(mid, len), callback);

    return merge(arrL, arrR, callback);
}