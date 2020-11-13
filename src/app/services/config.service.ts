import { Injectable } from '@angular/core';
import * as configuration from '../configs/config.json';

export interface IConfiguration {
  // expose config children
  project: any;
  app: any;
}

function getProjectConfig(): any {
  return configuration;
}

@Injectable()
export class ConfigService {
  public allConfig: IConfiguration;

  constructor() {}

  public getConfig(): IConfiguration {
    if (!this.allConfig) {
      this.allConfig = getProjectConfig().default;
    }
    return this.allConfig; // default only necessary due to weird parsing of json file
  }
}
