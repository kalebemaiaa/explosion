/*
    7. Dada uma lista de inteiros A de tamanho n e um numero ´ x, projete um 
    algoritmo que encontre os k elementos mais proximos de ´ x na lista, em ordem
    crescente de proximidade. O algoritmo deve ter complexidade O(n log k) no 
    pior caso.
*/

const get_proximos = (A:number[], x:number, k:number) => {
    const n = A.length;
    if(k > n || k == 0) return [];
    if(k == n) return A;
    const arr: number[] = [];
    for (let i = 0; i < k; i++) {
        arr.push(A[i]);
    }

    const get_maxIdx = ():number => {
        let mIdx = 0;
        for(let i = 1; i < k; i++){
            if(Math.abs(arr[i] - x) > Math.abs(arr[mIdx] - x))
                mIdx = i;
        }
        return mIdx;
    }
    
    for(let i = k; i < n; i++) {
        const maxIdx = get_maxIdx();
        if(Math.abs(A[i] - x) < Math.abs(arr[maxIdx] - x))
            arr[maxIdx] = A[i];
    }
    
    return arr;
}


console.log(get_proximos([-4, 123, 0, 52,25, 5], 5, 4))
