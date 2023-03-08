// A wrapper for "JSON.parse()"" to support "undefined" value
export const getParsedJSON = <T>(value: string | null): T | undefined => {
  try {
    return value === 'undefined' ? undefined : JSON.parse(value ?? '');
  } catch {
    console.error('JSON parsing error on', { value });
    return undefined;
  }
};
