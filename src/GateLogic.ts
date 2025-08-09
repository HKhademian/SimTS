import { Level } from './Level';

export interface GateLogic {
    compute(inputs: Level[]): Level;
}

export class NotGateLogic implements GateLogic {
    compute(inputs: Level[]): Level {
        if (inputs.length <= 0) {
            return Level.Z;
        }
        if (inputs[0] === Level.X) {
            return Level.X;
        }
        return inputs[0] === Level.H ? Level.L : Level.H;
    }
}

export class BufferGateLogic implements GateLogic {
    compute(inputs: Level[]): Level {
        if (inputs.length <= 0) {
            return Level.Z;
        }
        return inputs[0]!;
    }
}

export class AndGateLogic implements GateLogic {
    compute(inputs: Level[]): Level {
        if (inputs.includes(Level.X)) {
            return Level.X;
        }
        return inputs.every(l => l === Level.H) ? Level.H : Level.L;
    }
}

export class OrGateLogic implements GateLogic {
    compute(inputs: Level[]): Level {
        if (inputs.includes(Level.X)) {
            return Level.X;
        }
        return inputs.some(l => l === Level.H) ? Level.H : Level.L;
    }
}


export class NandGateLogic implements GateLogic {
    compute(inputs: Level[]): Level {
        if (inputs.includes(Level.X)) {
            return Level.X;
        }
        return inputs.every(l => l === Level.H) ? Level.L : Level.H;
    }
}

export class NorGateLogic implements GateLogic {
    compute(inputs: Level[]): Level {
        if (inputs.includes(Level.X)) {
            return Level.X;
        }
        return inputs.some(l => l === Level.H) ? Level.L : Level.H;
    }
}

export class XorGateLogic implements GateLogic {
    compute(inputs: Level[]): Level {
        if (inputs.includes(Level.X)) {
            return Level.X;
        }
        return inputs.filter(l => l === Level.H).length % 2 === 1 ? Level.H : Level.L;
    }
}

export class XnorGateLogic implements GateLogic {
    compute(inputs: Level[]): Level {
        if (inputs.includes(Level.X)) {
            return Level.X;
        }
        return inputs.filter(l => l === Level.H).length % 2 === 0 ? Level.H : Level.L;
    }
}
