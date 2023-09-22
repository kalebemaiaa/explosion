/*
    7. Dada uma lista de inteiros A de tamanho n e um numero ´ x, projete um 
    algoritmo que encontre os k elementos mais proximos de ´ x na lista, em ordem
    crescente de proximidade. O algoritmo deve ter complexidade O(n log k) no 
    pior caso.
*/

const get_proximos = (A:number[], x:number, k:number) => {
    const n = A.length;
    if(k > n) return [];
    if(k == n) return A;
    const arr: (number|null)[] = [];
    for (let i = 0; i < k; i++) {
        arr.push(null);
    }
    A.forEach(v => {
        let maisProvavel: number = -1;
        for(let i = 0; i < k; i++) {
            const valorPassado  = arr[i];
            if(valorPassado == null){ 
                arr[i] = v;
                return;
            }
            const difAtual = Math.abs(v - x), difPassada = Math.abs(valorPassado - x);

            if(difAtual >= difPassada) continue;
            if(maisProvavel == -1) {
                maisProvavel = i;
                continue;
            }
            if(difAtual < Math.abs(x - A[maisProvavel])) {
                if(v== 0) console.log(arr);
                maisProvavel = i;
            }
        }
        if(maisProvavel == -1) return;
        arr[maisProvavel] = v;
        /*
            PROBLEMA:: ESTA SUBSTITUINDO SÓ UMA VEZ
            ANTES DE SUBSTITUIR NO ARRAY (arr[maisProvavel] = v;)
            FZR UM arr.map e ver qual tem a maior distancia em relação ao x;
        */
    })
    return arr;
}


console.log(get_proximos([-4, 123, 0, 52,25, 5], 5, 2))
