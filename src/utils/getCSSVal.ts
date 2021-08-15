export const getCSSVal = (cssVarName: string): string => {
  return getComputedStyle(document.documentElement).getPropertyValue(cssVarName)
}
