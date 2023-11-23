/*
    5. Dada uma sequencia A ordenada com n elementos distintos e um inteiro k,
    escreva um algoritmo que retorne um par de elementos distintos de A cuja
    soma e k, ou informe caso nao exista. O algoritmo deve ter complexidade ˜
    O(n) no pior caso.
*/
import { HashTable } from "../../dataStructures/hash";

const get_pair_vetor = (A: number[], k: number) => {
    const hashTable = new HashTable(A.length);
    A.forEach(v => hashTable.insert(v));

    const R = A
        .map(value => {
            const idxComplemento = hashTable.search(k - value);

            if (idxComplemento != -1) {
                const complemento = hashTable.getTable()[idxComplemento];
                return complemento!.key != value
                    ? [value, complemento!.key]
                    : complemento!.frequency > 1
                        ? [value, complemento!.key]
                        : undefined;
            }
        })
        .filter(v => v != undefined)
    if (R.length == 0)
        console.log(`Não houve nenhum par de elementos da lista cuja soma fosse ${k}!`);
    return R
}

get_pair_vetor([1], 0)