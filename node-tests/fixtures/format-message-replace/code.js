import Controller from '@ember/controller';

export default class AController extends Controller {
	get message() {
		return this.intl.formatMessage('The message is: message');
	}

	get messageName() {
		return this.intl.formatMessage('The user is: {user}', {
			name: 'Scott'
		});
	}

	get messageDescription() {
		return this.intl.formatMessage('The message is: message', {
			description: 'this is a description',
		});
	}

	get messageDescriptionWithArgs() {
		return this.intl.formatMessage('The message is: {description}', {
			description: "foo",
		});
	}

	get messageIdWithArgs() {
		return this.intl.formatMessage('The message id: {id}', {
			id: "12345",
		});
	}

	get messageValueArgsAndOptions() {
		return this.intl.formatMessage('The user is: {name}', {
			name: this.args.user.name
		}, {
			description: 'this is a description',
		});
	}

	get messageValueArgsWithId() {
		return this.intl.formatMessage('The user is: {name}, {description}', {
			name: this.args.user.name,
		}, {
			description: 'this is a description',
			id: 'login.message-description-with-id',
		});
	}

	get messageValueArgsWithDescriptionAndOptionsDescription() {
		return this.intl.formatMessage('The user is: {name}, {description}', {
			name: this.args.user.name,
			description: 'description for the message'
		}, {
			description: 'this is a description',
		});
	}
}
