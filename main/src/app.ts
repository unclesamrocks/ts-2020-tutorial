/*==============================================
			Drag & Drop Interfaces
===============================================*/
interface Draggable {
	dragStartHandler(e: DragEvent): void
	dragEndHandler(e: DragEvent): void
}

interface DragTarget {
	dragOverHandler(e: DragEvent): void
	dropHandler(e: DragEvent): void
	dragLeaveHandler(e: DragEvent): void
}

/*==============================================
				Validation
===============================================*/

interface ValidationObj {
	value: string | number
	required?: boolean
	minLength?: number
	maxLength?: number
	min?: number
	max?: number
}

function validate(obj: ValidationObj): boolean {
	// console.log('[validation]', obj)
	let isValid = true
	if (!obj.required) return true
	if (obj.minLength != null && obj.value.toString().trim().length < obj.minLength) isValid = false
	if (obj.maxLength != null && obj.value.toString().trim().length > obj.maxLength) isValid = false
	if (obj.min != null && obj.value < obj.min) isValid = false
	if (obj.max != null && obj.value > obj.max) isValid = false
	// console.log('[validation][result]', isValid)
	return isValid
}

/*==============================================
				Autobind
===============================================*/

function autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
	const originalMethod = descriptor.value
	const adjustedDescriptor: PropertyDescriptor = {
		configurable: true,
		get() {
			const boundFn = originalMethod.bind(this)
			return boundFn
		}
	}
	return adjustedDescriptor
}

/*==============================================
			Component Base Class
===============================================*/
abstract class ComponentBaseClass<H extends HTMLElement, E extends HTMLElement> {
	templateEl: HTMLTemplateElement
	hostEl: H
	element: E

	constructor(templateId: string, hostElement: string, insertAtStart: boolean, newElementId?: string) {
		// selectors -> DOM elements
		this.templateEl = document.getElementById(templateId) as HTMLTemplateElement
		this.hostEl = document.getElementById(hostElement) as H

		// content
		const importedHTMLContent = document.importNode(this.templateEl.content, true)
		this.element = importedHTMLContent.firstElementChild as E
		if (newElementId) this.element.id = newElementId

		// init
		this.attach(insertAtStart)
	}

	private attach(insertAtStart: boolean) {
		this.hostEl.insertAdjacentElement(insertAtStart ? 'afterbegin' : 'beforeend', this.element)
	}

	abstract configure(): void
	abstract renderContent(): void
}

/*==============================================
				Project Class
===============================================*/
enum ProjectStatus {
	Active = 'active',
	Finished = 'finished'
}

class Project {
	constructor(public id: number, public title: string, public desc: string, public people: number, public status: ProjectStatus) {}
}

/*==============================================
				State Class
===============================================*/
type Listener<T> = (items: T[]) => void

abstract class State<T> {
	protected listeners: Listener<T>[] = []

	addListener(listenerFn: Listener<T>) {
		this.listeners.push(listenerFn)
	}
}

/*==============================================
				Project State
===============================================*/
class ProjectState extends State<Project> {
	private projects: Project[] = []
	private static instance: ProjectState

	private constructor() {
		super()
	}

	static getInstance(): ProjectState {
		if (this.instance) return this.instance
		this.instance = new ProjectState()
		return this.instance
	}

	addProject(title: string, desc: string, people: number) {
		const newProject: Project = new Project(Date.now(), title, desc, people, ProjectStatus.Active)
		console.log('[ProjectState][newProject]', newProject)
		this.projects.push(newProject)
		this.toggleListeners()
	}

	updateProject(id: string, newType: ProjectStatus) {
		const project = this.projects.find(project => project.id.toString() === id)
		if (project && project.status !== newType) {
			// this.projects = this.projects.map(project => {
			// 	if (project.id.toString() === id) project.status = newType
			// 	return project
			// })
			project.status = newType
			this.toggleListeners()
		}
	}

	private toggleListeners() {
		this.listeners.forEach(listenerFn => listenerFn(this.projects.slice()))
	}
}

const projectState = ProjectState.getInstance()

/*==============================================
				Project Input Class
===============================================*/
class ProjectInput extends ComponentBaseClass<HTMLDivElement, HTMLFormElement> {
	titleInput: HTMLInputElement
	descInput: HTMLInputElement
	peopleInput: HTMLInputElement

	constructor() {
		super('project-input', 'app', true, 'user-input')

		// inputs access
		this.titleInput = this.element.querySelector('#title')! as HTMLInputElement
		this.descInput = this.element.querySelector('#description')! as HTMLInputElement
		this.peopleInput = this.element.querySelector('#people')! as HTMLInputElement

		// configure
		this.configure()
	}

	configure() {
		this.element.addEventListener('submit', this.submitHandler)
	}

	renderContent() {}

	private gatherUserInput(): [string, string, number] | void {
		const title: ValidationObj = {
			value: this.titleInput.value,
			required: true,
			minLength: 2
		}
		const desc: ValidationObj = {
			value: this.descInput.value,
			required: true,
			minLength: 5
		}
		const people: ValidationObj = {
			value: +this.peopleInput.value,
			required: true,
			min: 1
		}
		if (!validate(title) || !validate(desc) || !validate(people)) {
			throw new Error('Invalid input')
		}
		return [title.value as string, desc.value as string, people.value as number]
	}

	@autobind
	private submitHandler(e: Event) {
		e.preventDefault()
		const userInput = this.gatherUserInput()
		if (Array.isArray(userInput) && userInput.length === 3) {
			const [title, desc, people] = userInput
			// to do
			projectState.addProject(title, desc, people)
			this.clearInputs()
		}
	}

	private clearInputs() {
		this.titleInput.value = ''
		this.descInput.value = ''
		this.peopleInput.value = ''
	}
}

/*==============================================
			Project List Class
===============================================*/
class ProjectList extends ComponentBaseClass<HTMLDivElement, HTMLElement> implements DragTarget {
	assignedProjects: Project[]

	constructor(private type: ProjectStatus) {
		super('project-list', 'app', false, `${type}-projects`)

		this.assignedProjects = []

		this.configure()
		this.renderContent()
	}

	configure() {
		projectState.addListener(projects => {
			this.assignedProjects = projects.filter(proj => proj.status === this.type)
			this.renderProjects()
		})
		// drag & drop events
		this.element.addEventListener('dragover', this.dragOverHandler)
		this.element.addEventListener('drop', this.dropHandler)
		this.element.addEventListener('dragleave', this.dragLeaveHandler)
	}

	renderContent() {
		const listId = `${this.type}-project-list`
		this.element.querySelector('ul')!.id = listId
		this.element.querySelector('h2')!.textContent = this.type.toString().toUpperCase() + ' PROJECTS'
	}

	@autobind
	dragOverHandler(e: DragEvent) {
		if (e.dataTransfer && e.dataTransfer.types[0] === 'text/plain') {
			/**
			 * drop ONLY allowed if `dragover` event is preventDefault()
			 */
			e.preventDefault()
			this.element.querySelector('ul')!.classList.add('droppable')
		}
	}

	@autobind
	dropHandler(e: DragEvent) {
		e.preventDefault()
		console.log('[ProjectList][drop] fired!', this.type)
		this.element.querySelector('ul')!.classList.remove('droppable')
		if (e.dataTransfer && e.dataTransfer.getData('text/plain')) {
			const projectId = e.dataTransfer.getData('text/plain')
			projectState.updateProject(projectId, this.type)
		}
	}

	@autobind
	dragLeaveHandler(e: DragEvent) {
		this.element.querySelector('ul')!.classList.remove('droppable')
	}

	private renderProjects() {
		const listElement = document.getElementById(`${this.type}-project-list`)! as HTMLUListElement
		listElement.innerHTML = ''
		for (const projectItem of this.assignedProjects) {
			new ProjectItem(listElement.id, projectItem)
		}
	}
}

/*==============================================
				Project Item
===============================================*/
class ProjectItem extends ComponentBaseClass<HTMLUListElement, HTMLLIElement> implements Draggable {
	private project: Project

	get numberOfPeople() {
		if (this.project.people === 1) return '1 person'
		return `${this.project.people} persons`
	}

	constructor(hostId: string, project: Project) {
		super('single-project', hostId, false, project.id.toString())
		// saving project instance
		this.project = project

		this.configure()
		this.renderContent()
	}

	@autobind
	dragStartHandler(e: DragEvent) {
		e.dataTransfer!.setData('text/plain', this.project.id.toString())
		e.dataTransfer!.effectAllowed = 'move'
	}

	@autobind
	dragEndHandler(e: DragEvent) {
		console.log('[ProjectItem][dragEnd] fired!')
	}

	configure() {
		this.element.addEventListener('dragstart', this.dragStartHandler)
		this.element.addEventListener('dragend', this.dragEndHandler)
	}

	renderContent() {
		this.element.querySelector('h2')!.textContent = this.project.title
		this.element.querySelector('h3')!.textContent = this.numberOfPeople + ' assigned'
		this.element.querySelector('p')!.textContent = this.project.desc
		this.hostEl.append(this.element)
	}
}

/*==============================================
				init
===============================================*/
const projInput = new ProjectInput()
const activeProjectlist = new ProjectList(ProjectStatus.Active)
const finishedProjectlist = new ProjectList(ProjectStatus.Finished)
