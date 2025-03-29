import { GraphNodeData } from '@/features/graph/nodes';
import { v4 as uuidv4 } from 'uuid';

export function createNode(partialNode: Omit<GraphNodeData, 'id'>): GraphNodeData {
    return {
        id: uuidv4(),
        ...partialNode
    };
}
