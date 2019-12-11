import 'reflect-metadata'
import { plainToClass } from 'class-transformer'
import { validate } from 'class-validator'

import _ from 'lodash'

import { ProjectInput } from './components/project-input'
import { ProjectList } from './components/project-list'

import { Product } from './models/product.model' // testing class import

new ProjectInput()
new ProjectList('active')
new ProjectList('finished')

const prods = [
	{ title: 'Carpet', price: 29.99 },
	{ title: 'Book', price: 10.99 }
]

const loadedProds = plainToClass(Product, prods)

console.log(new Product('test', 12.99).getInfo())

loadedProds.forEach((prod: Product) => console.log(prod.getInfo()))

const product = new Product('', -10.99)
validate(product).then(errors => {
	if (errors.length > 0) {
		console.log('VALIDATION ERRORS:')
		console.log(errors)
	} else {
		console.log('resolved!')
	}
})
console.log(product.getInfo())
