import Controller from '@ember/controller';

export default class AController extends Controller {
	get message() {
		return this.intl.formatMessage({
			defaultMessage: 'The message is: message',
		});
	}

	get messageName() {
		return this.intl.formatMessage({
			defaultMessage: 'The user is: {user} messageName'
		}, {
			name: 'Scott'
		});
	}

	get messageDescription() {
		return this.intl.formatMessage({
			defaultMessage: 'The message is: message messageDescription',
			description: 'this is a description',
		});
	}

	get messageDescriptionWithArgs() {
		return this.intl.formatMessage({
			defaultMessage: 'The message is: {description} messageDescriptionWithArgs'
		}, {
			description: 'foo',
		});
	}

	get messageIdWithArgs() {
		return this.intl.formatMessage({
			defaultMessage: 'The message id: {id} messageIdWithArgs',
		}, {
			id: "12345",
		});
	}

	get messageValueArgsAndOptions() {
		return this.intl.formatMessage({
			defaultMessage: 'The user is: {name} messageValueArgsAndOptions',
			description: 'this is a description',
		}, {
			name: this.args.user.name,
		});
	}

	get messageValueArgsWithId() {
		return this.intl.formatMessage({
			defaultMessage: 'The user is: {name} messageValueArgsWithId',
			description: 'this is a description',
			id: 'login.message-description-with-id',
		}, {
			name: this.args.user.name,
		});
	}

	get messageValueArgsWithDescriptionAndOptionsDescription() {
		return this.intl.formatMessage({
			defaultMessage: 'The user is: {name}, {description} messageValueArgsWithDescriptionAndOptionsDescription',
			description: 'this is a description',
		}, {
			name: this.args.user.name,
			description: 'description for the message',
		});
	}
}
