import { Component, OnDestroy} from '@angular/core';

@Component({
  selector: 'app-punchline',
  templateUrl: './punchline.component.html',
  styleUrls: ['./punchline.component.scss']
})
export class PunchlineComponent implements OnDestroy{
  public punchline: string;
  public punchlineClass: string = 'hidden';
  private punchlineTimeout: any;
  private punchlineDelay: number = 8000;
  private transitionTime: number = 500; // needs to match css transition time

  private punchlines: string[] = [
    'Your family\'s best friend',
    'Spend your time with the people you love',
    'Because chores can be fun'
  ];

  constructor() {
    this.setPunchline(0);
  }

  ngOnDestroy() {
    clearTimeout(this.punchlineTimeout);
  }

  /**
   * returns first punchlines if punchline index out of bounds
   * @param index
   * @private
   */
  private getValidPunchlineIndex(index: number): number {
    return index < this.punchlines.length ? index : 0;
  }

  /**
   * handles the update and fade of the punchline on the main login page
   * @param index
   * @private
   */
  private setPunchline(index: number): void {
    this.punchline = this.punchlines[index]; // gets initial element from punchline

    setTimeout(() => {
      this.fadeIn();
    }, this.transitionTime); // transition time


    setTimeout(() => {
      this.fadeOut();
    }, this.punchlineDelay - this.transitionTime);

    this.punchlineTimeout = setTimeout(() => {
      this.setPunchline(this.getValidPunchlineIndex(++index));
    }, this.punchlineDelay);
  }

  private fadeIn(): void {
    this.punchlineClass = 'visible';
  }

  private fadeOut(): void {
    this.punchlineClass = 'hidden';
  }
}
