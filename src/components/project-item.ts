namespace App{
      
    //ProjectItem class
    export class ProjectItem
    extends Component<HTMLUListElement, HTMLLIElement>
    implements Draggable
  {
    private project: Project;
  
    get person() {
      if (this.project.numOfPeople === 1) {
        return "1 person";
      } else {
        return `${this.project.numOfPeople} persons`;
      }
    }
  
    constructor(hostId: string, project: Project) {
      super("single-project", hostId, false, project.id);
      this.project = project;
      this.configure();
      this.renderContent();
    }
    @autobind
    dragStartHandler(event: DragEvent) {
      event.dataTransfer!.setData("text/plain", this.project.id);
      event.dataTransfer!.effectAllowed = "move";
    }
    @autobind
    dragEndHandler(_: DragEvent) {
      console.log("drag end");
    }
    configure() {
      this.element.addEventListener("dragstart", this.dragStartHandler);
      this.element.addEventListener("dragend", this.dragEndHandler);
    }
    renderContent() {
      this.element.querySelector("h2")!.textContent = this.project.title;
      this.element.querySelector("h3")!.textContent = this.person + " assigned";
      this.element.querySelector("p")!.textContent = this.project.desc;
    }
  }
  }