import { createContext, useCallback, useContext, useState } from "react";
import { v4 as uuidv4 } from 'uuid';

type Props = {
    children?: JSX.Element | JSX.Element[],
}

export interface BaseNodeData {
    id: string;
    type: string;
    position: { x: number, y: number };
    size: { width: number, height: number };
    createdAt: number;
    updatedAt: number;
}

export interface NodeData<T = any> extends BaseNodeData {
    type: string;
    data: T;
}

export interface NodeCreationOptions<T> {
    type: string;
    initialPosition?: { x: number, y: number };
    initialSize?: { width: number, height: number };
    data: T;
}

interface NodeManagerContextType {
    nodes: NodeData[];
    createNode: <T>(options: NodeCreationOptions<T>) => NodeData<T>;
    updateNode: <T>(id: string, updatedData: Partial<NodeData<T>>) => void;
    deleteNode: (id: string) => void;
}

const NodeManagerContext = createContext<NodeManagerContextType | undefined>(undefined);

export default function(props: Props) {
    const [nodes, setNodes] = useState<NodeData[]>([]);

    const createNode = useCallback(<T,>(options: NodeCreationOptions<T>): NodeData<T> => {
        const newNode: NodeData<T> = {
            id: uuidv4(),
            type: options.type,
            position: options.initialPosition || { x: 0, y: 0 },
            size: options.initialSize || { width: 200, height: 200 },
            data: options.data,
            createdAt: Date.now(),
            updatedAt: Date.now()
        };

        setNodes(prevNodes => [...prevNodes, newNode]);
        return newNode;
    }, []);

    const updateNode = useCallback(<T,>(id: string, updatedData: Partial<NodeData<T>>) => {
        setNodes(prevNodes => 
            prevNodes.map(node => 
                node.id === id 
                    ? { 
                        ...node, 
                        ...updatedData, 
                        updatedAt: Date.now() 
                    } 
                    : node
            )
        );
    }, []);

    const deleteNode = useCallback((id: string) => {
        setNodes(prevNodes => prevNodes.filter(node => node.id !== id));
    }, []);

    return (
        <NodeManagerContext.Provider value={{
            nodes,
            createNode,
            updateNode,
            deleteNode,
        }}>
            {props.children}
        </NodeManagerContext.Provider>
    );
}

export const useNodeManager = () => {
    const context = useContext(NodeManagerContext);
    if (!context) {
        throw new Error('useNodeManager must be used within a NodeManagerProvider');
    }
    return context;
};