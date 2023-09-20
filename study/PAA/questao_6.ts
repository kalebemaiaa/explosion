/*
    6. Dada uma arvore bin ´ aria de busca (BST) ´ T com nos contendo n ´ umeros ´
    inteiros e um inteiro x, projete um algoritmo que encontre um par de nos, ´
    um da subarvore esquerda e outro da sub ´ arvore direita da raiz, cuja soma ´
    seja igual a x. O algoritmo deve ter complexidade O(n) no pior caso.
*/
import { binaryTreeSearch } from "./binaryTreeImplementation";
import { HashTable } from "./hashImplementation";

const get_pair = (T: binaryTreeSearch, x: number) => {
    /*
        ter uma função que transforma uma arvore em um array e aplicar a questão 5.
    */
    let A: number[] = T.bts2array(T.getRoot()?.leftNode);
    let B: number[] = T.bts2array(T.getRoot()?.rightNode);

    if (!B || !A) return [];

    const hashTable_B = new HashTable(B.length);
    B.forEach(v => hashTable_B.insert(v));

    return A
        .map(v => {
            if(x < v + T.getRoot()!.key) return;
            const idxComplemento = hashTable_B.search(x - v);

            if (idxComplemento != -1) {
                const complemento = hashTable_B.getTable()[idxComplemento];
                return complemento!.key != v ? [v, complemento!.key] : complemento!.frequency > 1 ? [v, complemento!.key] : undefined;
            }
        })
        .filter(v => v != undefined);
}

// const bts = new binaryTreeSearch();
// bts.insert(10);
// bts.insert(15);
// bts.insert(7);
// bts.insert(5);
// bts.insert(9);
// bts.insert(13);

// bts.printTreeInorder();
// console.log(get_pair(bts, 18))