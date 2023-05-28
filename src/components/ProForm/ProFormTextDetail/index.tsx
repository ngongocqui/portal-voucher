import React, { useState } from 'react';
import { Form } from 'antd';
// @ts-ignore
import { useIntl, getLocale } from 'umi';
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/index.css';
import viVN from '@/components/ProForm/ProFormTextDetail/locale/viVN';
import enUS from '@/components/ProForm/ProFormTextDetail/locale/enUS';
import lodash from 'lodash';

const ProFormTextDetail: React.FC = () => {
  const intl = useIntl();
  const [textEditor, setTextEditor] = useState(BraftEditor.createEditorState(''));

  return (
    <Form.Item
      name="detail"
      labelCol={{ span: 24 }}
      wrapperCol={{ span: 24 }}
      label={intl.formatMessage({ id: 'pages.detail', defaultMessage: 'Thông tin' })}
    >
      {/* @ts-ignore */}
      <BraftEditor
        language={(languages: any) => {
          const lang = lodash.clone(languages);
          if (getLocale() === 'vi-VN') {
            lang['vi-vn'] = viVN;
            return lang['vi-vn'];
          }
          if (getLocale() === 'en-US') {
            lang.en = enUS;
            return lang.en;
          }
          return lang['vi-vn'];
        }}
        value={textEditor}
        onChange={setTextEditor}
      />
    </Form.Item>
  );
};

export default ProFormTextDetail;
