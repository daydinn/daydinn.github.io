import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Pipe({
  name: 'safeUrl',
})
//Diese klasse wird für das Youtube-Video im Home-Komponenten benutzt.
export class SafeUrlPipe implements PipeTransform {
  // Constructor der Klasse, der eine Instanz von DomSanitizer injiziert.
  // DomSanitizer wird verwendet, um URLs als sicher zu markieren und zu verhindern,
  // dass Angular sie als potenziell schädlich blockiert.

  constructor(private domSanitizer: DomSanitizer) {}

  transform(url: string): SafeResourceUrl {
    return this.domSanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
