import { Component, ComponentFactoryResolver, ViewChild, ViewContainerRef, ComponentRef } from '@angular/core';
import { SktnActionBarService } from './action-bar.service';
import { SktnActionBarDirective } from './action-bar.directive';
import { SlideVerticalToggle } from './../animations/animations';

@Component({
  selector: 'sktn-action-bar',
  templateUrl: './action-bar.component.html',
  styleUrls: [
    './action-bar.component.scss'
  ],
  animations: [
    SlideVerticalToggle
  ]
})
export class SktnActionBarComponent {

  @ViewChild(SktnActionBarDirective, {read: ViewContainerRef}) action_bar: ViewContainerRef;
  ref: ComponentRef<any>;

  constructor(
    protected bar: SktnActionBarService,
    protected componentFactoryResolver: ComponentFactoryResolver
  ) {}

  showActionBar(component: any, data: any) {

    if(this.ref) {
      this.ref.destroy();
    }

    const factory = this.componentFactoryResolver.resolveComponentFactory(component);
    this.ref =  this.action_bar.createComponent(factory);
    this.ref.changeDetectorRef.detectChanges();

    setTimeout(() => {
      this.ref.instance.data = data;
      this.bar.show = 'show';
    }, 1);
  }

  ngAfterViewInit() {

    this.bar.component.subscribe((object: any) => {
      if(object && object.component) {
        this.showActionBar(object.component, object.data);
      }
    });

  }
}
