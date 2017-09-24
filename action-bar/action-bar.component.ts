import { Component, ComponentFactoryResolver, ViewChild, ViewContainerRef, ComponentRef, Input, HostBinding } from '@angular/core';
import { SktnActionBarDirective } from './action-bar.directive';
import { ActionbarToggle } from './actionbar-toggle';

@Component({
  selector: 'sktn-action-bar',
  templateUrl: './action-bar.component.html',
  styleUrls: [
    './action-bar.component.scss'
  ],
  animations: [
    ActionbarToggle
  ]
})
export class SktnActionBarComponent {

  @Input()
  @HostBinding('@slidetoggle')
  show: 'hide' | 'show' = 'hide';

  @ViewChild(SktnActionBarDirective, {read: ViewContainerRef}) action_bar: ViewContainerRef;

  ref: ComponentRef<any>;

  constructor(
    protected componentFactoryResolver: ComponentFactoryResolver
  ) {}

  toggle() {
    
    if(this.show === 'show') {
      this.show = 'hide';
    } else if(this.show === 'hide') {
      this.show = 'show';
    }
    
  }

  addComponent(component: any, data: any) {
    
    this.action_bar.clear();
    const factory = this.componentFactoryResolver.resolveComponentFactory(component);
    this.ref =  this.action_bar.createComponent(factory);
    if(data) {
      this.ref.instance.data = data;
    }
    this.ref.changeDetectorRef.detectChanges();
    
  }
 
}
