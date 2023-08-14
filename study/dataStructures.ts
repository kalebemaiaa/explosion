class T_Node<T>{
    private data: T;
    private next: T_Node<T> | null = null;

    constructor(data: T) {
        this.data = data;
    }

    public setData(data: T):void {
        this.data = data;
    }

    public setNext(node: T_Node<T>|null):void {
        this.next = node;
    }

    public getData():T {
        return this.data;
    }

    public getNext(): T_Node<T>|null {
        return this.next;
    }
}

class LinkedList<T>{
    private head: T_Node<T>|null;
    private length: number = 0;

    constructor(data: T){
        this.head = new T_Node(data);
        this.length++;
    }

    public insertBegin(data: T):T_Node<T> {
        const newNode = new T_Node(data);
        newNode.setNext(this.head);
        this.head = newNode;
        this.length++;

        return newNode;
    }

    /*
    public insertEnd(data: T):T_Node<T> {
        const getLast = (node: T_Node<T>): T_Node<T> => {
            return node.getNext() ? getLast(node.getNext()) : node;
        };

        return this.head;
    }
    */

    public removeBegin(): T|undefined {
        if(!this.head) return undefined;

        const lixo:T = this.head.getData();
        this.head = this.head.getNext();
        this.length--;
        return lixo;
    }

    public getHead(): T_Node<T>|null {
        return this.head;
    }

    public getLength(): number {
        return this.length;
    }

    public toArray():T[] {
        let arr: T[] = [];
        if(!this.head) return arr;

        const addArr = (node: T_Node<T>) => {
            while(node){
                arr.push(node.getData());
                if(! node.getNext()) break;
                else node = node.getNext();
            }
            return arr;
        }

        return addArr(this.head);
    }
}