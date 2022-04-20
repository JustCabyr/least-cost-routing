import * as fs from 'fs';
import * as path from 'path';

export const csvToArray = async (filename: string) => {
  const emissions = await fs.readFileSync(
    path.resolve(__dirname, `../../temp/${filename}.csv`),
    'utf8'
  );
  const array = emissions.split('\r\n');
  let result = [];

  let headers: string[] = array[0].split(';');

  for (let i = 1; i < array.length - 1; i++) {
    let obj: any = {};

    let str = array[i];
    let s = '';

    let flag = 0;
    for (let ch of str) {
      if (ch === '"' && flag === 0) {
        flag = 1;
      } else if (ch === '"' && flag == 1) flag = 0;
      if (ch === ';' && flag === 0) ch = '|';
      if (ch !== '"') s += ch;
    }

    let properties = s.split('|');

    for (let j in headers) {
      if (properties[j].includes(';')) {
        obj[headers[j]] = properties[j].split(';').map((item) => item.trim());
      } else obj[headers[j]] = properties[j];
    }

    result.push(obj);
  }
  return result;
};
