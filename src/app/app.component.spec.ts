import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  [
    { size: 4, sum: 9 },
    { size: 5, sum: 21 },
    { size: 3, sum: 22 },
  ].forEach(value => {
    it(`should generate a valid ${value.size}*${value.size} grid with sum of ${value.sum}.`, () => {
      const grid = component.generateGrid(value.size, value.sum);
      const valResult = component.validateGrid(grid, value.sum);
      expect(valResult).toEqual(true);
    });
  });

  it(`invalid lower threshold when sum is less than size.`, () => {
    const size: number = 5;
    const sum: number = 4;

    const result = component.validateLowerThreshold(size, sum);
    expect(result).toEqual(false);
  });

  it(`valid lower threshold when sum is equal to size.`, () => {
    const size: number = 5;
    const sum: number = 5;

    const result = component.validateLowerThreshold(size, sum);
    expect(result).toEqual(true);
  });
});
