import { Injectable } from '@angular/core';

@Injectable()
export class SktnFileReaderService {

  file_string: string;

  result: Promise<any>;
  progress: Promise<number>;

  readFile(fileToRead: File, type: 'URL' | 'TXT' = 'URL') {
    
    let reader = new FileReader();
    
    this.result = new Promise((resolve, reject) => {
      reader.onload = (event: ProgressEvent & any) => {
        resolve(event.target.result);
      }
      reader.onerror = (err: ProgressEvent) => {
        reject(err); 
      }
    });

    this.progress = new Promise((resolve, reject) => {
      reader.onprogress = (data: ProgressEvent) => {
        if (data.lengthComputable) {
          let progress = (data.loaded / data.total) * 100;                                          
          resolve(progress);
        }
      }
    });

    if(type === "URL") {
      reader.readAsDataURL(fileToRead);
    } else if(type === "TXT") {
      reader.readAsText(fileToRead);
    }
  }

  readCSV(csv: string, options = {delimiter: ','}): Array<string[]> {

    let allTextLines = csv.split(/\r\n|\n/);
    let lines = [];
    for (let i=0; i<allTextLines.length; i++) {
      let data = allTextLines[i].split(options.delimiter);
      let tarr = [];
      for (let j=0; j<data.length; j++) {
          tarr.push(data[j]);
      }
      lines.push(tarr);
    }
    return lines;

  }
  
}