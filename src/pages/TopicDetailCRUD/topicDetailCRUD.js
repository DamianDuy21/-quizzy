import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getTopicIdByTopicName } from "../../services/topics"
import { getQuestionsByTopicId } from "../../services/questions"
import { Table } from "antd"
import TopicDetailCRUDButtons from "../../components/TopicDetailCRUDButtons/topicDetailCRUDButtons"
const TopicsDetailCRUD = () => {
    const param = useParams()
    const [q, setQ] = useState([])

    const fetchQuestions = async () => {
        const res = await getTopicIdByTopicName(param.topicName)
        const ress = await getQuestionsByTopicId(parseInt(res[0].id))
        console.log(ress)
        ress.sort((a, b) => (parseInt(a.id) > parseInt(b.id)) ? 1 : ((parseInt(b.id) > parseInt(a.id)) ? -1 : 0));
        setQ(ress)
    }
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
            title: 'Question',
            dataIndex: 'question',
            width: '70%',
            render: (text, record, index) => {
                return (
                    <>
                        <div>{record.question}</div>
                    </>
                )
            },
        },
        {
            title: '',
            render: (text, record, index) => {
                return (
                    <>
                        <TopicDetailCRUDButtons q={q} setQ={q} id={record.id} />
                    </>
                )
            },
            width: '30%',

        },
    ];

    const columns = [
        {
            title: 'id',
            dataIndex: 'id',
            defaultSortOrder: 'ascend',
            sorter: (a, b) => parseInt(a.id) > parseInt(b.id),
            width: '20%',
        },
        {
            title: 'Question',
            dataIndex: 'question',
            width: '60%',
        },
        {
            title: '',
            render: (text, record, index) => {
                return (
                    <>
                        <TopicDetailCRUDButtons q={q} setQ={q} id={record.id} />
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
            setQ([]);
        }
    };
    const fetchResults = async () => {
        setLoading(true)
        // const res = await getUsers()
        // setData(res)
        setLoading(false)
    }
    useEffect(() => {
        let initWidth = window.innerWidth
        if (initWidth <= 767.98) {
            setTableCollapse(true)
        }
        fetchQuestions()
    }, [])
    return (
        <>
            {q ? (<>
                <Table
                    columns={tableCollapse ? (columnsMini) : (columns)}
                    dataSource={q}
                    pagination={tableParams.pagination}
                    loading={loading}
                    onChange={handleTableChange}
                />
            </>)

                : (<></>)}
        </>
    )
}
export default TopicsDetailCRUD