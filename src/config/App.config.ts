export const REACT_APP_BASE_URL: string = "https://lovely-direct-magpie.ngrok-free.app";
// export const REACT_APP_BASE_URL: string = "http://localhost:5000";

/** Browser must send this for ngrok free; otherwise ngrok can return an HTML interstitial (Postman is unaffected). */
export const ngrokBrowserHeaders: Readonly<Record<string, string>> = REACT_APP_BASE_URL.includes("ngrok")
    ? { "ngrok-skip-browser-warning": "true" }
    : {};
export const REACT_APP_SECRET_KEY: string = "Eyul6X4=wbDS&EA7Cv0Xj5C1*%j|BA5DwskcPnvex44q1WjsFr";
export const REACT_APP_PUBLISHABLE_KEY = "pk_test_51PcBC7KIkVXvxevzxo9JLi0GjXO7yuXn0iF2hflRzbDrzcgOdNGAA2KwD9uayN468X5xlgdFiO70gxCpgqXO8r6u00I72d6qR8";