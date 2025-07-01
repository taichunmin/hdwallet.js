import { DictionaryInterface } from './interfaces';

export function toLowerCase(data: string | boolean | number, searchValue?: RegExp, replaceValue?: string): string {
  return searchValue && replaceValue ? data.toString().toLowerCase().replace(searchValue, replaceValue) : data.toString().toLowerCase();
}

export function toUpperCase(data: string | boolean | number, searchValue?: RegExp, replaceValue?: string): string {
  return searchValue && replaceValue ? data.toString().toUpperCase().replace(searchValue, replaceValue) : data.toString().toUpperCase();
}

export function toTitleCase(data: string, searchValue?: RegExp, replaceValue?: string): string {
  for (let titleCase of [
    'Standard-2FA', 'Segwit-2FA',
    'ALL', 'Kholaw-Ed25519', 'SLIP10-Ed25519', 'SLIP10-Ed25519-Blake2b', 'SLIP10-Ed25519-Monero', 'SLIP10-Nist256p1', 'SLIP10-Secp256k1',
    'BIP39', 'BIP38', 'BIP32', 'BIP44', 'BIP49', 'BIP84', 'BIP86', 'BIP141', 'CIP1852', 'HDW',
    'XPrivate-Key', 'XPublic-Key',
    'P2PKH', 'P2SH', 'P2TR', 'P2WPKH', 'P2WSH', 'P2WPKH-In-P2SH', 'P2WSH-In-P2SH'
  ]) {
    if (toLowerCase(titleCase, searchValue, replaceValue) === toLowerCase(data, searchValue, replaceValue)) {
      return searchValue && replaceValue ? titleCase.replace(searchValue, replaceValue) : titleCase;
    }
  }
  const titleCase: string = data.replace(/\b\w+/g, (text: string): string => toUpperCase(text.charAt(0)) + toLowerCase(text.substr(1)));
  return searchValue && replaceValue ? titleCase.replace(searchValue, replaceValue) : titleCase;
}

export function toBoolean(value: string): boolean {
  if (['true', true, '1', 1].includes(value)) { return true; }
  else if (['false', false, '0', 0].includes(value)) { return false; }
  throw new Error('Invalid boolean data');
}

export function replaceUnderscore2Hyphen(dictionary: DictionaryInterface): DictionaryInterface {
  let resultDictionary: DictionaryInterface = { };
  for (const key in dictionary) {
    if (dictionary.hasOwnProperty(key)) {
      const newKey = key.includes('_') ? key.replace(/_/g, '-') : key;
      resultDictionary[toLowerCase(newKey)] = dictionary[key];
    }
  }
  return resultDictionary;
}

export function replaceHyphen2Underscore(dictionary: DictionaryInterface): DictionaryInterface {
  let resultDictionary: DictionaryInterface = { };
  for (const key in dictionary) {
    if (dictionary.hasOwnProperty(key)) {
      const newKey = key.includes('-') ? key.replace(/-/g, '_') : key;
      resultDictionary[toLowerCase(newKey)] = dictionary[key];
    }
  }
  return resultDictionary;
}

export function syntaxJSONHighlight(
  data: any, key: string = '#83b9ff', valueFirst: string = '#ffffff', valueSecond: string = '#FFA500'
): string {
  if (typeof data !== 'string') {
    data = JSON.stringify(data, undefined, 2);
  }
  data = data.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return data.replace(
    /("(\\u[\da-fA-F]{4}|\\[^u]|[^\\"])*")(\s*:)?|\b(true|false|null)\b|\b\d+(\.\d+)?\b|[{}[\],:]/g,
    function (match: string, p1: string, p2: string, p3: string): string {
      let style: string = '';

      if (p1 && p3) {
        return `<code style="color: ${key};">${p1}</code><code style="color: ${valueFirst};">:</code>`;
      } else if (p1) {
        style = `color: ${valueFirst};`;
        return `<code style="${style}">${p1}</code>`;
      } else if (/true|false/.test(match)) {
        style = `color: ${valueSecond};`;
      } else if (/null/.test(match)) {
        style = `color: ${valueSecond};`;
      } else if (/\b\d+(\.\d+)?\b/.test(match)) {
        style = `color: ${valueSecond};`;
      } else if (/[{}[\],:]/.test(match)) {
        style = `color: ${valueFirst};`;
      }
      return `<code style="${style}">${match}</code>`;
    }
  );
}

export function syntaxCSVHighlight(data: any[][]): string {
  let result: string = '';
  const pathRegex = /^m(\/(\d+(-\d+)?'?)?)+$/;
  function applyStyle(value: any): string {
    if (typeof value === 'string') {
      if (pathRegex.test(value)) {
        return `<code style="color: #83b9ff; letter-spacing: 0">${value}</code>`;
      } else {
        return `<code style="color: #ffffff;">${value}</code>`;
      }
    } else if (typeof value === 'number') {
      return `<code style="color: #FFA500;">${value}</code>`;
    } else if (typeof value === 'boolean') {
      return `<code style="color: #FFA500;">${value}</code>`;
    } else if (value === null || value === 'null') {
      return `<code style="color: #FFA500;">null</code>`;
    } else if (Array.isArray(value) || typeof value === 'object') {
      return `<span>${syntaxJSONHighlight(value).replace(/\s+/g, ' ')}</span>`;
    } else {
      return String(value);
    }
  }
  result = data.map(row => row.map(cell => applyStyle(cell)).join(', ')).join('\n');
  return result;
}

export function convertToWords(value: number): string {
  const ones: string[] = [
    '', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine',
    'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen',
    'seventeen', 'eighteen', 'nineteen'
  ];
  const tens: string[] = [
    '', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'
  ];
  const scales: string[] = ['', 'THOUSAND', 'MILLION', 'BILLION', 'TRILLION'];
  if (value === 0) return 'ZERO';
  if (value < 0) return 'MINUS-' + numberToWords(Math.abs(value));
  return numberToWords(value);
  // Helper function inside the main function
  function numberToWords(num: number): string {
    let word = '';
    let scaleIndex = 0;
    while (num > 0) {
      const chunk = num % 1000;
      if (chunk > 0) {
        const chunkInWords = chunkToWords(chunk).toUpperCase();
        word = chunkInWords + (scales[scaleIndex] ? '-' + scales[scaleIndex] : '') + ' ' + word;
      }
      num = Math.floor(num / 1000);
      scaleIndex++;
    }
    return word.trim().replace(/\s+/g, '-'); // Replace spaces with underscores
  }
  // Helper function to convert a chunk of up to three digits into words
  function chunkToWords(num: number): string {
    let words = '';
    if (num > 99) {
      words += ones[Math.floor(num / 100)] + ' hundred ';
      num %= 100;
    }
    if (num > 19) {
      words += tens[Math.floor(num / 10)] + ' ';
      num %= 10;
    }
    words += ones[num];
    return words.trim();
  }
}

export function generatePassphrase(
  length: number, upperCase: boolean, lowerCase: boolean, numbers: boolean, characters: boolean
): string {

  let charset: string = '';
  if (upperCase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  if (lowerCase) charset += 'abcdefghijklmnopqrstuvwxyz';
  if (numbers) charset += '0123456789';
  if (characters) charset += '!@#$%^&*()_+[]{}|`~;:,.<>?-=<>"';

  return !charset ? ' '.repeat(length) : Array.from(
    { length }, () => charset[Math.floor(
      Math.random() * charset.length
    )]
  ).join('');
}

export function getDateTimeStamp(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

export function saveAsJSON(data: any, name: string): void {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url: string = window.URL.createObjectURL(blob);
  const a: HTMLAnchorElement = document.createElement('a');
  a.href = url;
  a.download = `${name}.json`;
  a.click();
  window.URL.revokeObjectURL(url);
}

export function saveAsCSV(data: any[][], name: string): void {
  const csvContent: any = data.map(
    (row: any[]): any => row.map((item: any): string => {
      return (Array.isArray(item) || typeof item === 'object') ? JSON.stringify(item) : String(item).replace(/"/g, '""')
    }).join(',')
  ).join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url: string = window.URL.createObjectURL(blob);
  const a: HTMLAnchorElement = document.createElement('a');
  a.href = url;
  a.download = `${name}.csv`;
  a.click();
  window.URL.revokeObjectURL(url);
}

export function fallbackCopyText(text: string): boolean {
  const textarea: HTMLTextAreaElement = document.createElement('textarea');
  textarea.value = text;
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();
  try {
    const successful: boolean = document.execCommand('copy');
    document.body.removeChild(textarea);
    return successful;
  } catch {
    document.body.removeChild(textarea);
    return false;
  }
}

export async function copyToClipboard(content: string): Promise<boolean> {
  if (navigator.clipboard && navigator.clipboard.writeText) {
      return await navigator.clipboard.writeText(
        content
      ).then((): boolean => {
        return true;
      }).catch((): boolean => {
        return fallbackCopyText(content);
      });
  } else {
      return fallbackCopyText(content);
  }
}

export function objectIsIncluded(items: any[], item: any): boolean {
  let isValid: boolean = false;
  for (let data of items) {
    if (JSON.stringify(data) === JSON.stringify(item)) {
      isValid = true;
      break;
    }
  }
  return isValid;
}
