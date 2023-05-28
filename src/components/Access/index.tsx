import { history, useAccess } from 'umi';

const Access = () => {
  const access = useAccess();

  const accessible = (
    actionType: (
      | 'READ'
      | 'IMPORT'
      | 'UPDATE'
      | 'CREATE'
      | 'DELETE'
      | 'EXPORT'
      | 'BROWSE'
      | 'UPDATE-STATUS'
      | 'UPDATE-PASSWORD'
      | 'SYNC'
      | 'COPY'
    )[],
  ) => {
    if (
      typeof access[`${history.location.pathname.replace(/\//g, '')}_permissions`] === 'function'
    ) {
      return access[`${history.location.pathname.replace(/\//g, '')}_permissions`](actionType);
    }
    return false;
  };

  const className = (
    actionType: (
      | 'READ'
      | 'IMPORT'
      | 'UPDATE'
      | 'CREATE'
      | 'DELETE'
      | 'EXPORT'
      | 'BROWSE'
      | 'UPDATE-STATUS'
      | 'UPDATE-PASSWORD'
      | 'SYNC'
      | 'COPY'
    )[],
  ) => {
    if (
      typeof access[`${history.location.pathname.replace(/\//g, '')}_permissions`] === 'function'
    ) {
      return access[`${history.location.pathname.replace(/\//g, '')}_permissions`](actionType)
        ? ''
        : 'hidden';
    }
    return 'hidden';
  };

  const classNamePath = (
    actionType: (
      | 'READ'
      | 'IMPORT'
      | 'UPDATE'
      | 'CREATE'
      | 'DELETE'
      | 'EXPORT'
      | 'BROWSE'
      | 'UPDATE-STATUS'
      | 'UPDATE-PASSWORD'
      | 'SYNC'
      | 'COPY'
    )[],
    pathname: string,
  ) => {
    if (typeof access[`${pathname.replace(/\//g, '')}_permissions`] === 'function') {
      return access[`${pathname.replace(/\//g, '')}_permissions`](actionType) ? '' : 'hidden';
    }
    return 'hidden';
  };

  return {
    accessible,
    className,
    classNamePath,
  };
};

export default Access;
