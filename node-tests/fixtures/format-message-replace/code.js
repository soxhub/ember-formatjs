import Controller from '@ember/controller';

export default class LoginController extends Controller {
	get translation() {
		return this.intl.formatMessage({
			defaultMessage: 'Max was not really here he didn\'t like it!',
		});
	}
}
