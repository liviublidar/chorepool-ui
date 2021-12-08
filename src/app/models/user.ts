import { Family } from "./family";

export class User {
  constructor(
    public id: number,
    public email: string,
    public name: string,
    public suspended: boolean,
    public family: Family
  ) {

  }
}
