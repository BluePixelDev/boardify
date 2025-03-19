import React from 'react';
import { GraphViewProvider } from './transform/GraphViewContext';
import Graph from './Graph';

export const GraphCanvas = ({ children }: { children: React.ReactNode }) => {
    return (
        <GraphViewProvider>
            <Graph>{children}</Graph>
        </GraphViewProvider>
    );
};