export interface Point {
    x: number
    y: number
}

export const identityMatrix = [1, 0, 0, 1, 0, 0];

export const multiplyMatrices = (m1: number[], m2: number[]): number[] => [
    m1[0] * m2[0] + m1[2] * m2[1],
    m1[1] * m2[0] + m1[3] * m2[1],
    m1[0] * m2[2] + m1[2] * m2[3],
    m1[1] * m2[2] + m1[3] * m2[3],
    m1[0] * m2[4] + m1[2] * m2[5] + m1[4],
    m1[1] * m2[4] + m1[3] * m2[5] + m1[5],
];

export const invertMatrix = (matrix: number[]): number[] | null => {
    const [a, b, c, d, e, f] = matrix;
    const det = a * d - b * c;
    if (!det) return null;
    const invDet = 1 / det;
    return [
        d * invDet,
        -b * invDet,
        -c * invDet,
        a * invDet,
        (c * f - d * e) * invDet,
        (b * e - a * f) * invDet,
    ];
};

export const applyMatrixToPoint = (matrix: number[], point: Point) => ({
    x: matrix[0] * point.x + matrix[2] * point.y + matrix[4],
    y: matrix[1] * point.x + matrix[3] * point.y + matrix[5],
});


export const zoomAtPoint = (matrix: number[], zoom: number, point: Point): number[] => {
    const translateToOriginMatrix = [1, 0, 0, 1, -point.x, -point.y];
    const scaleMatrix = [zoom, 0, 0, zoom, 0, 0];
    const translateBackMatrix = [1, 0, 0, 1, point.x, point.y];

    const newMatrix = multiplyMatrices(
        translateBackMatrix,
        multiplyMatrices(
            scaleMatrix,
            multiplyMatrices(translateToOriginMatrix, matrix)
        )
    );
    return newMatrix;
}

export const pan = (matrix: number[], delta: Point): number[] => {
    const panMatrix = [1, 0, 0, 1, delta.x, delta.y];
    return multiplyMatrices(matrix, panMatrix);
};

export const getScale = (matrix: number[]): number => matrix[0];

export const getPosition = (matrix: number[]): Point => ({
    x: matrix[4],
    y: matrix[5],
});