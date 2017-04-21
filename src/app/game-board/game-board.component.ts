import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Box} from '../box';
import {Util} from '../util';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.css']
})
export class GameBoardComponent {
  boxes: Box[];

  @Output() boxClick = new EventEmitter<Box>();
  private static readonly colors: string[] = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];

  constructor() {
    this.boxes = Array.from(new Array(36), () => new Box());
  }

  onClick(box: Box): void {
    this.boxClick.emit(box);
  }

  reset(): void {
    this.boxes.forEach((box) => box.reset());
  }

  setGameOver(): void {
    this.reset();
    this.boxes[13].letter = 'G';
    this.boxes[14].letter = 'A';
    this.boxes[15].letter = 'M';
    this.boxes[16].letter = 'E';
    this.boxes[19].letter = 'O';
    this.boxes[20].letter = 'V';
    this.boxes[21].letter = 'E';
    this.boxes[22].letter = 'R';
  }

  generateSelectedBoxes(count: number): Box[] {
    let result: Box[] = [];
    let colors: string[] = Util.shuffleInPlace(GameBoardComponent.colors.slice(0)).slice(0, count);
    let letters: string[] = [];
    while (letters.length < count) {
      let letter = Util.getRandomLetter();
      if (!letters.some((l) => Object.is(l, letter))) {
        letters.push(letter);
      }
    }
    while (result.length < count) {
      let box = this.getRandomBox();
      if (!result.some((b) => Object.is(b, box))) {
        box.color = colors.pop();
        box.letter = letters.pop();
        result.push(box);
      }
    }
    return result;
  }

  private getRandomBox(): Box {
    return this.boxes[Util.getRandom(0,this.boxes.length-1)];
  }

}
