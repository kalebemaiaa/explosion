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
    private head: T_Node<T>|null = null;
    private tail: T_Node<T>|null = null;
    private length: number = 0;

    constructor(data?: T){
        if(!data) return;

        const newNode = new T_Node(data);
        this.head = newNode;
        this.tail = newNode;
        this.length++;
    }

    public insertBegin(data: T):T_Node<T> {
        const newNode = new T_Node(data);
        this.length++;

        if(!this.head) {
            this.head = newNode;
            this.tail = newNode;
            return newNode;
        }

        newNode.setNext(this.head);
        this.head = newNode;

        return newNode;
    }

    public insertEnd(data: T):T_Node<T> {
        const newNode = new T_Node(data);
        this.length++;

        if(!this.head) {
            this.head = newNode;
            this.tail = newNode;
            return newNode;
        }

        if(this.tail) this.tail.setNext(newNode);
        this.tail = newNode;
        return newNode;
    }

    public removeBegin(): T|null {
        if(!this.head) return null;

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
        let Cur = this.head;

        while(Cur != null) {
            arr.push(Cur.getData());
            Cur = Cur.getNext();
        }

        return arr;
    }

    printList(): number {
        let Node = this.head;
        while(Node != null) {
            console.log(Node.getData());
            Node = Node.getNext();
        }

        return this.length;
    }
}