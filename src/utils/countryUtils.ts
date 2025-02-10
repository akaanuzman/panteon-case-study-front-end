import { PlayerCountries } from '../types/countries';

/**
 * Interface for country information
 */
interface CountryInfo {
  code: string;
  name: string;
}

/**
 * Map of country codes to their full names and flag availability
 */
export const COUNTRY_INFO: Record<PlayerCountries, CountryInfo> = {
  [PlayerCountries.USA]: { code: 'US', name: 'United States' },
  [PlayerCountries.UNITED_KINGDOM]: { code: 'GB', name: 'United Kingdom' },
  [PlayerCountries.GERMANY]: { code: 'DE', name: 'Germany' },
  [PlayerCountries.FRANCE]: { code: 'FR', name: 'France' },
  [PlayerCountries.TURKEY]: { code: 'TR', name: 'Turkey' },
  [PlayerCountries.ITALY]: { code: 'IT', name: 'Italy' },
  [PlayerCountries.SPAIN]: { code: 'ES', name: 'Spain' },
  [PlayerCountries.BRAZIL]: { code: 'BR', name: 'Brazil' },
  [PlayerCountries.INDIA]: { code: 'IN', name: 'India' },
  [PlayerCountries.CHINA]: { code: 'CN', name: 'China' },
  [PlayerCountries.JAPAN]: { code: 'JP', name: 'Japan' },
  [PlayerCountries.SOUTH_KOREA]: { code: 'KR', name: 'South Korea' },
  [PlayerCountries.CANADA]: { code: 'CA', name: 'Canada' },
  [PlayerCountries.AUSTRALIA]: { code: 'AU', name: 'Australia' },
  [PlayerCountries.NETHERLANDS]: { code: 'NL', name: 'Netherlands' },
  [PlayerCountries.SWEDEN]: { code: 'SE', name: 'Sweden' },
  [PlayerCountries.NORWAY]: { code: 'NO', name: 'Norway' },
  [PlayerCountries.MEXICO]: { code: 'MX', name: 'Mexico' },
  [PlayerCountries.RUSSIA]: { code: 'RU', name: 'Russia' },
  [PlayerCountries.ARGENTINA]: { code: 'AR', name: 'Argentina' },
  [PlayerCountries.POLAND]: { code: 'PL', name: 'Poland' },
  [PlayerCountries.SWITZERLAND]: { code: 'CH', name: 'Switzerland' },
  [PlayerCountries.PORTUGAL]: { code: 'PT', name: 'Portugal' },
  [PlayerCountries.GREECE]: { code: 'GR', name: 'Greece' },
  [PlayerCountries.IRELAND]: { code: 'IE', name: 'Ireland' },
};

/**
 * Get the full country name from a country code
 * @param code - The two-letter country code
 * @returns The full country name or the code if not found
 */
export const getCountryName = (code: string): string => {
  const countryInfo = Object.values(COUNTRY_INFO).find(
    info => info.code.toLowerCase() === code.toLowerCase()
  );
  return countryInfo?.name || code;
};

/**
 * Get the flag image path for a country code
 * @param code - The two-letter country code
 * @returns The path to the flag image or undefined if not available
 */
export const getCountryFlagPath = (code: string): string | undefined => {
  return `/flags/${code.toLowerCase()}.svg`;
}; 