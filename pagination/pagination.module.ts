import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MdInputModule, MdSelectModule } from '@angular/material';

import { SktnPaginationComponent }  from './pagination.component';

@NgModule({
    imports:      [ 
        CommonModule,
        FormsModule,
        MdInputModule,
        MdSelectModule,
        FlexLayoutModule
    ],
    declarations: [
        SktnPaginationComponent
    ],
    exports: [
        SktnPaginationComponent
    ]
})
export class SktnPaginationModule { }