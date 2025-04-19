import { GraphNodeData, GraphNodeSize, selectCurrentLayer } from '@/features/graph';
import { ImportEvent } from '@/features/importing';
import { v4 as uuidv4 } from 'uuid';

export function createNode<T>(partialNode: Omit<GraphNodeData<T>, 'id'>): GraphNodeData<T> {
    return {
        id: uuidv4(),
        ...partialNode
    };
}

export function createNodeFromImportEvent<T>(
    importEvent: ImportEvent,
    size: GraphNodeSize,
    partialNode: Omit<GraphNodeData<T>, 'id' | 'position' | 'layerId' | 'size'>
): GraphNodeData<T> {
    const currentState = importEvent.getState()
    const { transform } = currentState.graph.graphView;
    const eventPosition = importEvent.position

    const [scaleX, , , scaleY, translateX, translateY] = transform;
    const graphX = (eventPosition.x - translateX) / scaleX - (size.width / 2);
    const graphY = (eventPosition.y - translateY) / scaleY - (size.height / 2);

    return {
        id: uuidv4(),
        position: {
            x: graphX,
            y: graphY
        },
        size,
        layerId: selectCurrentLayer(currentState)?.id ?? "",
        ...partialNode
    }
}