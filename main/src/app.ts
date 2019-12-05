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

		// render
		this.attach()
	}

	private attach() {
		this.hostEl.insertAdjacentElement('afterbegin', this.formEl)
	}

	private configure() {}
}

const projInput = new ProjectInput()
