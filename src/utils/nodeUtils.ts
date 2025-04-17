import { GraphNodeData } from '@/features/graph';
import { v4 as uuidv4 } from 'uuid';

export function createNode<T>(partialNode: Omit<GraphNodeData<T>, 'id'>): GraphNodeData<T> {
    return {
        id: uuidv4(),
        ...partialNode
    };
}
