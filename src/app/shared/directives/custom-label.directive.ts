import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { ValidationErrors } from '@angular/forms'

@Directive({
  selector: '[customLabel]'
})
export class CustomLabelDirective implements OnInit {

  private htmlElement?: ElementRef<HTMLElement>;
  private _color: string = 'red';
  private _errors?: ValidationErrors | null;

  @Input() set color(value: string) {
    console.log({ color: value });
    this._color = value;
    this.setStyle();
  }

  @Input() set errors(value: ValidationErrors | null | undefined) {
    this._errors = value;
    console.log(value)
    this.setErrorMessage();
  }

  constructor(private el: ElementRef<HTMLElement>) {
    // console.log('Contructor de la directiva');
    // console.log(el);
    this.htmlElement = el;
  }

  ngOnInit(): void {
    console.log('Directiva ngOnInit');
  }

  setStyle(): void {
    if (!this.htmlElement) return;
    this.htmlElement!.nativeElement.style.color = this._color;
  }

  setErrorMessage(): void {
    if (!this.htmlElement) return;
    if (!this._errors) {
      this.htmlElement.nativeElement.innerText = 'No hay errores';
      return;
    }

    const errors = Object.keys(this._errors);
    console.log(errors)

    if (errors.includes('required')){
      this.htmlElement.nativeElement.innerText = 'Este campo es requerido';
      return;
    }
    if (errors.includes('minlength')){
      this.htmlElement.nativeElement.innerText = 'Debe tener al menos 6 caracteres';
      return;
    }
    if (errors.includes('email')){
      this.htmlElement.nativeElement.innerText = 'Debe ser una dirección de email';
      return;
    }
  }

}
