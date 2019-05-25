export function buildColorStr(colorHex) {
  return `color: ${colorHex}`;
}

const ColorReg = /color: (\S+)/; // 与上面的 buildColorStr 的形式保持一致

export function parseColor(text) {
  const colorExecResult = ColorReg.exec(text);
  if (colorExecResult) {
    return {
      color: colorExecResult[1],
      wholeWord: colorExecResult[0],
    };
  }
  return null;
}
