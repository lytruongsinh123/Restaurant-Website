"use client";
import { Button, Col, Divider, Form, Input, notification, Row } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import Link from "next/link";
import { authenticate } from "@/utils/action";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ModelReactive from "./modal.reactive";

const Login = () => {
    const router = useRouter();
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [userEmail, setUserEmail] = useState("");
    const onFinish = async (values: any) => {
        const { username, password } = values;
        setUserEmail("");
        //trigger sign-in
        const res = await authenticate(username, password);
        if (res?.error) {
            if (res?.code === 2) {
                setIsModalOpen(true);
                setUserEmail(username);
                return;
            }
            if (res?.code === 1) {
                notification.error({
                    message: "Login fail",
                    description: res?.error
                })
            }
        } else {
            notification.success({
                message: "Login success",
            });
            router.push("/dashboard");
        }
        console.log(">>> check res", res);
    };

    return (
        <>
            <Row justify={"center"} style={{ marginTop: "30px" }}>
                <Col xs={24} md={16} lg={8}>
                    <fieldset
                        style={{
                            padding: "15px",
                            margin: "5px",
                            border: "1px solid #ccc",
                            borderRadius: "5px",
                        }}>
                        <legend>Đăng Nhập</legend>
                        <Form
                            name="basic"
                            onFinish={onFinish}
                            autoComplete="off"
                            layout="vertical">
                            <Form.Item
                                label="Email"
                                name="username"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input your email!",
                                    },
                                ]}>
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="Password"
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input your password!",
                                    },
                                ]}>
                                <Input.Password />
                            </Form.Item>

                            <Form.Item>
                                <Button type="primary" htmlType="submit">
                                    Login
                                </Button>
                            </Form.Item>
                        </Form>
                        <Link href={"/"}>
                            <ArrowLeftOutlined /> Quay lại trang chủ
                        </Link>
                        <Divider />
                        <div style={{ textAlign: "center" }}>
                            Chưa có tài khoản?{" "}
                            <Link href={"/auth/register"}>Đăng ký tại đây</Link>
                        </div>
                    </fieldset>
                </Col>
            </Row>
            <ModelReactive
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                userEmail={userEmail}
            />
        </>
    );
};

export default Login;
