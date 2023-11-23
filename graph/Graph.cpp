#include "Graph.hpp"

int main() {
    GraphAdjList g1(6);
    g1.addEdge(0,1,7);
    g1.addEdge(0,2,9);
    g1.addEdge(1,3,2);
    g1.addEdge(1,4,4);
    g1.addEdge(2,4,1);
    g1.addEdge(3,4,3);
    g1.addEdge(4,1,5);
    g1.addEdge(4,5,2);
    // int *parents = (int *) malloc(sizeof(int) * 6);
    // int *distances = (int *) malloc(sizeof(int) * 6);

    // g1.paths_dijkstra(1, parents, distances);
    // for(int i = 0 ; i < 6;i++){
    //     cout << parents[i] << endl;
    // }
    
    Edge *ll = (Edge *) malloc(sizeof(Edge) * 6);
    g1.kruskal_mst(ll);
    while(ll){
        cout << ll << endl;
    }
    return 0;
}