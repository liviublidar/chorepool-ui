import { Injectable } from '@angular/core';
import * as configuration from '../configs/config.json';
import { isNullOrUndefined} from 'util';


export interface IConfiguration {
  //expose config children
  project: any;
  app: any;
}

function getProjectConfig (): any {
  return configuration
}

@Injectable()
export class ConfigService {
  public allConfig: IConfiguration;

  constructor() {}

  public getConfig(): IConfiguration {
    if (isNullOrUndefined(this.allConfig)) {
      this.allConfig = getProjectConfig().default;
    }
    return this.allConfig; //.default only neessary due to weird parsing of json file
  }
}
