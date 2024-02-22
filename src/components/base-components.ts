namespace App{
    //Component base class
export abstract class Component<T extends HTMLElement, U extends HTMLElement> {
    templateEl: HTMLTemplateElement;
    destEl: T;
    element: U;

    constructor(
      templateElId: string,
      destElId: string,
      insertAtStart: boolean,
      newElId?: string
    ) {
      this.templateEl = <HTMLTemplateElement>(
        document.getElementById(templateElId)
      );
      this.destEl = document.getElementById(destElId) as T;

      const importedNode = document.importNode(this.templateEl.content, true);
      this.element = importedNode.firstElementChild as U;
      if (newElId) {
        this.element.id = newElId;
      }
      this.attach(insertAtStart);
    }
    private attach(insertAtStart: boolean) {
      this.destEl.insertAdjacentElement(
        insertAtStart ? "afterbegin" : "beforeend",
        this.element
      );
    }
    abstract configure(): void;
    abstract renderContent(): void;
  }
}