import { DeleteOutlined, EditOutlined } from "@ant-design/icons"
import { Button, Divider, Form, Input, Modal, Popconfirm } from "antd"
import { useForm } from "antd/es/form/Form";
import { useEffect, useState } from "react";
import { deleteUser, getUserById, getUsers, updateUser } from "../../services/users";
import { getTopicIdByTopicId } from "../../services/topics";
import { useNavigate } from "react-router-dom";

const TopicsCRUDButtons = (props) => {
    const { record } = props
    console.log(record)
    const [isLoading, setIsLoading] = useState(false)
    const nav = useNavigate()
    const handleEditUser = (e) => {
        e.preventDefault()
        nav(`/topicdetailcrud/${record.name}`)
    }
    const handleDeleteUser = async (e) => {
        e.preventDefault()
        // const res = await deleteTopic(id)
        await setTimeout(() => {
            alert("This feature is not unavailable!")
        }, 500)
        // const ress = await getTopics()
        // setData(ress)
    }

    return (
        <>
            <div style={{ display: "flex", gap: "12px", justifyContent: "end" }}>

                <Button
                    onClick={handleEditUser}
                    style={{ padding: "16px 9px", display: "flex", justifyContent: "center", alignItems: "center" }}><EditOutlined /></Button>
                <Popconfirm
                    placement="bottomRight"
                    title={"Are you sure delete this user?"}
                    description={"This action can't be revesred"}
                    okText="Yes"
                    cancelText="No"
                    onConfirm={handleDeleteUser}
                // disabled
                >
                    <Button
                        style={{ padding: "16px 9px", display: "flex", justifyContent: "center", alignItems: "center" }}><DeleteOutlined style={{ color: "red" }} /></Button>

                </Popconfirm>

            </div>
        </>
    )
}
export default TopicsCRUDButtons