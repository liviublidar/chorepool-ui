import { Injectable } from '@angular/core';
import * as configuration from '../configs/config.json';

export interface IConfiguration {
  //expose config children
  project: any;
}

function getProjectConfig (): any {
  return configuration
}

@Injectable()
export class ConfigService {
  constructor() {}

  public getConfig(): IConfiguration {
    return getProjectConfig().default; //.default only neessary due to weird parsing of json file
  }
}
