import { NgModule } from '@angular/core';
import { DynamicScriptDirective } from './script-directive';

@NgModule({
    declarations: [
        DynamicScriptDirective
    ],
    imports: [
        // Add any required modules here
    ],
    exports: [DynamicScriptDirective],
    providers: [
        // Add your service providers here
    ],
    bootstrap: [
        // Add your root component here
    ]
})
export class DirectivasModule { }