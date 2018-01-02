import React, { Component } from 'react';
import './App.css';
import UserInfo from './components/user_info';
import UserList from './components/user_list';
import Loader from './components/loader';

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			user: null,
			dogPeople: [],
			catPeople: [],
			isLoading: true
		};
	}

	removeUser = (id, listType) => {
		const petType = (listType.toLowerCase() === 'dog') ? 'dog' : 'cat';

		const petArray = this.state[`${petType}People`].filter((item) => {
			if (item.login.md5 !== id) {
				return item;
			}
		});

		this.setState({
			[`${petType}People`]: petArray
		})
	}

	getUserData = () => {
		this.setState({
			isLoading: true
		});
		fetch('https://randomuser.me/api/')
		.then(data => data.json())
		.then(data => {
			this.setState({
				user: data.results[0],
				isLoading: false
			});
		});
	}

	addItem = pet => {
		const petType = (pet === 'dog') ? 'dog' : 'cat';

		const petArray = this.state[`${petType}People`];
		petArray.push(this.state.user);

		this.setState({
			[`${petType}People`]: petArray
		})
	}

	handlePetSelect = pet => {
		//call top level function that sets state adding person to correct list and fetching new user data
		this.addItem(pet);
		this.getUserData();
	}

	sortUsers = (listType, nameType, e) => {
		const petType = (listType.toLowerCase() === 'dog') ? 'dog' : 'cat';
		let currentSortMethod;

		e.target.classList.toggle('name-select--up');

		if (e.target.classList.contains('name-select--up')) {
			currentSortMethod = 'ascending';
		} else {
			currentSortMethod = 'descending';
		}

		const petArray = this.state[`${petType}People`].sort((a, b) => {
			let nameA = a.name[`${nameType}`].toUpperCase(); // ignore upper and lowercase
			let nameB = b.name[`${nameType}`].toUpperCase(); // ignore upper and lowercase

			if (currentSortMethod === 'ascending') {
				// sort a-z
				if (nameA < nameB) {
					return -1;
				}
				if (nameA > nameB) {
					return 1;
				}
			} else if (currentSortMethod === 'descending') {
				// sort z-a
				if (nameA > nameB) {
					return -1;
				}
				if (nameA < nameB) {
					return 1;
				}
			}
			// names must be equal
			return 0;
		});

		this.setState({
			[`${petType}People`]: petArray
		})

	}

	componentDidMount() {
		//once render method in app is called fetch the data
		this.setState({
			isLoading: true
		});
		this.getUserData();
	}

  render() {

	 if (!this.state.user) {
		 return <Loader />
	 }

	let currentUser;
	if (this.state.isLoading) {
		currentUser = <Loader />;
	} else {
		currentUser = <UserInfo user={this.state.user} topLevel={true} />;
	}

	return (
		<div className="wrap">
			<h1>What type of animal do they prefer?</h1>
			<div className="btn-container">
				<button
					className="btn"
					onClick={() => this.handlePetSelect('dog')}
				>
					Dog Person
				</button>
				<button
					className="btn"
					onClick={() => this.handlePetSelect('cat')}
				>
					Cat Person
				</button>
			</div>
			{currentUser}
			<UserList users={this.state.dogPeople} title="Dog People" handleClose={this.removeUser} handleSort={this.sortUsers} />
			<UserList users={this.state.catPeople} title="Cat People" handleClose={this.removeUser} handleSort={this.sortUsers} />
		</div>
	);

  }
}

export default App;
