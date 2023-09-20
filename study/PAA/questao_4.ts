/*
    4. Dada uma lista de inteiros A de tamanho n com m numeros distintos, projete ´
    um algoritmo que retorne o k-esimo n ´ umero que mais se repete na lista, ´
    sendo k ≤ m. O algoritmo deve ter complexidade O(n)
*/
import {HashTable, h_node} from "./hashImplementation";


function countingsort<T>(vector:T[]) {
    
}

const get_kesimo = (A:number[], k:number):h_node => {
    const hashTable = new HashTable(A.length);
    A.forEach(v => hashTable.insert(v));
    //usar counting sort p ordenar as frequencias...
    const m = hashTable.getTable().filter(v => v != null).length;
    hashTable.printTable();
    return {key:1, removed:false, frequency:1};
}


get_kesimo([1, 7, 6, 22, 1, 7, 2, 3, 8, 1, 16], 2);