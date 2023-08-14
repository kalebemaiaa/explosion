var T_Node = /** @class */ (function () {
    function T_Node(data) {
        this.next = null;
        this.data = data;
    }
    T_Node.prototype.setData = function (data) {
        this.data = data;
    };
    T_Node.prototype.setNext = function (node) {
        this.next = node;
    };
    T_Node.prototype.getData = function () {
        return this.data;
    };
    T_Node.prototype.getNext = function () {
        return this.next;
    };
    return T_Node;
}());
var LinkedList = /** @class */ (function () {
    function LinkedList(data) {
        this.length = 0;
        this.head = new T_Node(data);
        this.length++;
    }
    LinkedList.prototype.insertBegin = function (data) {
        var newNode = new T_Node(data);
        newNode.setNext(this.head);
        this.head = newNode;
        this.length++;
        return newNode;
    };
    /*
    public insertEnd(data: T):T_Node<T> {
        const getLast = (node: T_Node<T>): T_Node<T> => {
            return node.getNext() ? getLast(node.getNext()) : node;
        };

        return this.head;
    }
    */
    LinkedList.prototype.removeBegin = function () {
        if (!this.head)
            return undefined;
        var lixo = this.head.getData();
        this.head = this.head.getNext();
        this.length--;
        return lixo;
    };
    LinkedList.prototype.getHead = function () {
        return this.head;
    };
    LinkedList.prototype.getLength = function () {
        return this.length;
    };
    LinkedList.prototype.toArray = function () {
        var arr = [];
        if (!this.head)
            return arr;
        var addArr = function (node) {
            while (node) {
                arr.push(node.getData());
                if (!node.getNext())
                    break;
                else
                    node = node.getNext();
            }
            return arr;
        };
        return addArr(this.head);
    };
    return LinkedList;
}());
