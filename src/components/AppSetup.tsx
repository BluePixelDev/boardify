import { useEffect } from "react"

const AppSetup = () => {
    useEffect(() => {
        const nodeModules = import.meta.glob("@/features/graph/nodes/**/index.ts");

        Object.values(nodeModules).forEach((importModule) => {
            importModule();
        });
    }, []);

    return null;
};

export default AppSetup;