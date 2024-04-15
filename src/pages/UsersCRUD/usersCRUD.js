import { Table } from "antd"
import { useEffect, useState } from "react"
import { getUsers } from "../../services/users"
import UsersCRUDButtons from "../../components/UsersCRUDButtons/usersCRUDButtons"

const UsersCRUD = () => {
    const [data, setData] = useState([])
    const [tableCollapse, setTableCollapse] = useState(false)
    const [loading, setLoading] = useState(false);
    const [tableParams, setTableParams] = useState({
        pagination: {
            current: 1,
            pageSize: 8,
        },
    });
    window.addEventListener("resize", (e) => {
        let width = e.target.innerWidth;
        if (width <= 767.98) {
            setTableCollapse(true)
        }
        else {
            setTableCollapse(false)
        }
    })
    const columnsMini = [
        {
            title: 'E-mail',
            dataIndex: 'email',
            // width: "40%",
            render: (text, record, index) => {
                return (
                    <>
                        <div style={{ maxWidth: 135 }}>{record.email}</div>
                    </>
                )
            },
        },
        {
            title: '',
            render: (text, record, index) => {
                return (
                    <>
                        <UsersCRUDButtons data={data} setData={setData} id={record.id} />
                    </>
                )
            },
            width: '30%',

        },
    ]
    const columns = [
        {
            title: 'id',
            dataIndex: 'id',
            width: '40%',
        },
        {
            title: 'E-mail',
            dataIndex: 'email',
            width: '40%',
        },
        {
            title: '',
            render: (text, record, index) => {
                return (
                    <>
                        <UsersCRUDButtons data={data} setData={setData} id={record.id} />
                    </>
                )
            },
            width: '20%',

        },
    ];

    const handleTableChange = (pagination, filters, sorter) => {
        setTableParams({
            pagination,
            filters,
            ...sorter,
        });

        // `dataSource` is useless since `pageSize` changed
        if (pagination.pageSize !== tableParams.pagination?.pageSize) {
            setData([]);
        }
    };
    const fetchResults = async () => {
        setLoading(true)
        const res = await getUsers()
        setData(res)
        setLoading(false)
    }
    useEffect(() => {
        let initWidth = window.innerWidth
        if (initWidth <= 767.98) {
            setTableCollapse(true)
        }
        fetchResults()

    }, [])
    return (
        <>
            {data ? (<>
                <Table
                    columns={tableCollapse ? (columnsMini) : (columns)}
                    dataSource={data}
                    pagination={tableParams.pagination}
                    loading={loading}
                    onChange={handleTableChange}
                />
            </>)

                : (<></>)}
        </>
    )
}
export default UsersCRUD