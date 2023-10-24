type graphForms = number[][];
type conjunto = [number, number];

interface allGraphForms {
    edgeList?: conjunto[];
    matrizAdjacencia?: number[][];
}

const get_formas = (A:graphForms):allGraphForms => {
    console.log(typeof(A));
    return {}
}

get_formas([[1,2],[3,4]])
get_formas([[1,2],[3,4,3]])