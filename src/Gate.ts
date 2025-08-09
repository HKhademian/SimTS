import { Level } from './Level';

export interface Gate {
    compute(inputs: Level[]): Level;
}

export class AndGate implements Gate {
    compute(inputs: Level[]): Level {
        if (inputs.includes(Level.X)) {
            return Level.X;
        }
        return inputs.every(l => l === Level.H) ? Level.H : Level.L;
    }
}

export class OrGate implements Gate {
    compute(inputs: Level[]): Level {
        if (inputs.includes(Level.X)) {
            return Level.X;
        }
        return inputs.some(l => l === Level.H) ? Level.H : Level.L;
    }
}

export class NotGate implements Gate {
    compute(inputs: Level[]): Level {
        if (inputs[0] === Level.X) {
            return Level.X;
        }
        return inputs[0] === Level.H ? Level.L : Level.H;
    }
}

export class NandGate implements Gate {
    compute(inputs: Level[]): Level {
        if (inputs.includes(Level.X)) {
            return Level.X;
        }
        return inputs.every(l => l === Level.H) ? Level.L : Level.H;
    }
}

export class NorGate implements Gate {
    compute(inputs: Level[]): Level {
        if (inputs.includes(Level.X)) {
            return Level.X;
        }
        return inputs.some(l => l === Level.H) ? Level.L : Level.H;
    }
}

export class XorGate implements Gate {
    compute(inputs: Level[]): Level {
        if (inputs.includes(Level.X)) {
            return Level.X;
        }
        return inputs.filter(l => l === Level.H).length % 2 === 1 ? Level.H : Level.L;
    }
}

export class XnorGate implements Gate {
    compute(inputs: Level[]): Level {
        if (inputs.includes(Level.X)) {
            return Level.X;
        }
        return inputs.filter(l => l === Level.H).length % 2 === 0 ? Level.H : Level.L;
    }
}
