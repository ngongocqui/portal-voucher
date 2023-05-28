import React from 'react';
import { Input, InputNumber, Form, ColProps } from 'antd';
// @ts-ignore
import { useIntl } from 'umi';

interface CreateManyEpisodeFormProps {
  wrapperCol?: ColProps;
  labelCol?: ColProps;
}

const CreateManyEpisodeForm: React.FC<CreateManyEpisodeFormProps> = (props) => {
  const intl = useIntl();

  return (
    <Form.Item
      label={intl.formatMessage({ id: 'pages.episodes', defaultMessage: 'Tập' })}
      {...props}
    >
      <Form.Item
        name="from"
        noStyle
        rules={[
          {
            required: true,
            type: 'number',
            min: 1,
            max: 10000,
            message: intl.formatMessage({
              id: 'pages.episodes.min.1_10000',
              defaultMessage: 'Minimum >=0 và Minimum <= 10000!',
            }),
          },
        ]}
      >
        <InputNumber
          style={{
            width: 120,
            textAlign: 'center',
          }}
          placeholder="Minimum"
          min={1}
          max={10000}
        />
      </Form.Item>
      <Input
        className="site-input-split"
        style={{
          width: 30,
          borderLeft: 0,
          borderRight: 0,
          pointerEvents: 'none',
        }}
        placeholder="~"
        disabled
      />
      <Form.Item
        name="to"
        noStyle
        rules={[
          {
            required: true,
            type: 'number',
            min: 1,
            max: 10000,
            message: intl.formatMessage({
              id: 'pages.episodes.max.1_10000',
              defaultMessage: 'Maximum >=0 và Maximum <= 10000!',
            }),
          },
        ]}
      >
        <InputNumber
          className="site-input-right"
          style={{
            width: 120,
            textAlign: 'center',
          }}
          placeholder="Maximum"
          min={1}
          max={10000}
        />
      </Form.Item>
    </Form.Item>
  );
};

export default CreateManyEpisodeForm;
