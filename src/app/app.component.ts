import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { NotificationService } from './services/notification.service';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { GridComponent } from './components/grid/grid.component';
import { GridFormComponent } from './components/grid-form/grid-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule, CommonModule, NotificationsComponent, GridComponent, GridFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  min: number = 1;
  max: number = 20;
  numForm!: FormGroup;
  gridSize: number = 4;
  grid!: number[][] | null;

  constructor(private notificationService: NotificationService){}

  ngOnInit(): void {}

  onValueEmit(value: { gridSize: number, totalSum: number }): void {
    if(!this.validateLowerThreshold(value.gridSize, value.totalSum)) {
      this.notificationService.showDanger(`Cannot create grid with total sum of ${value.totalSum}.`);
      this.grid = null;
      return;
    }

    const finalGrid = this.generateGrid(value.gridSize, value.totalSum);

    if(this.validateGrid(finalGrid, value.totalSum)) {
      this.notificationService.showSuccess('Grid has been generated successfully.');
      this.grid = finalGrid;
    }
    else {
      this.notificationService.showSuccess('Grid could not be generated.');
      this.grid = null;
    }
  }

  generateGrid(size: number, sum: number): number[][] {
    const skeletonArr = this.getFilledArray(size, 0);
    const finalGrid: number[][] = skeletonArr.map(x => ([...skeletonArr]));

    for(let i = 0; finalGrid.length > i; i++) {
      const outerIterationsLeft = finalGrid.length - (i + 1);
      const rows = finalGrid[i];

      for(let j = 0; rows.length > j; j++) {
        const iterationsLeft = rows.length - (j + 1);
        const rowSum = this.getSum(finalGrid[i]);
        const columnSum = this.getSum(finalGrid.map(x => x[j]));
        let maxRowValue = sum - (rowSum + iterationsLeft);
        let maxColumnValue = sum - (columnSum + outerIterationsLeft);
        let maxPossibleValue = Math.min(maxRowValue, maxColumnValue);

        if(outerIterationsLeft === 0) {
          finalGrid[i][j] = maxColumnValue;
          continue;
        }

        if(iterationsLeft === 0) {
          finalGrid[i][j] = maxRowValue;
          continue;
        }

        finalGrid[i][j] = this.getRandomValue(1, maxPossibleValue);
      }
    }
    return finalGrid;
  }

  validateGrid(grid: number[][], sum: number): boolean {
    // check every row total and column total
    return grid.every((x, i) => this.getSum(x) === sum
           && this.getSum(grid.map(y => y[i])) === sum);
  }

  validateLowerThreshold(size: number, sum: number): boolean {
    // const lowerThresholdArr = this.getFilledArray(size).slice(0, size).fill(1);
    // const lowerThreshold = this.getSum(lowerThresholdArr);
    return sum >= size;
  }

  private getRandomValue(minimum: number, maximum: number): number {
    return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
  }

  private getFilledArray(size: number, fillWith: number | undefined = undefined): number[] {
    return [...Array(size).keys()].map((x, i) => fillWith === undefined ? i + 1 : fillWith);
  }

  private getSum(arr: number[]): number {
    return arr.reduce((prev, curr) => prev + curr, 0);
  }
}
