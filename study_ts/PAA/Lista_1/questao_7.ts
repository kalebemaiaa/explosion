/*
    7. Dada uma lista de inteiros A de tamanho n e um numero x, projete um 
    algoritmo que encontre os k elementos mais proximos de x na lista, em ordem
    crescente de proximidade. O algoritmo deve ter complexidade O(n log k) no 
    pior caso.
*/
import { mergeSort } from "../../sorts/mergesort";
import { quickSelect } from "./newQuickSelect";

const get_nearest = (A: number[], x: number, k: number) => {
    const distances: {
        "distance": number,
        "valor": number
    }[] = [];

    A.forEach(v => distances.push({
        "distance": Math.abs(v - x),
        "valor": v
    }));

    /*
        Caso k == n, então temos que n log k = n log n;
        Então basta ordenar pela distancia;
    */
    if (k == A.length)
        return mergeSort(distances, (a, b) => a.distance - b.distance)
            .map(v => v.valor);

    /*            
        quickselect o menor elemento e retorna a A alterada;
        Sabemos q todos elementos na esquerda sao menores, 
        entao basta ordena-los por distancia;
    */
    const [A_alterado, idxKesimo] = quickSelect(distances, k,
        (a, b) => b.distance - a.distance);

    return mergeSort(A_alterado.slice(0, idxKesimo + 1),
        (a, b) => a.distance - b.distance).map((v: any) => v.valor);
}

console.log(get_nearest([-4, 123, 0, 52, 25, 5, 22, 35, 2, -15, 105, 504], 5, 1))