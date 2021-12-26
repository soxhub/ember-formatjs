import Controller from '@ember/controller';
export default class AController extends Controller {
  get message() {
    return this.intl.t('2/U1G5');
  }

  get messageName() {
    return this.intl.t('QxXsbh', {
      name: 'Scott',
    });
  }

  get messageDescription() {
    return this.intl.t('auSKLo');
  }

  get messageDescriptionWithArgs() {
    return this.intl.t('2FwN61', {
      description: 'foo',
    });
  }

  get messageIdWithArgs() {
    return this.intl.t('vCPL33', {
      id: '12345',
    });
  }

  get messageValueArgsAndOptions() {
    return this.intl.t('qfLPS1', {
      name: this.args.user.name,
    });
  }

  get messageValueArgsWithId() {
    return this.intl.t('login.message-description-with-id', {
      name: this.args.user.name,
    });
  }

  get messageValueArgsWithDescriptionAndOptionsDescription() {
    return this.intl.t('DR8H1S', {
      name: this.args.user.name,
      description: 'description for the message',
    });
  }
}
