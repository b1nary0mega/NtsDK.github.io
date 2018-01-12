var visLocales = {
    ru: {
        edit: 'Редактировать',
        del: 'Удалить выбранное',
        back: 'Назад',
        addNode: 'Добавить узел',
        addEdge: 'Добавить связь',
        editNode: 'Редактировать узел',
        editEdge: 'Редактировать связь',
        addDescription: 'Кликните в свободное место, чтобы добавить новый узел.',
        edgeDescription: 'Кликните на узел и протяните связь к другому узлу, чтобы соединить их.',
        editEdgeDescription: 'Кликните на контрольные точки и перетащите их к другому узлу, чтобы соединить узлы.',
        createEdgeError: 'Невозможно соединить ребра в кластер.',
        deleteClusterError: 'Кластеры не могут быть удалены',
        editClusterError: 'Кластеры недоступны для редактирования.'
    },
    en: {
        edit: 'Edit',
        del: 'Delete selected',
        back: 'Back',
        addNode: 'Add Node',
        addEdge: 'Add Edge',
        editNode: 'Edit Node',
        editEdge: 'Edit Edge',
        addDescription: 'Click in an empty space to place a new node.',
        edgeDescription: 'Click on a node and drag the edge to another node to connect them.',
        editEdgeDescription: 'Click on the control points and drag them to a node to connect to it.',
        createEdgeError: 'Cannot link edges to a cluster.',
        deleteClusterError: 'Clusters cannot be deleted.',
        editClusterError: 'Clusters cannot be edited.'
    }
};

var charExample = `Арагорн	персонаж	
Бильбо	персонаж	Удачливый, старый
Фродо	персонаж	Юркий, слабый
кольцо	предмет	
Назгул	персонаж	бессмертный`;

var edgesExample = `Фродо	несет	Кольцо
Бильбо	ждет	Фродо
Назгул	ищет	Фродо
Арагорн	ищет	Назгул`;

var snFocusOptions = {
    scale: 1.2,
    offset: {
        x: 0,
        y: 0
    },
    animation: {
        duration: 1000,
        easingFunction: 'easeInOutQuad'
    }
};