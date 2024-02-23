import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Highlight, Matrix, initMatrixIntRandom } from '../matrix';

@Component({
  selector: 'app-matrix',
  templateUrl: './matrix.component.html',
  styleUrls: ['./matrix.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
  
})

export class MatrixComponent {
  
  @Input()Matrice: Matrix<number, number, number>|undefined=initMatrixIntRandom(3,2);
  @Output() pointerOver=new EventEmitter<[line: number, column: number]|undefined>();
  @Input() highlight:Highlight=undefined;
  handlePointerEnter(line: number, column: number): void {
    this.pointerOver.emit([line, column]);
  }
  
  handlePointerLeave(): void {
    this.pointerOver.emit(undefined);
  }

  isHighlighted(l: number, c: number): boolean {
    const h = this.highlight;
    if (h === undefined) return false;
    switch (h.type) {
      case "cell": return h.cell[0] === l && h.cell[1] === c;
      case "column": return h.column === c;
      case "line": return h.line === l;
    }
  }
}
/*eza metlma ken 3emlino metl avel lezem naamel const a as highlight cell w mnaamol comparaison wehde wehde  */