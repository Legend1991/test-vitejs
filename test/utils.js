export default class Utils {
  static makeChangeEvent(value) {
    return { target: { value } };
  }

  static makeKeyUpEvent(key, value) {
    return { key, target: { value } };
  }
}
