import { LockOutlined, UserOutlined, PhoneOutlined } from '@ant-design/icons';
import React from 'react';
import ProForm, { ProFormCheckbox, ProFormText } from '@ant-design/pro-form';
// @ts-ignore
import { useIntl, Link, history, FormattedMessage, SelectLang, useModel } from 'umi';
import styles from '@/pages/User/Login/style.less';
import { getLocales, saveToken, validationPassWord } from '@/utils/utils';
import { getProfile, login, register } from '@/pages/User/Login/services';
import { Tabs, message } from 'antd';
import { UserLogin } from './data';

const goto = () => {
  if (!history) return;
  setTimeout(() => {
    const { query } = history.location;
    const { redirect } = query as { redirect: string };
    history.push(redirect || '/admin');
  }, 10);
};

const Login: React.FC = () => {
  const [loginSubmitting, setLoginSubmitting] = React.useState(false);
  const [registerSubmitting, setRegisterSubmitting] = React.useState(false);
  const [formLogin] = ProForm.useForm();
  const [formRegister] = ProForm.useForm();
  const [activeKey, setActiveKey] = React.useState('1');
  const { initialState, setInitialState } = useModel('@@initialState');
  const intl = useIntl();

  const fetchUserInfo = async () => {
    const userInfo = await getProfile();

    if (userInfo) {
      setInitialState({
        ...initialState,
        currentUser: userInfo,
      });
      message.success(
        intl.formatMessage({
          id: 'pages.login.success',
          defaultMessage: 'Đăng nhập thành công!',
        }),
      );
      goto();
    }
  };

  const handleLoginSubmit = async (values: UserLogin.LoginParams) => {
    setLoginSubmitting(true);
    const res = await login({
      email: values.username,
      password: values.password,
    });
    setLoginSubmitting(false);

    if (!res) return;
    saveToken(res?.token);
    await fetchUserInfo();
  };

  const handleRegisterSubmit = async (values: UserLogin.RegisterParams) => {
    setRegisterSubmitting(true);
    const res = await register({
      email: values.email,
      password: values.password,
      name: values.name,
      phone: values.phone,
    });
    setRegisterSubmitting(false);

    if (!res) return;

    setActiveKey('1');
    formRegister.resetFields();
    message.success('Đăng ký thành công!');
  };

  return (
    <div className={styles.container}>
      <div className={styles.lang}>
        <SelectLang postLocalesData={() => getLocales()} />
      </div>
      <div className={styles.content}>
        <div className={styles.top}>
          <div className={styles.header}>
            <Link to="/">
              <img alt="logo" className={styles.logo} src="/logo.svg" />
              <span className={styles.title}>
                <FormattedMessage id="pages.login.title" defaultMessage="Quản lý" />
              </span>
            </Link>
          </div>
          <div className={styles.desc}></div>
        </div>
        <div className={styles.main}>
          <Tabs activeKey={activeKey} onChange={(active) => setActiveKey(active)}>
            <Tabs.TabPane tab="Đăng nhập" key="1">
              <ProForm
                form={formLogin}
                initialValues={{ autoLogin: true }}
                submitter={{
                  searchConfig: {
                    submitText: intl.formatMessage({
                      id: 'pages.login.submit',
                      defaultMessage: 'Đăng nhập',
                    }),
                  },
                  render: (_, dom) => dom.pop(),
                  submitButtonProps: {
                    loading: loginSubmitting,
                    size: 'large',
                    style: {
                      width: '100%',
                    },
                  },
                }}
                onFinish={async (values: UserLogin.LoginParams) => {
                  await handleLoginSubmit(values);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') formLogin.submit();
                }}
              >
                <ProFormText
                  name="username"
                  fieldProps={{
                    size: 'large',
                    prefix: <UserOutlined className={styles.prefixIcon} />,
                  }}
                  placeholder={intl.formatMessage({
                    id: 'pages.login.username.placeholder',
                    defaultMessage: 'Nhập tên tài khoản',
                  })}
                  rules={[
                    {
                      required: true,
                      message: (
                        <FormattedMessage
                          id="pages.login.username.required"
                          defaultMessage="Bạn chưa nhập tên tài khoản!"
                        />
                      ),
                    },
                    {
                      type: 'email',
                      message: (
                        <FormattedMessage
                          id="pages.login.username.email"
                          defaultMessage="Email không hợp lệ!"
                        />
                      ),
                    },
                  ]}
                />
                <ProFormText.Password
                  name="password"
                  fieldProps={{
                    size: 'large',
                    prefix: <LockOutlined className={styles.prefixIcon} />,
                  }}
                  placeholder={intl.formatMessage({
                    id: 'pages.login.password.placeholder',
                    defaultMessage: 'Nhập mật khẩu',
                  })}
                  rules={[
                    {
                      required: true,
                      message: (
                        <FormattedMessage
                          id="pages.login.password.required"
                          defaultMessage="Bạn chưa nhập mật khẩu!"
                        />
                      ),
                    },
                    { validator: validationPassWord },
                  ]}
                />
                <div style={{ marginBottom: 24 }}>
                  <ProFormCheckbox noStyle name="autoLogin">
                    <FormattedMessage id="pages.login.rememberMe" defaultMessage="Nhớ mật khẩu" />
                  </ProFormCheckbox>
                </div>
              </ProForm>
            </Tabs.TabPane>
            <Tabs.TabPane tab="Đăng ký" key="2">
              <ProForm
                form={formRegister}
                submitter={{
                  searchConfig: {
                    submitText: intl.formatMessage({
                      id: 'pages.register.submit',
                      defaultMessage: 'Đăng ký',
                    }),
                  },
                  render: (_, dom) => dom.pop(),
                  submitButtonProps: {
                    loading: registerSubmitting,
                    size: 'large',
                    style: {
                      width: '100%',
                    },
                  },
                }}
                onFinish={async (values: UserLogin.RegisterParams) => {
                  await handleRegisterSubmit(values);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') formRegister.submit();
                }}
              >
                <ProFormText
                  name="name"
                  fieldProps={{
                    size: 'large',
                    prefix: <UserOutlined className={styles.prefixIcon} />,
                  }}
                  placeholder={intl.formatMessage({
                    id: 'pages.login.name.placeholder',
                    defaultMessage: 'Nhập tên',
                  })}
                  rules={[
                    {
                      required: true,
                      message: (
                        <FormattedMessage
                          id="pages.login.name.required"
                          defaultMessage="Bạn chưa nhập tên!"
                        />
                      ),
                    },
                  ]}
                />
                <ProFormText
                  name="email"
                  fieldProps={{
                    size: 'large',
                    prefix: <UserOutlined className={styles.prefixIcon} />,
                  }}
                  placeholder={intl.formatMessage({
                    id: 'pages.login.username.placeholder',
                    defaultMessage: 'Nhập tên tài khoản',
                  })}
                  rules={[
                    {
                      required: true,
                      message: (
                        <FormattedMessage
                          id="pages.login.username.required"
                          defaultMessage="Bạn chưa nhập tên tài khoản!"
                        />
                      ),
                    },
                    {
                      type: 'email',
                      message: (
                        <FormattedMessage
                          id="pages.login.username.email"
                          defaultMessage="Email không hợp lệ!"
                        />
                      ),
                    },
                  ]}
                />
                <ProFormText
                  name="phone"
                  fieldProps={{
                    size: 'large',
                    prefix: <PhoneOutlined className={styles.prefixIcon} />,
                  }}
                  placeholder={intl.formatMessage({
                    id: 'pages.login.phone.placeholder',
                    defaultMessage: 'Nhập số điện thoại',
                  })}
                  rules={[
                    {
                      required: true,
                      message: (
                        <FormattedMessage
                          id="pages.login.phone.required"
                          defaultMessage="Bạn chưa nhập số điện thoại!"
                        />
                      ),
                    },
                  ]}
                />
                <ProFormText.Password
                  name="password"
                  fieldProps={{
                    size: 'large',
                    prefix: <LockOutlined className={styles.prefixIcon} />,
                  }}
                  placeholder={intl.formatMessage({
                    id: 'pages.login.password.placeholder',
                    defaultMessage: 'Nhập mật khẩu',
                  })}
                  rules={[
                    {
                      required: true,
                      message: (
                        <FormattedMessage
                          id="pages.login.password.required"
                          defaultMessage="Bạn chưa nhập mật khẩu!"
                        />
                      ),
                    },
                    { validator: validationPassWord },
                  ]}
                />
                <ProFormText.Password
                  name="confirm_password"
                  fieldProps={{
                    size: 'large',
                    prefix: <LockOutlined className={styles.prefixIcon} />,
                  }}
                  placeholder={intl.formatMessage({
                    id: 'pages.login.confirm_password.placeholder',
                    defaultMessage: 'Nhập mật khẩu xác nhận',
                  })}
                  rules={[
                    {
                      required: true,
                      message: (
                        <FormattedMessage
                          id="pages.login.confirm_password.required"
                          defaultMessage="Bạn chưa nhập mật khẩu xác nhận!"
                        />
                      ),
                    },
                    { validator: validationPassWord },
                    ({ getFieldValue }) => ({
                      validator(rule, value) {
                        if (!value || getFieldValue('password') === value) {
                          return Promise.resolve();
                        }
                        // eslint-disable-next-line prefer-promise-reject-errors
                        return Promise.reject('Mật khẩu xác nhận không khớp!');
                      },
                    }),
                  ]}
                />
              </ProForm>
            </Tabs.TabPane>
          </Tabs>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default Login;
