import { DOMObject } from './DOMObject';
import i18n from '../../i18n';

export class Field extends DOMObject {
  initialize() {
    this.template =
      '<div class="[%classes%]" style="[%style%]">' +
      '<label for="[%label%]" class="sendsay-label">[%label%]</label>' +
      '<input name="[%qid%]" placeholder="[%placeholder%]" value="[%value%]" type="text" class="sendsay-input"/>' +
      '<div type="text" class="sendsay-error"></div>' +
      '</div>';
    this.baseClass = 'sendsay-field';
    this.applicableStyles = {
      'padding-bottom': { param: 'paddingBottom', postfix: 'px' },
      'padding-top': { param: 'paddingTop', postfix: 'px' },
      'padding-left': { param: 'paddingLeft', postfix: 'px' },
      'padding-right': { param: 'paddingRight', postfix: 'px' },
      color: { param: 'labelTextColor' },
      'font-family': { param: 'labelFontFamily' },
      'font-size': { param: 'labelFontSize', postfix: 'px' },
    };
  }

  makeSettings() {
    const field = this.data.field || {};
    const content = this.data.content || {};
    const appearance = this.data.appearance || {};
    const settings = super.makeSettings();

    settings.label = this.escapeHTML(content.label || '');
    settings.placeholder = this.escapeHTML(content.placeholder || '');
    settings.qid = field.id || field.qid || '';
    settings.value = field.default || '';
    if (appearance.hidden) {
      settings.classes += ' sendsay-field-hidden';
    }
    if (field.required) {
      settings.label += '*';
    }

    return settings;
  }

  validate() {
    this.removeErrorMessage();

    // eslint-disable-next-line eqeqeq
    if (this.data.field.required && this.getValue() == '') {
      this.showErrorMessageById('validation__required-field');
      return false;
    }
    return true;
  }

  showErrorMessageById(messageId) {
    this.el.classList.add('sendsay-field-invalid');
    this.el.querySelector('.sendsay-error').innerHTML = i18n(messageId);
  }

  removeErrorMessage() {
    this.el.classList.remove('sendsay-field-invalid');
    this.el.querySelector('.sendsay-error').innerHTML = '';
  }

  getValue() {
    return this.el.querySelector('input').value;
  }
}
