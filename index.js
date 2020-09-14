document.addEventListener('DOMContentLoaded', () => {
	var toDos = [];
	var value;
	const addTodo = text => {
		const obj = {
			id : new Date().toISOString(),
			text,
			status: 'progress'
		};
		toDos.push(obj);
	};

	const removeToDo = (id) => {
		const newToDos = toDos.filter(obj => obj.id !== id);
		toDos = newToDos;
	};

	const updateTodos = (id) => {
		const newToDos = [];
		toDos.forEach(obj => {
			if (obj.id === id) obj.status =  obj.status === 'progress' ? 'done' : 'progress';
			newToDos.push(obj)
		});
	}

	const onClickItem = (e, id) => {
		console.log('clicked id ', id);
		updateTodos(id);
		render();
	}

	const onClose = (id) => {
		removeToDo(id);
		render()
	}

	const render = () => {
		const list = document.getElementById('display');
		list.innerHTML = '';
		console.log(toDos);
		toDos.forEach((toDo) => {
			const li = document.createElement('li');
			li.classList.add('item')
			if (toDo.status === 'done') li.classList.add('done');
			li.innerHTML = `<div>${toDo.text}</div>`;
			const image = document.createElement('img');
			image.setAttribute('src', './close.svg')
			image.classList.add('close');
			image.addEventListener('click', (e) => onClose(toDo.id))
			li.appendChild(image)
			list.appendChild(li);
			li.addEventListener('click', (e) => onClickItem(e, toDo.id))
		});
		const count = document.getElementById('count');
		count.innerHTML = toDos.filter(obj => obj.status === 'progress').length + ' items left';
	}

	const inputBox = document.getElementById('input');
	console.log(inputBox);
	inputBox.addEventListener('change', (e) => {
		value = e.target.value;
	})

	inputBox.addEventListener('keydown', (e) => {
		if (e.keyCode === 13 && value && value.length > 0) {
			addTodo(value);
			render();
			value = '';
			inputBox.value = ''
		}
	});
});