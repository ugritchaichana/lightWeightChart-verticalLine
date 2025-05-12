/**
 * Calculates the bitmap position for an item with a desired length (height or width), 
 * and centered according to a position coordinate defined in media sizing.
 * @param {number} positionMedia - position coordinate for the bar (in media coordinates)
 * @param {number} pixelRatio - pixel ratio. Either horizontal for x positions, or vertical for y positions
 * @param {number} [desiredWidthMedia=1] - desired width (in media coordinates)
 * @param {boolean} [widthIsBitmap=false] - if true, desiredWidthMedia is already in bitmap units
 * @returns {{ position: number, length: number }} Position of the start point and length dimension.
 */
function positionsLine(positionMedia, pixelRatio, desiredWidthMedia = 1, widthIsBitmap = false) {
    const scaledPosition = Math.round(pixelRatio * positionMedia);
    const lineBitmapWidth = widthIsBitmap
        ? desiredWidthMedia
        : Math.round(desiredWidthMedia * pixelRatio);
    const offset = Math.floor(lineBitmapWidth * 0.5);
    const position = scaledPosition - offset;
    return { position, length: lineBitmapWidth };
}

/**
 * Determines the bitmap position and length for a dimension of a shape to be drawn.
 * @param {number} position1Media - media coordinate for the first point
 * @param {number} position2Media - media coordinate for the second point
 * @param {number} pixelRatio - pixel ratio for the corresponding axis (vertical or horizontal)
 * @returns {{ position: number, length: number }} Position of the start point and length dimension.
 */
function positionsBox(position1Media, position2Media, pixelRatio) {
    const scaledPosition1 = Math.round(pixelRatio * position1Media);
    const scaledPosition2 = Math.round(pixelRatio * position2Media);
    return {
        position: Math.min(scaledPosition1, scaledPosition2),
        length: Math.abs(scaledPosition2 - scaledPosition1) + 1,
    };
}

// export ฟังก์ชันทั้งสอง
export { positionsLine, positionsBox };