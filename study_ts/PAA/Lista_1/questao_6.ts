/*
    6. Dada uma arvore bin ´ aria de busca (BST) ´ T com nos contendo n ´ umeros ´
    inteiros e um inteiro x, projete um algoritmo que encontre um par de nos, ´
    um da subarvore esquerda e outro da sub ´ arvore direita da raiz, cuja soma ´
    seja igual a x. O algoritmo deve ter complexidade O(n) no pior caso.
*/
import { BinaryTreeSearch, node } from "../../dataStructures/binaryTree";
import { HashTable } from "../../dataStructures/hash";

const get_pair_tree = (T: BinaryTreeSearch, x: number) => {
    let A = T.bts2array(T.getRoot()?.rightNode);
    if (!A || !T.getRoot()?.leftNode) return [];

    const hashTable_A = new HashTable(A.length);
    A.forEach(v => hashTable_A.insert(v.key, v));
    let retorno: any[] = [];

    const table = hashTable_A.getTable();

    // percorre a arvore da esquerda O(n)
    const auxiliarSearch = (noh: node) => {
        if (!noh) return;
        auxiliarSearch(noh.leftNode);
        const v = noh.key;

        if (x < v + T.getRoot()!.key) return;
        const idxComplemento = hashTable_A.search(x - v);

        if (idxComplemento != -1) {
            const complemento = table[idxComplemento];
            const myPair = [noh, {
                "key": complemento!.key,
                "leftNode": complemento!.leftNode,
                "rightNode": complemento!.rightNode
            }];

            retorno.push(complemento!.key != v
                ? myPair
                : complemento!.frequency > 1
                    ? myPair
                    : undefined);
        }
        auxiliarSearch(noh.rightNode);
    }

    auxiliarSearch(T.getRoot());
    return retorno.filter(v => v != undefined);
}

const bts = new BinaryTreeSearch();
bts.insert(15);
bts.insert(20);
bts.insert(23);
bts.insert(18);
bts.insert(12);
bts.insert(14);
bts.insert(5);

bts.printTreeInorder();

console.log(get_pair_tree(bts, 32))