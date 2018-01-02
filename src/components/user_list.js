import React from 'react';
import UserInfo from './user_info';

const UserList = (props) => {
		if (!props.users || props.users.length === 0) {
			return null;
		}

		const title = props.title.split(' ')[0];

		return (
			<div className="list-container">
				<h2>{props.title}</h2>
				<div>
					<span
						onClick={(e) => props.handleSort(title, 'first', e)}
						className="name-select"
					>
						First Name
					</span>
					<span
						onClick={(e) => props.handleSort(title, 'last', e)}
						className="name-select"
					>
						Last Name
					</span>
				</div>
				<ul className="user-list">
					{props.users.map((user) => {
						return (
							<UserInfo
								user={user}
								key={user.login.md5}
								handleClose={props.handleClose}
								listType={title}
							/>
						)
					})}
				</ul>
			</div>
		);

}

export default UserList;
