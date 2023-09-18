type arrNumber = number[];

const merge = (array1: arrNumber, array2: arrNumber):arrNumber => {
    const len1:number = array1.length;
    const len2:number = array2.length;

    let w:number = 0;
    let y:number = 0;

    let arrR:arrNumber = [];

    while(w < len1 && y < len2){
        if(array1[w] > array2[y]) {
            arrR.push(array2[y]);
            y++;
        }
        else{
            arrR.push(array1[w]);
            w++;
        }
    }

    while(w < len1) {
        arrR.push(array1[w]);
        w++;
    }

    while(y < len2) {
        arrR.push(array2[y]);
        y++;
    }

    return arrR;
}

const mergeSort = (arr:arrNumber):arrNumber => {
    const len = arr.length;
    if(len == 0 || len == 1) return arr;

    const mid = len % 2 == 0? len/2 : (len + 1) / 2;
    
    const arrL = mergeSort(arr.slice(0, mid));
    const arrR = mergeSort(arr.slice(mid, len));

    return merge(arrL, arrR);
}