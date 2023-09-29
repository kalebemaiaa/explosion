export type node = t_node|null;

interface t_node{
    key: number;
    leftNode: node;
    rightNode: node;
}

export class BinaryTreeSearch {
    private root: node = null;

    constructor(n?:number) {
        if(n) this.root = this.createNode(n);
    }

    private createNode(n:number):t_node {
        return {key: n, leftNode: null, rightNode: null}
    }

    insert(n:number):node {
        const newNode = this.createNode(n);
        let x: node = this.root;
        let y: node = null;

        while(x != null) {
            y = x;
            x = n < x.key ? x.leftNode : x.rightNode;
        }

        if(!y) this.root = newNode;
        else if(n < y.key) y.leftNode = newNode;
        else y.rightNode = newNode;

        return newNode;
    }

    private auxiliarPrintTree(noh: node, tabs:number = 0, direction: number = 0){
        const printGalho = (noh: node) => {
            let s = []
            const begin = direction == 0 ? "|" : direction == -1 ? "/" : "\\";
            for(let i = 0; i < tabs; i++){
                if(i != tabs - 1) s.push("\t")
                else s.push(`${begin}${begin}===`);
            }

            if(!noh)
                console.log(`${s.join("")} X`);
            else
                console.log(`${s.join("")} ${noh.key}`);
        }
        if(noh == null){
            printGalho(noh);
            return;
        }
        this.auxiliarPrintTree(noh.leftNode, tabs + 1, -1);
        printGalho(noh);
        this.auxiliarPrintTree(noh.rightNode, tabs + 1, 1);
    }

    bts2array(noh?:node):t_node[] {
        let btsArray:t_node[] = [];

        const auxiliarToArray = (noh: node) => {
            if(!noh) return;
            auxiliarToArray(noh.leftNode);
            btsArray.push(noh);
            auxiliarToArray(noh.rightNode);
        }
        
        auxiliarToArray(noh ? noh : this.root);

        return btsArray;
    }

    printTreeInorder() {
        this.auxiliarPrintTree(this.root);
    }

    getRoot() {
        return this.root;
    }
}