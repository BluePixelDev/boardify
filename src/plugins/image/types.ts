export type ImageNodeData =
    | { type: 'image'; imageUrl: string }
    | { type: 'gif'; imageUrl: string; isPlaying: boolean };
