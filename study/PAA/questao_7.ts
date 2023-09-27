/*
    7. Dada uma lista de inteiros A de tamanho n e um numero x, projete um 
    algoritmo que encontre os k elementos mais proximos de x na lista, em ordem
    crescente de proximidade. O algoritmo deve ter complexidade O(n log k) no 
    pior caso.
*/
import { mergeSort } from "../sorts/mergesort";
import { quickSelect } from "./newQuickSelect";

const get_proximos_v2 = (A:number[], x:number, k:number) => {
    const distances:any[] = [];
    A.forEach(v => distances.push({"distance": Math.abs(v - x), "valor": v}));
    // pediu os elementos ordenado por distancia, logo temos que n log k = n log n;
    if(k == A.length) return mergeSort(distances, (a, b) => a.distance - b.distance).map(v => v.valor);

    // quickselect o menor elemento;
    const re = quickSelect(distances, k, (a, b) => a.distance - b.distance, distances);
    if(re == -1) return [];
    re[1].push(re[0]);
    return k == 1 ?[re[0].valor] :mergeSort(re[1].length == k ?re[1] :re[1].slice(0,k), (a, b) => a.distance - b.distance).map((v:any) => v.valor);
}

// for(let i = 0; i < 8; i++) {
//     console.log(get_proximos_v2([-4, 123, 0, 52,25, 5], 5, i))
// }
console.log(get_proximos_v2([-4, 123, 0, 52,25, 5], 5, 5))

/* 
    nao funciona para o caso 5 porque o resto ta ficando a direito
    mudar o quick select para fazer funcionar aqui;
    verificar a questao 4;
*/