export default function tryParse(str) {
  try {
    return JSON.parse(str);
  } catch (e) {
    return str;
  }
}
