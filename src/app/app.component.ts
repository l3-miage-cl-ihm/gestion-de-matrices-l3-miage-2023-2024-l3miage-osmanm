import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { Highlight, HighlightCell, Matrix, addIntMatrixes, initMatrixIntRandom, multiplyIntMatrixes } from './matrix';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
// Correction avec des génériques, pour les étufiant, l'utilisation de number est suffisante...
export class AppComponent {
  /*sigL1 : un signal de number qui indiquera le nombre de lignes de la matrice M1.
sigH1 : un signal de number qui indiquera le nombre de colonnes de la matrice M1.
sigL2 : un signal de number qui indiquera le nombre de lignes de la matrice M2.
sigH2 : un signal de number qui indiquera le nombre de colonnes de la matrice M2.
sigM1 : un signal calculé à partir des signaux sigL1 et sigH1 qui initialisera une matrice de nombre M1 de dimensions sigL1() x sigH1(). Vous utiliserez pour cela la fonction initMatrixIntRandomdu fichier src/app/matrix.ts.
sigM2 : un signal calculé à partir des signaux sigL2 et sigH2 qui initialisera une matrice de nombre M2 de dimensions sigL2() x sigH2().
 */
  public sigH1=signal<number>(3);
  public sigH2=signal<number>(3);
  public sigL1=signal<number>(3);
  public sigL2=signal<number>(3);
  public sigM1=computed<Matrix<number,number,number>>(()=>{return initMatrixIntRandom<number,number>(this.sigL1(),this.sigH1())});
  public sigM2=computed<Matrix<number,number,number>>(()=>{return initMatrixIntRandom<number,number>(this.sigL2(),this.sigH2())});
  public sigHhilightInM1plusM2=signal<Highlight>(undefined);
  public sigHhilightInM1xM2=signal<Highlight>(undefined);
  public sigHhilightInM1=signal<Highlight>(undefined)
  
  public sigHhilightInM2=signal<Highlight>(undefined);

  
  
  public sigM1plusM2=computed<Matrix<number,number,number>|undefined>(()=>{
    if((this.sigH1()== this.sigH2())&&(this.sigL1() == this.sigL2())){
      return addIntMatrixes<number,number>(this.sigM2(),this.sigM1())
    }else{
      return undefined;
    }})
      
  public sigM1xM2=computed<Matrix<number,number,number>|undefined>(()=>{
    if((this.sigH1()== this.sigL2())&&(this.sigL1() == this.sigH2())){
      return multiplyIntMatrixes<number,number>(this.sigM2(),this.sigM1())
    }else{
      return undefined;
    }})

  updateSigH1(a:number){
    this.sigH1.set(a);
  }
  updateSigH2(a:number){
    this.sigH2.set(a);
  }
  updateSigL1(a:number){
    this.sigL1.set(a);
  }
  updateSigL2(a:number){
    this.sigL2.set(a);
  }
  overM1plusM2( c?: [line: number, column: number] ): void{
    if (c!=undefined){

        let t={type:'cell',cell:c} as HighlightCell;
        this.sigHhilightInM1plusM2.set(t);
        
    }
    else {this.sigHhilightInM1plusM2.set(undefined);}
  };
  }

