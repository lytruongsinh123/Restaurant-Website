"use client";
import { useHasMounted } from "@/utils/customHook";
import { Button, Divider, Form, Input, Modal, notification, Steps } from "antd";
import {
    SmileOutlined,
    SolutionOutlined,
    UserOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import { sendRequest } from "@/utils/api";
import { describe } from "node:test";
const ModelReactive = (props: any) => {
    const { isModalOpen, setIsModalOpen, userEmail } = props;
    const [form] = Form.useForm();
    const [current, setCurrent] = useState(0);
    const [userId, setUserId] = useState("");
    const hasMounted = useHasMounted();
    useEffect(() => {
        if (userEmail) {
            form.setFieldsValue({ email: userEmail }); // Sửa ở đây
        }
    }, [userEmail, form]);
    if (!hasMounted) return <></>;
    const onFinishStep0 = async (values: any) => {
        const { email } = values;
        const res = await sendRequest<IBackendRes<any>>({
            url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/retry-active`,
            method: "POST",
            body: {
                email,
            },
        });
        if (res?.data) {
            setUserId(res?.data?._id);
            setCurrent(1);
        } else {
            notification.error({
                message: "Register error",
                description: res?.message,
            });
        }
    };

    const onFinishStep1 = async (values: any) => {
        const { code } = values;
        const res = await sendRequest<IBackendRes<any>>({
            url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/check-code`,
            method: "POST",
            body: {
                code,
                _id: userId,
            },
        });
        if (res?.data) {
            setCurrent(2);
        } else {
            notification.error({
                message: "Register error",
                description: res?.message,
            });
        }
    };
    return (
        <>
            <Modal
                title="Activate account"
                closable={{ "aria-label": "Custom Close Button" }}
                open={isModalOpen}
                onOk={() => setIsModalOpen(false)}
                onCancel={() => setIsModalOpen(false)}
                maskClosable={false}
                footer={false}>
                <Steps
                    current={current}
                    items={[
                        {
                            title: "Login",
                            icon: <UserOutlined />,
                        },
                        {
                            title: "Verification",
                            icon: <SolutionOutlined />,
                        },
                        {
                            title: "Done",
                            icon: <SmileOutlined />,
                        },
                    ]}
                />
                {current === 0 && (
                    <>
                        <div style={{ margin: "20px 0" }}>
                            <p>Your account is inactive</p>
                        </div>
                        <Divider />
                        <Form
                            name="basic"
                            onFinish={onFinishStep0}
                            autoComplete="off"
                            layout="vertical"
                            form={form}>
                            <Form.Item label="Verify" name="email">
                                <Input disabled />
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit">
                                    Resend
                                </Button>
                            </Form.Item>
                        </Form>
                    </>
                )}
                {current === 1 && (
                    <>
                        <div style={{ margin: "20px 0" }}>
                            <p>Please enter the confirmation code</p>
                        </div>
                        <Divider />
                        <Form
                            name="basic"
                            onFinish={onFinishStep1}
                            autoComplete="off"
                            layout="vertical">
                            <Form.Item
                                label="Code"
                                name="code"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input your code!",
                                    },
                                ]}>
                                <Input />
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit">
                                    Active
                                </Button>
                            </Form.Item>
                        </Form>
                    </>
                )}
                {current === 2 && (
                    <div style={{ margin: "20px 0" }}>
                        <p>Your account has been activated. Please log in again.</p>
                    </div>
                )}
            </Modal>
        </>
    );
};
export default ModelReactive;
