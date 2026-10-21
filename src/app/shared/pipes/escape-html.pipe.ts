import { Pipe, PipeTransform,SecurityContext } from '@angular/core';

import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({ name: 'keepHtml', pure: true })
export class EscapeHtmlPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {
  }

  transform(content: any): SafeHtml {
    return this.sanitizer.sanitize(SecurityContext.HTML, content) || '';
  }
}