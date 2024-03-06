class Utils {
  static scrollToComponent(id: string) {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }
}

export default Utils;
