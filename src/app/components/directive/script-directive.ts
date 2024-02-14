import { DOCUMENT } from '@angular/common';
import { Directive, ElementRef, Inject, AfterViewInit, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Directive({
	selector: '[appDinamicoScript]'
})
export class DynamicScriptDirective implements AfterViewInit, OnInit {

    constructor(private el: ElementRef,@Inject(DOCUMENT) private document: Document) {
    }


    ngOnInit(): void {
        console.log("DynamicScriptDirective");
    }

    ngAfterViewInit() {
        const templateEl = this.el.nativeElement.firstElementChild as HTMLElement;
        if (templateEl) {
            this.replaceDivWithScript(templateEl);
        }
    }

	private replaceDivWithScript(templateEl: HTMLElement) {
		const script = this.document.createElement('script');
		this.copyAttributesFromTemplateToScript(templateEl, script);
		this.copyTemplateContentToScript(templateEl, script);
		templateEl.remove();
		this.el.nativeElement.appendChild(script);
	}

	private copyAttributesFromTemplateToScript(templateEl: HTMLElement, script: HTMLScriptElement) {
		for (let a = 0; a < templateEl.attributes.length; a++) {
			script.attributes.setNamedItem(templateEl.attributes[a].cloneNode() as Attr);
		}
	}

	private copyTemplateContentToScript(templateEl: HTMLElement, script: HTMLScriptElement) {
		const scriptContent = this.document.createTextNode(templateEl.textContent || '');
		script.appendChild(scriptContent);
	}
}