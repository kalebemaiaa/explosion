export default class HashTable{
    private tamanho: number;
    private data: ({key: number, removed: boolean}|null)[] = [];
    private hashKey: number;

    constructor(tamanho: number) {
        this.tamanho = tamanho;
        const get_primo = (n:number):number => {
            // n = 1 retorna 1;
            if(n == 1) return n;  
            const is_primo = (k:number):boolean => {
                if(k == 1 || k % 2 == 0) return false;
                for(let i = 3; i < k/2; i+=2) {
                    if(k % i == 0) return false;
                }
                return true;
            }
            while(!is_primo(n)){
                n++;
            }
            return n;
        }
        this.hashKey = get_primo(tamanho);
    }

    hash(data: number): number {
        return data % this.hashKey;
    }

    insert(value: number): void {
        let count:number = 0;
        let index:number = 0;

        while(count < this.tamanho) {
            index = this.hash(value + count++);
            if(this.data[index] && !this.data[index]!.removed) continue;
            this.data[index] = {key: value, removed: false};
            return;
        }

        console.log(`Lista cheia, ${value} não foi inserido!`);
    }

    search(value: number):number {
        let count: number = 0;
        let index: number = 0;

        while(count < this.tamanho) {
            index = this.hash(value + count++);
            if(!this.data[index]) continue;
            if(this.data[index]!.key != value || this.data[index]!.removed) continue;

            return index;
        }

        console.log(`${value} não foi encontrado na lista!`);
        return -1
    }

    remove(value: number) {
        const index = this.search(value);
        if(index == -1) return;
        this.data[index]!.removed = true;
    }

    printTable():void {
        console.log(this.data);
    }

    getTable() {
        return this.data;
    }

    getSize() {
        return this.tamanho;
    }

    getHashKey() {
        return this.hashKey;
    }
}