// HTMLRewriter class facilitating replacement of an attribute value of an element.
class AttributeRewriter {
  constructor(attribute, oldContent, newContent) {
    this.attribute = attribute;
    this.old_content = oldContent;
    this.new_content = newContent;
  }

  element(element) {
    const attribute = element.getAttribute(this.attribute);
    if (attribute) {
      element.setAttribute(
        this.attribute,
        attribute.replace(this.old_content, this.new_content),
      );
    }
  }
}

export default AttributeRewriter;
