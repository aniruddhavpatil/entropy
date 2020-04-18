class InnerRewriter {
  constructor(method, content) {
    this.method = method;
    this.content = content;
  }

  element(element) {
    if (this.method === 'append') element.append(this.content);
    else element.setInnerContent(this.content);
  }
}

export default InnerRewriter;
