#include "../../../graph/Graph.hpp"


int *GraphAdjList::get_path_otimo(int vA, int vB) {
    int pathsA[this->vertexNum];
    int distsA[this->vertexNum];
    int pathsB[this->vertexNum];
    int distsB[this->vertexNum];

    this->paths_dijkstra(vA, pathsA, distsA);
    this->paths_dijkstra(vB, pathsB, distsB);

    int min_idx = 0;
    for(int i = 0; i < this->vertexNum; i++){
        int dist_atual = distsA[i] > distsB[i] ? distsA[i] : distsB[i];
        int min_dist = distsA[min_idx] > distsB[min_idx] ? distsA[min_idx] : distsB[min_idx];

        if(dist_atual < min_dist) min_idx = i;
    }

    int countA = 1;
    for(int i = min_idx; i != 0; i = pathsA[i]){
        countA++;
    };
    int pathA[countA];
    for(int i = min_idx; ; i = pathsA[i]){
        pathA[i] = pathsA[i];
        if(i == 0) break;
    };


    for(int i = 0; i < countA; i++){
        cout << pathA[i] << "    ";
    }

    int *i;
    return i;
}

int main() {
    GraphAdjList g1(4);
    g1.addEdge(0,1,5);
    g1.addEdge(0,2,8);
    g1.addEdge(1,2,9);
    g1.addEdge(1,3,2);
    g1.addEdge(2,3,6);
    
    g1.addEdge(1,0,5);
    g1.addEdge(2,0,8);
    g1.addEdge(2,1,9);
    g1.addEdge(3,1,2);
    g1.addEdge(3,2,6);

    g1.get_path_otimo(0, 3);
}