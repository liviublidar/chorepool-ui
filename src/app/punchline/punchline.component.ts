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

  private punchlines: string[] = [
    'Your family\'s best friend',
    'Spend your time with the people you love',
    'Because chores can be fun'
  ];

  constructor() {
    this.setPunchline(0);
  }

  ngOnDestroy() {
    console.log('being destroyed');
    clearTimeout(this.punchlineTimeout);
  }

  private testIndexOfArray(array: Array<any>, index): number {
    return index < array.length ? index : 0;
  }

  private setPunchline(index: number): void {

    console.log('new message');
    this.punchline = this.punchlines[index]; // gets element from punchline
    setTimeout(() => {
      this.fadeIn();
    }, 500);


    setTimeout(() => {
      this.fadeOut();
    }, this.punchlineDelay - 500);

    this.punchlineTimeout = setTimeout(() => {
      this.setPunchline(this.testIndexOfArray(this.punchlines, ++index));
    }, this.punchlineDelay);
  }

  private fadeIn(): void {
    console.log('fading in');
    this.punchlineClass = 'visible';
  }

  private fadeOut(): void {
    console.log('fading out');
    this.punchlineClass = 'hidden';
  }
}
