'use strict'

const e = React.createElement
const useState = React.useState
const useEffect = React.useEffect
const memo = React.memo

const inputElement = ({ update }) => {
	const [value, setValue] = useState('')

	console.log('rerender')

	useEffect(() => {
		update(value)
	}, [value])

	return e('input', {
		type: 'text',
		value: value,
		onChange: e => setValue(e.target.value)
		// children: e('button', { type: 'submit', onClick: () => update(status) })
	})
}

const memoInput = memo(inputElement, (prevProps, nextProps) => prevProps !== nextProps)

const divBlock = ({ statusProp }) => {
	const [status, setStatus] = useState('')

	useEffect(() => {
		if (typeof statusProp === 'boolean') {
			setStatus(statusProp ? 'Set to true!' : 'Set to false :(')
		} else {
			setStatus(statusProp)
		}
	}, [statusProp])

	return e('div', {}, `${status}`)
}

class LikeButton extends React.Component {
	constructor(props) {
		super(props)
		this.state = { liked: false, inputText: '' }
	}

	render() {
		return e('div', {
			children: [
				e(
					'button',
					{
						onClick: () =>
							this.setState(prevState => ({
								liked: !prevState.liked
							})),
						key: '1'
					},
					this.state.liked ? 'You liked this!' : 'Like'
				),
				e(divBlock, { key: '2', statusProp: this.state.liked }),
				e(divBlock, { key: '4', statusProp: this.state.inputText }),
				e(memoInput, { key: '3', update: value => this.setState({ inputText: value }) })
			]
		})
	}
}

const domContainer = document.querySelector('#app')
ReactDOM.render(e(LikeButton), domContainer)

/*==============================================
                    JSX
===============================================*/

const dom = document.getElementById('appTwo')

const TestInput = props => {
	return <input type="text" value={props.value} onChange={e => props.update(e.target.value)} />
}

const TestParent = () => {
	const [value, setValue] = useState('')

	return (
		<div className="parent">
			<div>Entered test is: </div>
			<div>{value}</div>
			<TestInput update={setValue} value={value} />
		</div>
	)
}

ReactDOM.render(e(TestParent), dom)
