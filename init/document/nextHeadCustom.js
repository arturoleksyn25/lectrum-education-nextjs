// Core
import { Head } from 'next/document';

export class NextHeadCustom extends Head {
  getPreloadMainLinks() {
    return [];
  }
}
