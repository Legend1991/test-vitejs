import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import Logo from '../components/Logo';
import usePresenter from '../usePresenter';

export default function LoginView(props) {
  const { controller, model } = usePresenter(props);

  console.log('[LoginView # render] model:', model);

  const emailInputClass = classNames('input input-bordered', {
    'input-primary': model.isEmailInputStatePrimary,
    'input-error': model.isEmailInputStateError,
  });
  const passwordInputClass = classNames('input input-bordered', {
    'input-primary': model.isPasswordInputStatePrimary,
    'input-error': model.isPasswordInputStateError,
  });
  const createAccountLinkClass = classNames(
    'link link-neutral link-hover select-none',
    {
      'pointer-events-none': model.createAccountLinkDisabled,
      'text-base-300': model.createAccountLinkDisabled,
    },
  );
  const signInButtonClass = classNames('btn btn-primary', {
    loading: model.signInButtonLoading,
  });

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex items-center flex-col">
        <div className="w-80 space-y-6">
          <div
            className={
              'card shadow-md lg:card-side '
              + 'bg-primary text-primary-content'
            }
          >
            <div className="card-body p-3 h-24">
              <Logo className="object-center" />
            </div>
          </div>
          <div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                placeholder="Please enter your email"
                className={emailInputClass}
                type="text"
                disabled={model.emailInputDisabled}
                onChange={controller.onEmailChange}
                onBlur={controller.onEmailFocusOut}
              />
              <label className="label">
                <span className="label-text-alt">
                  {model.emailError}
                  &nbsp;
                </span>
              </label>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                placeholder="Please enter your password"
                className={passwordInputClass}
                type="password"
                disabled={model.passwordInputDisabled}
                onChange={controller.onPasswordChange}
                onBlur={controller.onPasswordFocusOut}
              />
              <label className="label">
                <span className="label-text-alt">
                  {model.passwordError}
                  &nbsp;
                </span>
              </label>
            </div>
          </div>
          <div className="form-control">
            <button
              type="button"
              className={signInButtonClass}
              onClick={controller.onSignInClick}
            >
              Sign In
            </button>
          </div>
          <div className="form-control items-center">
            <Link className={createAccountLinkClass} to="/about">
              Create Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
