import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SigleCarComponent } from './sigle-car.component';

describe('SigleCarComponent', () => {
  let component: SigleCarComponent;
  let fixture: ComponentFixture<SigleCarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SigleCarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SigleCarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
