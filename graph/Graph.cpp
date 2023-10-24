#include <cstdlib>
#include <iostream>

using namespace std;

struct edgeNode
{
    int peso;
    int vertex;
    edgeNode *next;
};

class GraphAdjList
{
public:
    GraphAdjList(int vertexNum)
    {
        this->vertexNum = vertexNum;
        this->m_edges = (edgeNode **)malloc(vertexNum * sizeof(edgeNode *));
        for (int i = 0; i < vertexNum; i++)
        {
            (this->m_edges)[i] = nullptr;
        }
    }

    ~GraphAdjList()
    {
    }

    void addEdge(int v1, int v2, int peso = 1)
    {
        if (v1 < 0 || v2 > this->vertexNum)
        {
            cout << "Não foi possivel adicionar o vertice" << endl;
            return;
        }
        // cria novo noh
        edgeNode *newNode = (edgeNode *)malloc(sizeof(edgeNode));
        newNode->next = nullptr;
        newNode->peso = peso;
        newNode->vertex = v2;

        edgeNode *cur = (this->m_edges)[v1];

        // se n tem nenhumnoh, insere
        if (cur == nullptr)
        {
            (this->m_edges)[v1] = newNode;
            return;
        }

        // se o primeiro for maior que o que ira ser inserido, muda;
        if (newNode->vertex < cur->vertex)
        {
            newNode->next = cur;
            (this->m_edges)[v1] = newNode;
            return;
        }

        while (cur->next != nullptr)
        {
            if (cur->next->vertex > newNode->vertex)
                break;
            cur = cur->next;
        }

        edgeNode *tmp = cur->next;
        cur->next = newNode;
        newNode->next = tmp;
    }

    void removeEdge(int v1, int v2)
    {
        if (!(this->m_edges)[v1])
            return;
        if ((this->m_edges)[v1]->vertex == v2)
        {
            edgeNode *lixo = (this->m_edges)[v1];
            (this->m_edges)[v1] = lixo->next;
            free(lixo);
            return;
        }
        for (edgeNode *cur = (this->m_edges)[v1]; cur->next != nullptr; cur = cur->next)
        {
            if (cur->next->vertex != v2)
                continue;

            edgeNode *lixo = cur->next;
            cur->next = lixo->next;
            free(lixo);
            return;
        }

        cout << "O vertice " << v1 << " nao possui aresta para " << v2 << endl;
    }

    void print()
    {
        for (int i = 0; i < this->vertexNum; i++)
        {
            for (edgeNode *cur = (this->m_edges)[i]; cur != nullptr; cur = cur->next)
            {
                cout << "(" << i << ", " << cur->vertex << ", peso: " << cur->peso << ")  ";
            }
            cout << endl;
        }
    }

    /*
        Essa função não deve ser utilizada com frequência pois
        retorna o ponteiro para os nos;
    */
    edgeNode **getTabelEdges()
    {
        return this->m_edges;
    }

    int getVertexNum()
    {
        return this->vertexNum;
    }

    int getEdgeNum()
    {
        return this->edgeNum;
    }

    bool isSubGraph(GraphAdjList &g)
    {
        edgeNode **table = g.getTabelEdges();
        int n = g.getVertexNum();
        if (n > this->vertexNum)
            return false;
        for (int i = 0; i < n; i++)
        {
            for (edgeNode *cur = table[i], *curThis = (this->m_edges)[i]; cur != nullptr; cur = cur->next)
            {
                while (curThis->vertex != cur->vertex && curThis != nullptr)
                {
                    if (curThis->vertex > cur->vertex)
                        return false;
                    curThis = curThis->next;
                }
                if (!curThis)
                    return false;
            }
        }
        return true;
    }

    bool isPath(int *path, int n)
    {
        for (int i = 1; i < n; i++)
        {
            if (path[i - 1] < 0 || path[i - 1] >= this->vertexNum || path[i] < 0 || path[i] >= this->vertexNum)
                return false;
            edgeNode *cur = (this->m_edges)[path[i - 1]];
            while (cur != nullptr)
            {
                if (cur->vertex > i)
                    return false;
                if (cur->vertex == i)
                    break;
                cur = cur->next;
            }
            if (cur == nullptr)
                return false;
        }

        return true;
    }

private:
    int vertexNum = 0;
    int edgeNum = 0;
    edgeNode **m_edges;
};

class GraphMatrix
{
public:
    GraphMatrix(int vertexNum)
    {
        this->vertexNum = vertexNum;
        int **matrizAdjacencia = (int **)malloc(sizeof(int *) * vertexNum);
        for (int i = 0; i < vertexNum; i++)
        {
            matrizAdjacencia[i] = (int *)malloc(sizeof(int) * vertexNum);
        }
        this->matrizAdjacencia = matrizAdjacencia;
    }

    ~GraphMatrix()
    {
        for (int i = 0; i < this->vertexNum; i++)
        {
            free((this->matrizAdjacencia)[i]);
        }
        free(this->matrizAdjacencia);
    }

    void addEdge(int v1, int v2, int peso = 1)
    {
        if (v1 >= this->vertexNum || v1 < 0 || v2 < 0 || v2 >= this->vertexNum){
            cout << "Posição inválida para adicionar aresta!" << endl;
            return;
        }
        (this->matrizAdjacencia)[v1][v2] = peso;
        this->edgeNum++;
    }

    void printMatrix()
    {
        for (int i = 0; i < this->vertexNum; i++)
        {
            for (int j = 0; j < this->vertexNum; j++)
            {
                cout << (this->matrizAdjacencia)[i][j] << " ";
            }
            cout << endl;
        }
    }

    void print()
    {
        for (int i = 0; i < this->vertexNum; i++)
        {
            for (int j = 0; j < this->vertexNum; j++)
            {
                if ((this->matrizAdjacencia)[i][j] != 0)
                    cout << "(" << i << "," << j << ")  ";
            }
            cout << endl;
        }
    }

    bool hasEdge(int v1, int v2)
    {
        if (v1 >= this->vertexNum || v1 < 0 || v2 < 0 || v2 >= this->vertexNum)
        {
            cout << "Não posso acessar [" << v1 << "][" << v2 << "]" << endl;
            return false;
        }
        return this->matrizAdjacencia[v1][v2] != 0;
    }

    void removeEdge(int v1, int v2)
    {
        if (v1 >= this->vertexNum || v1 < 0 || v2 < 0 || v2 >= this->vertexNum)
        {
            cout << "Não posso acessar [" << v1 << "][" << v2 << "] em um grafo com tamanho " << this->vertexNum << endl;
            return;
        }
        this->matrizAdjacencia[v1][v2] = 0;
        this->edgeNum--;
    }

    int getEdgeNum()
    {
        return this->edgeNum;
    }

    int getVertexNum()
    {
        return this->vertexNum;
    }

    bool isSubGraph(GraphMatrix &g)
    {
        int gVertex = g.getVertexNum();
        if (this->vertexNum < gVertex)
            return false;

        for (int i = 0; i < gVertex; i++)
            for (int j = 0; j < gVertex; j++)
                if (g.hasEdge(i, j) && !(this->hasEdge(i, j)))
                    return false;

        return true;
    }

    bool isPath(const int *path, int n)
    {
        // falta dizer se é simples
        // a ideia é usar hashtable
        for (int i = 1; i < n; i++)
        {
            if (!(this->hasEdge(path[i - 1], path[i])))
                return false;
        }
        return true;
    }

private:
    int vertexNum = 0;
    int edgeNum = 0;
    int **matrizAdjacencia;
};

int main()
{
    return 0;
}