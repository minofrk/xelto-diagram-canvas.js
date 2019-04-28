export default class PrivateMap<P extends HTMLElement, Q extends {}> {
    private readonly mapOfMap = new WeakMap<P, Q>();

    init(that: P, initMap: Q): void {
        this.mapOfMap.set(that, initMap);
    }

    of(that: P): Q {
        const value = this.mapOfMap.get(that);
        if (!value) throw new TypeError();
        return value;
    }
}
