export default function * iterateAllCells() {
    for (let y = 0; y < 7; y ++) {
        for (let x = 0; x < 7; x ++) {
            yield {
                leftTop: {
                    x: 5 + x*2,
                    y: 1 + y*2,
                },
                index: { x, y },
            };
        }
    }
}
