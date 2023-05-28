import React from 'react';
// @ts-ignore
import { Link, history, useIntl } from 'umi';
import ProLayout, { BasicLayoutProps } from '@ant-design/pro-layout';
import { getMatchMenu, transformRoute } from '@umijs/route-utils';
import RightContent from '@/components/RightContent';
import ErrorBoundary from '@/components/ErrorBoundary';
import WithExceptionOpChildren from '@/components/Exception/components/WithExceptionOpChildren';
import './style.less';

const getLayoutRender = (currentPathConfig: {
  layout:
    | {
        hideMenu: boolean;
        hideNav: boolean;
        hideFooter: boolean;
      }
    | false;
  hideFooter: boolean;
}) => {
  const layoutRender: any = {};

  if (currentPathConfig?.hideFooter) {
    layoutRender.footerRender = false;
  }

  if (currentPathConfig?.layout === false) {
    layoutRender.pure = true;
    return layoutRender;
  }

  if (currentPathConfig?.layout?.hideMenu) {
    layoutRender.menuRender = false;
  }

  if (currentPathConfig?.layout?.hideFooter) {
    layoutRender.footerRender = false;
  }

  if (currentPathConfig?.layout?.hideNav) {
    layoutRender.headerRender = false;
  }

  return layoutRender;
};

const BasicLayout = (props: any) => {
  const { children, userConfig, location, route, ...restProps } = props;
  const { formatMessage } = useIntl();

  const getCurrentPathConfig = (): any => {
    const { menuData } = transformRoute(props?.route?.routes || [], undefined, undefined, true);
    const currentPathConf = getMatchMenu(location.pathname, menuData).pop();
    return currentPathConf;
  };

  const layoutRestProps: BasicLayoutProps & {
    rightContentRender?:
      | false
      | ((props: BasicLayoutProps, dom: React.ReactNode, config: any) => React.ReactNode);
  } = {
    itemRender: (r) => <Link to={r.path}>{r.breadcrumbName}</Link>,
    ...userConfig,
    ...restProps,
    ...getLayoutRender(getCurrentPathConfig()),
  };

  return (
    <ProLayout
      route={route}
      location={location}
      className="umi-plugin-layout-main"
      navTheme="dark"
      primaryColor="#1890ff"
      layout="top"
      contentWidth="Fluid"
      title={formatMessage({ id: 'pages.login.title', defaultMessage: 'Quản lý phim' })}
      colorWeak={false}
      siderWidth={256}
      onMenuHeaderClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        history.push('/');
      }}
      menu={{ locale: true }}
      formatMessage={formatMessage}
      menuItemRender={(menuItemProps, defaultDom: any) => {
        if (menuItemProps.isUrl || menuItemProps.children) {
          return defaultDom;
        }
        if (menuItemProps.path) {
          const checkIcon =
            Array.isArray(menuItemProps.pro_layout_parentKeys) &&
            menuItemProps.pro_layout_parentKeys.length !== 0;
          return (
            <>
              {checkIcon && menuItemProps?.icon}
              {checkIcon && ' '}
              <Link to={menuItemProps.path}>{defaultDom}</Link>
            </>
          );
        }
        return defaultDom;
      }}
      disableContentMargin
      fixSiderbar
      fixedHeader
      {...layoutRestProps}
      rightContentRender={() => {
        if (location.pathname !== '/user/login') {
          return <RightContent />;
        }
        return null;
      }}
      // footerRender={() => <Footer />}
    >
      {/* @ts-ignore */}
      <ErrorBoundary>
        <WithExceptionOpChildren currentPathConfig={getCurrentPathConfig()}>
          {children}
        </WithExceptionOpChildren>
      </ErrorBoundary>
    </ProLayout>
  );
};

export default BasicLayout;
