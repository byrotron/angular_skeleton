import { Component, 
  Input, 
  Output, 
  EventEmitter
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SktnDetailPanelService } from'./detail-panel.service';
import { Location } from '@angular/common';

@Component({
  selector: 'sktn-detail-panel',
  templateUrl: './detail-panel.component.html',
  styleUrls: [
    './detail-panel.component.scss'
  ],
  providers: [
    SktnDetailPanelService
  ]
})
export class SktnDetailPanelComponent {

  @Input()
  title: string;

  @Input()
  form: FormGroup;

  @Input()
  disabled = false

  @Input()
  editing: boolean;

  @Output()
  editingChange: EventEmitter<boolean> = new EventEmitter();

  @Input()
  loading: boolean;

  @Output()
  loadingChange: EventEmitter<boolean> = new EventEmitter();

  @Output()
  submit: EventEmitter<boolean> = new EventEmitter();

  constructor(
    public panel: SktnDetailPanelService,
    public location: Location
  ) {}

  ngOnInit() {
    // this.form.disable();

    this.panel.form = this.form;
    this.panel.editing = this.editing;

    this.panel.submit.subscribe(
      (edit: boolean) => {
        this.update();
      }
    );

  }

  ngOnChanges() {
    this.panel.editing = this.editing;
    if(this.editing === true) {
      this.form.enable();
    } else {
      this.form.disable();
    }
  }

  startEditing() {
    this.editingChange.emit(true);
  }

  stopEditing() {
    this.editingChange.emit(false);
  }

  update() {
    if(this.panel.form.dirty && this.panel.form.valid) {
      this.submit.emit(true);
    }
  }
}
