export type h_node = {key: number, removed: boolean, frequency: number};

export class HashTable{
    private tamanho: number = 0;
    private data: (h_node|null)[] = [];
    private hashKey: number;
    private loadFactor: number = 0;

    constructor(tamanho: number) {
        this.tamanho = tamanho;
        this.hashKey = this.make_hashKey(tamanho);
        
        this.data = []
        for(let i = 0; i < tamanho; i++) {
            this.data[i] = null;
        }
    }

    private make_hashKey(n: number): number {
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
        return get_primo(n);
    }

    private resize() {
        let newData:(h_node|null)[] = [];
        const newTamanho = Math.ceil(this.loadFactor * this.tamanho * 2);
        this.hashKey = this.make_hashKey(newTamanho);

        for(let i = 0; i < newTamanho; i++) {
            newData[i] = null;
        }

        this.data
        .forEach(v => {
            if(!v) return;
            let count:number = 0;
            while(count < newTamanho) {
                const index:number = this.hash(v.key + count++);
                const cur = newData[index];

                // não tem nada na posição || tem mas foi removido, então add e sai;
                if(!cur || cur.removed) {
                    newData[index] = v;
                    break;
                }

                // tem algo e é diferente, então procuramos outra posição
                if(cur.key != v.key) continue;
            }
        })

        this.tamanho = newTamanho;
        this.loadFactor = newData.filter(v => v!= null).length / newData.length;
        this.data = newData;
    }

    hash(data: number): number {
        return data % this.hashKey;
    }

    insert(value: number): void {
        let count:number = 0;
        const newElement:h_node = {key: value, removed: false, frequency: 1};

        while(count < this.tamanho) {
            const index:number = this.hash(value + count++) % this.tamanho;
            const cur = this.data[index];

            // não tem nada na posição || tem mas foi removido, então add e sai;
            if(!cur || cur.removed) {
                this.data[index] = newElement;
                this.loadFactor =  this.loadFactor + 1 / this.tamanho;
                break;
            }

            // tem algo e é diferente, então procuramos outra posição
            if(cur.key != value) continue;

            // tem algo e é igual
            this.data[index]!.frequency++;
            break;
        }

        if(this.loadFactor > 0.7) this.resize();
        if(count > this.tamanho) console.log(`Error:\n\t-Lista cheia e erro no resize, ${value} não foi inserido!`);
    }

    search(value: number):number {
        let count: number = 0;
        
        while(count < this.tamanho) {
            const index = this.hash(value + count++) % this.tamanho;
            const cur = this.data[index];
            if(!cur) return -1;
            if(cur.key != value || cur.removed) continue;
            
            return index;
        }

        console.log(`${value} não foi encontrado na lista!`);
        return -1
    }

    remove(value: number):boolean {
        const index = this.search(value);
        if(index == -1) return false;
        this.data[index]!.removed = true;
        return true;
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

    getLoadFactor() {
        return this.loadFactor;
    }
}