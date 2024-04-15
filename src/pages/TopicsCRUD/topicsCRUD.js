import { Table } from "antd"
import { useEffect, useState } from "react"
import { getTopics } from "../../services/topics"
import TopicsCRUDButtons from "../../components/TopicsCRUDButtons/topicsCRUDButtons"
const TopicsCRUD = () => {
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
    const columns = [
        {
            title: 'id',
            dataIndex: 'id',
            width: '30%',
        },
        {
            title: 'Topic',
            dataIndex: 'name',
            width: '40%',
        },
        {
            title: '',
            render: (text, record, index) => {
                return (
                    <>
                        <TopicsCRUDButtons id={record.id} />
                    </>
                )
            },
            width: '30%',

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
        const res = await getTopics()
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
                    columns={(columns)}
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
export default TopicsCRUD