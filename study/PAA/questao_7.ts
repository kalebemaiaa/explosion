/*
    7. Dada uma lista de inteiros A de tamanho n e um numero x, projete um 
    algoritmo que encontre os k elementos mais proximos de x na lista, em ordem
    crescente de proximidade. O algoritmo deve ter complexidade O(n log k) no 
    pior caso.
*/

import { quickSelect } from "./quickSelect";

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

const get_proximos_v2 = (A:number[], x:number, k:number) => {
    const distances:any[] = [];
    A.forEach(v => distances.push({"distance": Math.abs(v - x), "valor": v}));
    const re = quickSelect(distances, 0, distances.length - 1, k, (a:{"distance":number, "valor":number}, b:{"distance":number, "valor":number}) => a.distance - b.distance)
    console.log(re)
}

console.log(get_proximos([-4, 123, 0, 52,25, 5], 5, 4))
get_proximos_v2([-4, 123, 0, 52,25, 5], 5, 2)
