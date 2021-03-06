// @flow
import React from 'react';
import { Link } from 'react-router';
import { Panel, Button } from 'react-bootstrap';
import { Form } from 'react-redux-form';
import { WithI18n, Trans } from 'lingui-react';
import { isRequired } from 'util/Validator';
import { modelPath } from 'routes/Auth/modules/RecoverPasswordModule';
import InputField from 'components/InputField';
import isEmail from 'validator/lib/isEmail';
import Spinner from 'components/Spinner';
import config from 'config/index';
import type { FormProps } from 'util/Form';

import './RecoverPassword.scss';

type Props = {
  email: FormProps,
  isPending: boolean,
  i18n: Object,
  onSend: () => any,
  $form: FormProps,
}

export const RecoverPasswordComponent = ({ email, isPending, i18n, onSend, $form }: Props) => (
  <Panel className="recover-password" header={i18n.t`Recover password`}>
    <p>
      <Trans>
        Please enter your email address and we will send you an email with further instructions to reset your password.
      </Trans>
    </p>
    <Form model={modelPath} onSubmit={onSend} autoComplete="off">
      <InputField
        id="email"
        type="email"
        label={i18n.t`Email`}
        formProps={email}
        maxLength="255"
        validators={{
          isRequired,
          isEmail,
        }}
      />
      <Button bsStyle="primary" type="submit" disabled={!$form.valid || isPending} block>
        {isPending ? <div><Spinner /> <Trans>Submit</Trans></div> : <Trans>Submit</Trans>}
      </Button>
      <p className="sign-in-link"><Link to={config.route.auth.signIn}><Trans>Back to Sign-In</Trans></Link></p>
    </Form>
  </Panel>
);

export default WithI18n()(RecoverPasswordComponent);
