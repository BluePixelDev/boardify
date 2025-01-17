
type ImporterMiddleware = (data: any, next: () => void) => void;
type ImporterData = {
    priority: number
    name: string,
    middleware: ImporterMiddleware
}

class AppImporter {

    private middlewares: ImporterData[] = []

    public use(name: string, priority: number = 0, middleware: ImporterMiddleware) {
        this.middlewares.push({ name, priority, middleware });
        this.middlewares.sort((a, b) => a.priority - b.priority);
    }

    public unuse(name: string) {
        this.middlewares = this.middlewares.filter(middleware => middleware.name !== name);
    }

    private processFile(data: any) {
        let index = 0;

        const next = () => {
            if (index < this.middlewares.length) {
                const { middleware } = this.middlewares[index];
                index++;
                middleware(data, next);
            }
        };

        next();
    }

    public importFile(data: any) {
        this.processFile(data);
    }

}

export default AppImporter;