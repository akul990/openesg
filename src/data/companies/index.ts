export type { CompanyData, ExtData } from "./types";

import orsted     from "./orsted";
import vestas     from "./vestas";
import schneider  from "./schneider";
import iberdrola  from "./iberdrola";
import sap        from "./sap";
import unilever   from "./unilever";
import salesforce from "./salesforce";
import enel       from "./enel";
import roche      from "./roche";
import adobe      from "./adobe";
import microsoft  from "./microsoft";
import mastercard from "./mastercard";
import apple      from "./apple";
import tesla      from "./tesla";
import exxonmobil from "./exxonmobil";

import type { CompanyData, ExtData } from "./types";

export const companies: CompanyData[] = [
  orsted,
  vestas,
  schneider,
  iberdrola,
  sap,
  unilever,
  salesforce,
  enel,
  roche,
  adobe,
  microsoft,
  mastercard,
  apple,
  tesla,
  exxonmobil,
];

export const EXTENDED: Record<string, ExtData> = Object.fromEntries(
  companies.map((c) => [c.ticker, c.extended])
);
