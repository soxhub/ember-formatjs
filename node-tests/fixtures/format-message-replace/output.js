import Controller from '@ember/controller';
export default class AController extends Controller {
  get message() {
    return this.intl.t('2/U1G5');
  }

  get messageName() {
    return this.intl.t('5ZeleY', {
      name: 'Scott',
    });
  }

  get messageDescription() {
    return this.intl.t('I9bdbo');
  }

  get messageDescriptionWithArgs() {
    return this.intl.t('IGr0zx', {
      description: 'foo',
    });
  }

  get messageIdWithArgs() {
    return this.intl.t('VLPgeP', {
      id: '12345',
    });
  }

  get messageValueArgsAndOptions() {
    return this.intl.t('YM98+I', {
      name: this.args.user.name,
    });
  }

  get messageValueArgsWithId() {
    return this.intl.t('login.message-description-with-id', {
      name: this.args.user.name,
    });
  }

  get messageValueArgsWithDescriptionAndOptionsDescription() {
    return this.intl.t('yb6VRh', {
      name: this.args.user.name,
      description: 'description for the message',
    });
  }
}
