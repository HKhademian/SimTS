import { Level } from './Level';


type tWireDriver = () => Level;
type tWireListener = (level: Level) => void;

export class Wire {
    private drivers: tWireDriver[] = [];
    private listeners: tWireListener[] = [];
    private _level: Level = Level.Z;

    attachDriver(driver: tWireDriver) {
        this.drivers.push(driver);
        this.update();
    }

    detachDriver(driver: tWireDriver) {
        this.drivers = this.drivers.filter(d => d !== driver);
        this.update();
    }

    attachListener(listener: tWireListener) {
        this.listeners.push(listener);
        listener(this._level);
    }

    detachListener(listener: tWireListener) {
        this.listeners = this.listeners.filter(l => l !== listener);
    }

    update() {
        const levels = this.drivers.map(d => d()).filter(l => l != null && l !== Level.Z);
        const unique = Array.from(new Set(levels));
        if (unique.length === 0) {
            return this.updateLevel(Level.Z);
        }
        if (unique.length === 1) {
            return this.updateLevel(unique[0]!);
        }
        return this.updateLevel(Level.X);
    }

    get level(): Level {
        return this._level;
    }

    private updateLevel(newLevel: Level) {
        if (this._level === newLevel) {
            return; // No change, no need to notify
        }
        this._level = newLevel;
        for (const listener of this.listeners) {
            listener(this._level);
        }
    }
}
