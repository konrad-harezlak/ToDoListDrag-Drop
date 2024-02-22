namespace App{
    //ProjectInput class
  export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
    titleInputElement: HTMLInputElement;
    descInputElement: HTMLInputElement;
    peopleInputElement: HTMLInputElement;
    constructor() {
      super("project-input", "app", true, "user-input");
      this.titleInputElement = this.element.querySelector(
        "#title"
      ) as HTMLInputElement;
      this.descInputElement = this.element.querySelector(
        "#description"
      ) as HTMLInputElement;
      this.peopleInputElement = this.element.querySelector(
        "#people"
      ) as HTMLInputElement;
      this.configure();
    }
    configure() {
      this.element.addEventListener("submit", this.submitHandler);
    }
    renderContent(): void {}

    private clearInputs() {
      this.titleInputElement.value = "";
      this.descInputElement.value = "";
      this.peopleInputElement.value = "";
    }
    private gatherUserInput(): [string, string, number] | void {
      const enteredTitle = this.titleInputElement.value;
      const enteredDesc = this.descInputElement.value;
      const enteredPeople = this.peopleInputElement.value;

      const titleValidatable: Validatable = {
        value: enteredTitle,
        required: true,
      };
      const descValidatable: Validatable = {
        value: enteredDesc,
        required: true,
        minLength: 5,
      };
      const poepleValidatable: Validatable = {
        value: +enteredPeople,
        required: true,
        min: 1,
        max: 5,
      };

      if (
        !validate(titleValidatable) ||
        !validate(descValidatable) ||
        !validate(poepleValidatable)
      ) {
        alert("Invalid Input");
        return;
      } else {
        return [enteredTitle, enteredDesc, +enteredPeople];
      }
    }

    @autobind
    private submitHandler(event: Event) {
      event.preventDefault();
      const userInput = this.gatherUserInput();
      if (Array.isArray(userInput)) {
        const [title, desc, people] = userInput;
        projectState.addProject(title, desc, people);
        this.clearInputs();
      }
    }
  }
}