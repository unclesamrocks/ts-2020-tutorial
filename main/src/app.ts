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
		// toggle listeners
		for (const listenerFn of this.listeners) {
			listenerFn(this.projects.slice())
		}
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
class ProjectList extends ComponentBaseClass<HTMLDivElement, HTMLElement> {
	assignedProjects: ProjectItem[]

	constructor(private type: ProjectStatus) {
		super('project-list', 'app', false, `${type}-projects`)

		this.assignedProjects = []

		this.configure()
		this.renderContent()
	}

	configure() {
		projectState.addListener(projects => {
			this.assignedProjects = projects.filter(proj => proj.status === this.type).map(project => new ProjectItem(this.hostEl.id, project))
			this.renderProjects()
		})
	}

	renderContent() {
		const listId = `${this.type}-project-list`
		this.element.querySelector('ul')!.id = listId
		this.element.querySelector('h2')!.textContent = this.type.toString().toUpperCase() + ' PROJECTS'
	}

	private renderProjects() {
		const listElement = document.getElementById(`${this.type}-project-list`)! as HTMLUListElement
		listElement.innerHTML = ''
		for (const projectItem of this.assignedProjects) {
			listElement.appendChild(projectItem.renderContent())
		}
	}
}

/*==============================================
				Project Item
===============================================*/
class ProjectItem extends ComponentBaseClass<HTMLUListElement, HTMLLIElement> {
	private project: Project

	get numberOfPeople() {
		if (this.project.people === 1) return '1 person'
		return `${this.project.people} persons`
	}

	constructor(hostId: string, project: Project) {
		super('single-project', hostId, false, project.id.toString())
		// saving project instance
		this.project = project
	}

	configure() {}

	renderContent(): HTMLLIElement {
		this.element.querySelector('h2')!.textContent = this.project.title
		this.element.querySelector('h3')!.textContent = this.numberOfPeople + ' assigned'
		this.element.querySelector('p')!.textContent = this.project.desc
		return this.element
	}
}

/*==============================================
				init
===============================================*/
const projInput = new ProjectInput()
const activeProjectlist = new ProjectList(ProjectStatus.Active)
const finishedProjectlist = new ProjectList(ProjectStatus.Finished)
