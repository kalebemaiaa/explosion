/*
    6. Dada uma arvore bin ´ aria de busca (BST) ´ T com nos contendo n ´ umeros ´
    inteiros e um inteiro x, projete um algoritmo que encontre um par de nos, ´
    um da subarvore esquerda e outro da sub ´ arvore direita da raiz, cuja soma ´
    seja igual a x. O algoritmo deve ter complexidade O(n) no pior caso.
*/
import { binaryTreeSearch, node } from "../dataStructures/binaryTree";
import { HashTable } from "../dataStructures/hash";

const get_pair = (T: binaryTreeSearch, x: number) => {
    let A: number[] = T.bts2array(T.getRoot()?.rightNode);
    if (!A) return [];

    const hashTable_A = new HashTable(A.length);
    A.forEach(v => hashTable_A.insert(v));

    let retorno: (number[]|undefined)[] = [];

    // percorre a arvore da esquerda O(n)
    const auxiliarSearch = (noh: node) => {
        if(!noh) return;
        auxiliarSearch(noh.leftNode);
        const v = noh.key;

        if(x < v + T.getRoot()!.key) return;
        const idxComplemento = hashTable_A.search(x - v);

        if (idxComplemento != -1) {
            const complemento = hashTable_A.getTable()[idxComplemento];
            retorno.push(complemento!.key != v ? [v, complemento!.key] : complemento!.frequency > 1 ? [v, complemento!.key] : undefined);
        }
        auxiliarSearch(noh.rightNode);
    }
    
    auxiliarSearch(T.getRoot());
    return retorno.filter(v => v != undefined);
}

// const bts = new binaryTreeSearch();
// bts.insert(10);
// bts.insert(15);
// bts.insert(7);
// bts.insert(5);
// bts.insert(9);
// bts.insert(13);

// bts.printTreeInorder();
// console.log(get_pair(bts, 22))