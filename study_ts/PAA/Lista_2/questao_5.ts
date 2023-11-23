const divisao_getMax = (A:number[]):number => {
    const n:number = A.length;
    if(n == 1) return A[0];
    const somaLeft = divisao_getMax(A.slice(0,Math.floor(n/2)));
    const somaRight = divisao_getMax(A.slice(Math.floor(n/2), n));
    console.log(somaLeft, somaRight);
    return Math.max(somaLeft, somaRight, somaLeft + somaRight);
}


console.log(divisao_getMax([1,2,3,-4,1,2,3,4]))