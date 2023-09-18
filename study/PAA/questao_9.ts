/*
    9. Dada uma lista de inteiros A de tamanho n e uma lista B que contem´ m
    listas com k inteiros cada, projete um algoritmo que retorne a lista C com as
    listas de B nas quais todos seus elementos estao presentes em ˜ A ou que
    nao possuem nenhum elemento em ˜ A. O algoritmo deve ter complexidade
    O(n + m · k) no pior caso.
*/
import HashTable from "./hashImplementation";

const get_elements = (A: number[], B: number[][]): number[][] => {
    const n: number = A.length;
    const m: number = B.length;

    // B vazio
    if (m == 0) return B;

    const k: number = B[0].length;
    // B so tem vetores vazios
    if (k == 0) return [];

    if (!B.every(v => v.length === k)) {
        console.log("As listas de B possuem tamanhos diferentes!");
        return [];
    }

    if (k == 1) return B;

    const hashTable: HashTable = new HashTable(n);
    A.forEach(v => hashTable.insert(v));

    let C: number[][] = [];

    for (let i = 0; i < m; i++) {
        let wasIn: boolean = false;
        let insert: boolean = true;

        for (let j = 0; j < k; j++) {
            // não foi achado em A
            if (hashTable.search(B[i][j]) == -1) {
                // nunca foi achado um elemento entao continua
                if (!wasIn) continue;
                // antes tinha um elemento que pertencia a A (sai do loop)
                insert = false;
                break;
            }
            // achou e nao foi o primeiro
            if (j != 0) {
                // antes ja estava entao continua
                if (wasIn) continue;
                // nenhum pertencia e agora pertence (sai do loop)
                insert = false;
                break;
            }
            wasIn = true;
        }

        if (!insert) continue;
        C.push(B[i]);
    }

    return C;
}