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
				Project State
===============================================*/
type Listener = (items: Project[]) => void

class ProjectState {
	private listeners: any[] = []
	private projects: Project[] = []
	private static instance: ProjectState

	private constructor() {}

	static getInstance(): ProjectState {
		if (this.instance) return this.instance
		this.instance = new ProjectState()
		return this.instance
	}

	addListener(listenerFn: Listener) {
		this.listeners.push(listenerFn)
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
				Project Input Class
===============================================*/
class ProjectInput {
	templateEl: HTMLTemplateElement
	hostEl: HTMLDivElement
	formEl: HTMLFormElement
	titleInput: HTMLInputElement
	descInput: HTMLInputElement
	peopleInput: HTMLInputElement

	constructor() {
		this.templateEl = document.querySelector('#project-input')! as HTMLTemplateElement
		this.hostEl = document.querySelector('#app')! as HTMLDivElement

		const importedHTMLContent = document.importNode(this.templateEl.content, true)
		this.formEl = importedHTMLContent.firstElementChild as HTMLFormElement
		this.formEl.id = 'user-input'

		// inputs access
		this.titleInput = this.formEl.querySelector('#title')! as HTMLInputElement
		this.descInput = this.formEl.querySelector('#description')! as HTMLInputElement
		this.peopleInput = this.formEl.querySelector('#people')! as HTMLInputElement

		// configure
		this.configure()
		// render
		this.attach()
	}

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

	private configure() {
		this.formEl.addEventListener('submit', this.submitHandler)
	}

	private attach() {
		this.hostEl.insertAdjacentElement('afterbegin', this.formEl)
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
class ProjectList {
	templateEl: HTMLTemplateElement
	hostEl: HTMLDivElement
	element: HTMLElement
	assignedProjects: Project[]

	constructor(private type: ProjectStatus) {
		this.templateEl = document.querySelector('#project-list')! as HTMLTemplateElement
		this.hostEl = document.querySelector('#app')! as HTMLDivElement

		this.assignedProjects = []

		const importedHTMLContent = document.importNode(this.templateEl.content, true)
		this.element = importedHTMLContent.firstElementChild as HTMLElement
		this.element.id = `${this.type}-projects`

		projectState.addListener(projects => {
			this.assignedProjects = projects.filter(proj => proj.status === this.type)
			this.renderProjects()
		})

		this.attach()
		this.renderContent()
	}

	private attach() {
		this.hostEl.insertAdjacentElement('beforeend', this.element)
	}

	private renderContent() {
		const listId = `${this.type}-project-list`
		this.element.querySelector('ul')!.id = listId
		this.element.querySelector('h2')!.textContent = this.type.toString().toUpperCase() + ' PROJECTS'
	}

	private renderProjects() {
		const listElement = document.getElementById(`${this.type}-project-list`)! as HTMLUListElement
		listElement.innerHTML = ''
		for (const projectItem of this.assignedProjects) {
			const listItem = document.createElement('li')
			listItem.textContent = projectItem.title
			listElement.appendChild(listItem)
		}
	}
}

/*==============================================
				init
===============================================*/
const projInput = new ProjectInput()
const activeProjectlist = new ProjectList(ProjectStatus.Active)
const finishedProjectlist = new ProjectList(ProjectStatus.Finished)