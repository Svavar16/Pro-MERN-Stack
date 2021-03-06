import React, { Component } from 'react';

class BorderWrap extends Component {
	render() {
		const borderedStyle = { border: '1px solid silver', padding: 6 };
		return <div style={borderedStyle}>{this.props.children}</div>;
	}
}

class IssueFilter extends Component {
	render() {
		return <div>this is a placeholder for a table of issues.</div>;
	}
}

const IssueRow = (props)  => (
	<tr>
		<td>{props.issue.id}</td>
		<td>{props.issue.status}</td>
		<td>{props.issue.owner}</td>
		<td>{props.issue.created.toDateString()}</td>
		<td>{props.issue.effort}</td>
		<td>{props.issue.completionDate ? props.issue.completionDate.toDateString() : ''}</td>
		<td>{props.issue.title}</td>
	</tr>
);

function IssueTable(props){
	const borderedStyle = { border: '1px solid silver', padding: 6 };
	const issueRows = props.issues.map((issue) => <IssueRow key={issue.id} issue={issue} />);
	return (
		<table className="bordered-table">
			<thead>
				<tr>
					<th>Id</th>
					<th>Status</th>
					<th>Owner</th>
					<th>Created</th>
					<th>Effort</th>
					<th>Completion Date</th>
					<th>Title</th>
				</tr>
			</thead>
			<tbody>{issueRows}</tbody>
		</table>
	);
}


class IssueAdd extends Component {
	constructor() {
		super();
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(event) {
		event.preventDefault();
		let form = document.form.issueAdd;
		this.props.createIssue({
			owner: form.owner.value,
			title: form.title.value,
			status: 'New',
			created: new Date()
		});
		// to clear the form for the next person
		form.owner.value = '';
		form.title.value = '';
	}

	render() {
		return (
			<div>
				<form name="issueAdd" onSubmit={this.handleSubmit}>
					<input type="text" name="owner" id="" placeholder="Owner" />
					<input type="text" name="title" id="" placeholder="Title" />
					<button>Add</button>
				</form>
			</div>
		);
	}
}

class IssueList extends Component {
	constructor() {
		super();
		this.state = { issues: [] };

		this.createIssue = this.createIssue.bind(this);
	}

	componentDidMount() {
		this.loadData();
	}

	loadData() {
		fetch('/api/issues').then(response =>
			response.json()
		).then(data => {
			console.log("Total count of records:", data._metadata.total_count);
			data.records.forEach(issue => {
				console.log(data.records);
				issue.created = new Date(issue.created);
				if (issue.completionDate)
					issue.completionDate = new Date(issue.completionDate);
			});
			this.setState({ issues: data.records });
		}).catch(err => {
			console.log(err);
		});
		/*
		fetch('/api/issues')
			.then(response => response.json())
			.then(data => {
				console.log('Total count of records', data._metadata.total_count);
				data.records
					.forEach(issue => {
						issue.created = new Date(issue.created);
						if (issue.completionDate) {
							issue.completionDate = new Date(issue.completionDate);
						}
					});this.setState({ issues: data.records });
			})
			.catch((err) => {
				console.log(err);
			});*/
	}

	createIssue(newIssue) {
		fetch('/api/issues', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(newIssue)
		})
			.then((response) => {
				if (response.ok) {
					response.json().then((updatedIssue) => {
						updatedIssue.created = new Date(updatedIssue.created);
						if (updatedIssue.completionDate) {
							updatedIssue.completionDate = new Date(updatedIssue.completionDate);
						}
						const newIssues = this.state.issues.concat(updatedIssue);
						this.setState({ issues: newIssues });
					});
				} else {
					response.json().then((error) => {
						alert('Failed to add issue: ' + error.message);
					});
				}
			})
			.catch((err) => {
				alert('Error in sending data to server: ' + err.message);
			});
	}

	render() {
		return (
			<div>
				<h1>this is a placeholder for IssueList.</h1>
				<IssueFilter />
				<hr />
				<IssueTable issues={this.state.issues} />
				<hr />
				<IssueAdd createIssue={this.createIssue} />
			</div>
		);
	}
}

export default IssueList;
