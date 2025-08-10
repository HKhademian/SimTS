import type { iNode } from "./Node";

export const enum Level {
    /** CONFLICT */
    X = -2,
    /** DANGLE */
    Z = -1,
    /** LOW */
    L = 0,
    /** HIGH */
    H = 1,
}

export interface iLevelNode extends iNode {
    get level(): Level;
}

export class ConstLevelNode implements iLevelNode {
    constructor(
        private readonly _level: Level = Level.Z,
    ) { }

    get level(): Level {
        return this._level;
    }

    update(): void { }
}

export class MutLevelNode implements iLevelNode {
    constructor(
        private _level: Level = Level.Z,
    ) { }

    get level(): Level {
        return this._level;
    }
    set level(level: Level) {
        this._level = level;
    }

    update(): void { }
}

export const LEVEL_X = new ConstLevelNode(Level.X);
export const LEVEL_Z = new ConstLevelNode(Level.Z);
export const LEVEL_L = new ConstLevelNode(Level.L);
export const LEVEL_H = new ConstLevelNode(Level.H);
