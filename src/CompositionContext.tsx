import React, { createContext, useContext } from 'react';
import { CompositionProps } from './CompositionSchema';

type ContextProps = CompositionProps & {
    orientation: 'landscape' | 'portrait';
};

const CompositionContext = createContext<ContextProps | null>(null);

export const CompositionProvider: React.FC<{
    data: ContextProps;
    children: React.ReactNode;
}> = ({ data, children }) => {
    return (
        <CompositionContext.Provider value={data}>
            {children}
        </CompositionContext.Provider>
    );
};

export const useComposition = () => {
    const context = useContext(CompositionContext);
    if (!context) {
        throw new Error('useComposition must be used within a CompositionProvider');
    }
    return context;
};
