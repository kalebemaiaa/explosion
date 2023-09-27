/*
    4. Dada uma lista de inteiros A de tamanho n com m numeros distintos, projete ´
    um algoritmo que retorne o k-esimo n ´ umero que mais se repete na lista, ´
    sendo k ≤ m. O algoritmo deve ter complexidade O(n)
*/
import { HashTable, h_node } from "../dataStructures/hash";
import { quickSelect } from "./newQuickSelect";

const get_kesimo = (A: number[], k: number) => {
    const hashTable = new HashTable(A.length);
    A.forEach(v => hashTable.insert(v));

    const m = hashTable.getTable()
        .filter(v => v != null)

    console.log(m)
    const retorno = quickSelect(m, m.length - k ,(a:h_node, b:h_node) => a.frequency - b.frequency, m);
    return retorno||-1;
}

/*
    Arrumar essa questão pegando o retorno[0];
console.log(get_kesimo([1, 7, 6, 22, 1, 7, 2, 3, 8, 1, 16], 2));
*/