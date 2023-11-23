/*
    4. Dada uma lista de inteiros A de tamanho n com m numeros distintos, projete ´
    um algoritmo que retorne o k-esimo n ´ umero que mais se repete na lista, ´
    sendo k ≤ m. O algoritmo deve ter complexidade O(n)
*/
import { HashTable, h_node } from "../../dataStructures/hash";
import { quickSelect } from "./newQuickSelect";

const get_kesimo = (A: number[], k: number) => {
    const hashTable = new HashTable(A.length);

    // mapeando em uma hashTable
    A.forEach(v => hashTable.insert(v));

    const [A_alterado, idxKesimo] = quickSelect(
        hashTable.getTable()
            .filter(v => v != null),
        k,
        (a: h_node, b: h_node) => a.frequency - b.frequency);

    return A_alterado[idxKesimo];
}

console.log(get_kesimo([1, 7, 6, 22, 1, 7, 2, 3, 8, 1, 16], 1));