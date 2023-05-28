import { Result, Button } from 'antd';
import { history } from 'umi';

function backToHome() {
  history.push('/');
}

const Exception404 = () => (
  <Result
    status="404"
    title="404"
    subTitle="Xin lỗi, trang bạn đã truy cập không tồn tại"
    extra={
      <Button type="primary" onClick={backToHome}>
        Về trang chủ
      </Button>
    }
  />
);

const Exception500 = () => (
  <Result
    status="500"
    title="500"
    subTitle="Xin lỗi, lỗi máy chủ"
    extra={
      <Button type="primary" onClick={backToHome}>
        Về trang chủ
      </Button>
    }
  />
);

const Exception403 = () => (
  <Result
    status="403"
    title="403"
    subTitle="Xin lỗi, bạn không có quyền truy cập trang này"
    extra={
      <Button type="primary" onClick={backToHome}>
        Về trang chủ
      </Button>
    }
  />
);

export { Exception404, Exception403, Exception500 };
