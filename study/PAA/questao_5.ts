/*
    5. Dada uma sequencia A ordenada com n elementos distintos e um inteiro k,
    escreva um algoritmo que retorne um par de elementos distintos de A cuja
    soma e k, ou informe caso nao exista. O algoritmo deve ter complexidade ˜
    O(n) no pior caso.
*/
import {HashTable} from "./hashImplementation";

const get_pair = (A: number[], k: number) => {
    const hashTable = new HashTable(A.length);
    A.forEach(value => hashTable.insert(value));

    const R = A
        .map(value => {
            const idxComplemento = hashTable.search(k - value);

            if (idxComplemento != -1) {
                const complemento = hashTable.getTable()[idxComplemento];
                return complemento!.key != value ? [value, complemento!.key] : complemento!.frequency > 1 ? [value, complemento!.key] : undefined;
            }
        })
        .filter(v => v != undefined);

    // Caso fosse para retorna o primeiro par, seria R[0]
    if (R.length != 0) return R;
    console.log(`Não houve nenhum par de elementos da lsita cuja soma fosse ${k}!`);
}