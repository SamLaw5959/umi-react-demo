import { Button, Form, Input, Radio } from 'antd';
import React, { useState } from 'react';
import ContentTable from './ContentTable'

type LayoutType = Parameters<typeof Form>[0]['layout'];

const HomeContent: React.FC = () => {
    const [form] = Form.useForm();
    const [formLayout, setFormLayout] = useState<LayoutType>('horizontal');

    const onFormLayoutChange = ({ layout }: { layout: LayoutType }) => {
        setFormLayout(layout);
    };


    return (
        <>
            <Form
                //   {...formItemLayout}
                layout='inline'
                form={form}
                initialValues={{ layout: formLayout }}
                onValuesChange={onFormLayoutChange}
            >
                <Form.Item label="Form Layout" name="layout">
                    <Radio.Group value={formLayout}>
                        <Radio.Button value="horizontal">Horizontal</Radio.Button>
                        <Radio.Button value="vertical">Vertical</Radio.Button>
                        <Radio.Button value="inline">Inline</Radio.Button>
                    </Radio.Group>
                </Form.Item>
                <Form.Item label="Field A">
                    <Input placeholder="input placeholder" />
                </Form.Item>
                <Form.Item label="Field B">
                    <Input placeholder="input placeholder" />
                </Form.Item>
                <Form.Item >
                    <Button type="primary">Submit</Button>
                </Form.Item>
            </Form>
            <ContentTable />
        </>
    );
};

export default HomeContent;