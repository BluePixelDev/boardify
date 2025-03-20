import React from 'react';
import { GraphViewProvider } from '../context/GraphViewContext';
import Graph from './Graph';

const GraphCanvas = ({ children }: { children: React.ReactNode }) => {
    return (
        <GraphViewProvider>
            <Graph>{children}</Graph>
        </GraphViewProvider>
    );
};

export default GraphCanvas;