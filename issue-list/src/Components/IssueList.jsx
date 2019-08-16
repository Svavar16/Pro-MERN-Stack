import React, { Component } from 'react';

class BorderWrap extends Component {
	render() {
		const borderedStyle = { border: '1px solid silver', padding: 6 };
		return <div style={borderedStyle}>{this.props.children}</div>;
	}
}

const issues = [
	{
		id: 1,
		status: 'Open',
		owner: 'Ravan',
		created: new Date('2016-08-15'),
		effort: 5,
		completionDate: undefined,
		title: 'error in console when clicking Add'
	},
	{
		id: 2,
		status: 'Assigned',
		owner: 'Eddie',
		created: new Date('2016-08-16'),
		effort: 14,
		completionDate: new Date('2016-08-30'),
		title: 'Missing bottom border on panel'
	}
];

class IssueFilter extends Component {
	render() {
		return <div>this is a placeholder for a table of issues.</div>;
	}
}

class IssueTable extends Component {
	render() {
		const borderedStyle = { border: '1px solid silver', padding: 6 };
		const issueRows = this.props.issues.map((issue) => <IssueRow key={issue.id} issue={issue} />);
		return (
			<table className="bordered-table">
				<thead>
					<th>Id</th>
					<th>Status</th>
					<th>Owner</th>
					<th>Created</th>
					<th>Effort</th>
					<th>Completion Date</th>
					<th>Title</th>
				</thead>
				<tbody> {issueRows} </tbody>
			</table>
		);
	}
}

class IssueRow extends Component {
	render() {
		const issue = this.props.issue;
		return (
			<tr>
				<td>{issue.id}</td>
				<td>{issue.status}</td>
				<td>{issue.owner}</td>
				<td>{issue.created.toDateString()}</td>
				<td>{issue.effort}</td>
				<td>{issue.completionDate ? issue.completionDate.toDateString() : ''}</td>
				<td>{issue.title}</td>
			</tr>
		);
	}
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
		setTimeout(() => {
			this.setState({ issues: issues });
		}, 500);
	}

	createIssue(newIssue) {
		const newIssues = this.state.issues.slice();
		newIssue.id = this.state.issues.length + 1;
		newIssues.push(newIssue);
		this.setState({
			issues: newIssues
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
