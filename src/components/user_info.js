import React from 'react';

const UserInfo = (props) => {
	if (!props.user) {
		return;
	}

	const users = props.user;

	return (
		<li className="user-list-item">
			{!props.topLevel &&
				<div
					onClick={() => props.handleClose(users.login.md5, props.listType)}
					className="close"
					>
						✕
				</div>
			}
			<img className="user-list-item__img" src={users.picture.large} alt="profile"/>
			<div className="user-list-item__name">
				{users.name.first + ' ' + users.name.last}
			</div>
		</li>
	)
}

export default UserInfo;
