import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'questionPrefix'
})
export class QuestionPrefixPipe implements PipeTransform {

  transform(question: string, index: number): string {
    return `Q${index + 1}: ${question}`;
  }

}
