import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { NotificationsComponent } from '../notifications/notifications.component';

@Component({
  selector: 'app-grid-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NotificationsComponent],
  templateUrl: './grid-form.component.html',
  styleUrl: './grid-form.component.scss'
})
export class GridFormComponent implements OnInit {
  @Input() min: number = 0;
  @Input() max: number = 0;
  @Input() gridSize: number = 0;
  @Output() valueEmitter = new EventEmitter<{ gridSize: number, totalSum: number }>();

  numForm!: FormGroup;
  grid!: number[][] | null;

  constructor(){}

  ngOnInit(): void {
    this.numForm = new FormGroup({
      gridSize: new FormControl({ disabled: true, value: this.gridSize }, Validators.required),
      totalSum: new FormControl('', this.validateSum.bind(this))
    });
  }

  submit(): void {
    this.numForm.markAllAsTouched();
    if(!this.numForm.valid) {
      this.grid = null;
      return;
    }

    this.valueEmitter.next(this.numForm.getRawValue());
  }

  private validateSum(control: AbstractControl) : ValidationErrors | null {
    let valid = control.value >= this.min && control.value <= this.max;
    return valid ? null : { invalidRange: true };
  }
}
