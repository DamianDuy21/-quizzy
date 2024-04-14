import { Button, Table } from "antd";
import { useEffect, useState } from "react";
import { getResultsByUserEmail } from "../../services/result";
import { getCookie } from "../../helper/cookies";
import { Link, useNavigate } from "react-router-dom";
import ViewDetailResultButton from "../../components/ViewDetailResultButton/viewDetailResultButton";
import moment from "moment";

const History = () => {
    const role = getCookie("role")
    const [tableCollapse, setTableCollapse] = useState(false)
    const [data, setData] = useState();
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
            title: 'Topic',
            dataIndex: 'topicName',
            sorter: (a, b) => a.topicName > b.topicName,
            width: '40%',
        },
        {
            title: 'Created at',
            dataIndex: 'createdAt',
            sorter: (a, b) => moment(a.createdAt) - moment(b.createdAt),
            width: '40%',
            render: (text, record, index) => {
                return (
                    <>
                        {moment(record.createdAt).format('DD-MM-YYYY HH:mm:ss')}
                    </>
                )
            }
        },
        {
            title: '',
            render: (text, record, index) => {
                return (
                    <>
                        <ViewDetailResultButton id={record.id} />
                    </>
                )
            },
            width: '20%',

        },
    ]
    const columns = [
        {
            title: 'id',
            dataIndex: 'id',
            width: '40%',
        },
        {
            title: 'Topic',
            dataIndex: 'topicName',
            sorter: (a, b) => a.topicName > b.topicName,
            width: '20%',
        },
        {
            title: 'Created at',
            dataIndex: 'createdAt',
            sorter: (a, b) => moment(a.createdAt) - moment(b.createdAt),
            width: '30%',
            render: (text, record, index) => {
                return (
                    <>
                        {moment(record.createdAt).format('DD-MM-YYYY HH:mm:ss')}
                    </>
                )
            }
        },
        {
            title: '',
            render: (text, record, index) => {
                return (
                    <>
                        <ViewDetailResultButton id={record.id} />
                    </>
                )
            },
            width: '10%',

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
        const userEmail = getCookie("email")
        const res = await getResultsByUserEmail(userEmail)
        console.log(res)
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
            {role == "TESTER" ? (<>

            </>) : (<>
                <Table
                    columns={tableCollapse ? (columnsMini) : (columns)}
                    dataSource={data}
                    pagination={tableParams.pagination}
                    loading={loading}
                    onChange={handleTableChange}
                />
            </>)}

        </>
    )
}
export default History