import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatInputModule, MatSelectModule } from '@angular/material';

import { SktnPaginationComponent }  from './pagination.component';

@NgModule({
    imports:      [ 
        CommonModule,
        FormsModule,
        MatInputModule,
        MatSelectModule,
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