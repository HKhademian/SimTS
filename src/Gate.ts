import { Level } from './Level';

export interface Gate {
    compute(inputs: Level[]): Level;
}

export class AndGate implements Gate {
    compute(inputs: Level[]): Level {
        return inputs.every(l => l === Level.HIGH) ? Level.HIGH : Level.LOW;
    }
}

export class OrGate implements Gate {
    compute(inputs: Level[]): Level {
        return inputs.some(l => l === Level.HIGH) ? Level.HIGH : Level.LOW;
    }
}

export class NotGate implements Gate {
    compute(inputs: Level[]): Level {
        return inputs[0] === Level.HIGH ? Level.LOW : Level.HIGH;
    }
}

export class NandGate implements Gate {
    compute(inputs: Level[]): Level {
        return inputs.every(l => l === Level.HIGH) ? Level.LOW : Level.HIGH;
    }
}

export class NorGate implements Gate {
    compute(inputs: Level[]): Level {
        return inputs.some(l => l === Level.HIGH) ? Level.LOW : Level.HIGH;
    }
}

export class XorGate implements Gate {
    compute(inputs: Level[]): Level {
        return inputs.filter(l => l === Level.HIGH).length % 2 === 1 ? Level.HIGH : Level.LOW;
    }
}

export class XnorGate implements Gate {
    compute(inputs: Level[]): Level {
        return inputs.filter(l => l === Level.HIGH).length % 2 === 0 ? Level.HIGH : Level.LOW;
    }
}
