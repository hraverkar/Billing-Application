import { Injectable } from '@angular/core';

@Injectable()
export class Config {
    public config: Object = null;
    constructor() { }

    public getConfig() {
        return this.config;
    }
}