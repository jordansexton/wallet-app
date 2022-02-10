import { useCallback } from 'react'
import { useDebouncedCallback } from 'use-debounce'

export const SUPPORTED_CURRENCIES = {
  AED: 'United Arab Emirates Dirham',
  ARS: 'Argentine Peso',
  AUD: 'Australian Dollar',
  BDT: 'Bangladeshi Taka',
  BHD: 'Bahraini Dinar',
  BMD: 'Bermudian Dollar',
  BRL: 'Brazil Real',
  CAD: 'Canadian Dollar',
  CHF: 'Swiss Franc',
  CLP: 'Chilean Peso',
  CZK: 'Czech Koruna',
  DKK: 'Danish Krone',
  EUR: 'Euro',
  GBP: 'British Pound Sterling',
  HKD: 'Hong Kong Dollar',
  HUF: 'Hungarian Forint',
  ILS: 'Israeli New Shekel',
  INR: 'Indian Rupee',
  KWD: 'Kuwaiti Dinar',
  LKR: 'Sri Lankan Rupee',
  MMK: 'Burmese Kyat',
  MXN: 'Mexican Peso',
  MYR: 'Malaysian Ringgit',
  NGN: 'Nigerian Naira',
  NOK: 'Norwegian Krone',
  NZD: 'New Zealand Dolloar',
  PHP: 'Philippine Peso',
  PKR: 'Pakistani Rupee',
  PLN: 'Polish Zloty',
  SAR: 'Saudi Riyal',
  SEK: 'Swedish Krona',
  SGD: 'Singapore Dollar',
  THB: 'Thai Baht',
  TRY: 'Turkish Lira',
  UAH: 'Ukrainian hryvnia',
  USD: 'United States Dollar',
  VEF: 'Venezuelan bolívar fuerte',
  VND: 'Vietnamese đồng',
  XDR: 'IMF Special Drawing Rights',
  ZAR: 'South African Rand',
} as Record<string, string>

//  TODO: Merge this into BalanceProvider? Or Create a new provider?
const useCurrency = () => {
  const toggle = useCallback(() => {
    // TODO
    // dispatch(updateSetting({ key: 'convertHntToCurrency', value: !convert }))
  }, [])

  const toggleConvertHntToCurrency = useDebouncedCallback(toggle, 700, {
    leading: true,
    trailing: false,
  })

  return {
    toggleConvertHntToCurrency,
  }
}

export default useCurrency
