import { Level } from './Level';

export class Wire {
    private level: Level;
    constructor(initial: Level = Level.LOW) {
        this.level = initial;
    }
    getLevel(): Level {
        return this.level;
    }
    setLevel(level: Level) {
        this.level = level;
    }
}
