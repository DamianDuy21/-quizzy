import DefaultLayout from "../layouts/DefaultLayout/defaultLayout";
import Home from "../pages/Home/home";
import Login from "../pages/Login/login";
import Registered from "../pages/Regitered/registered";
import Topics from "../pages/Topics/topics";
import ProtectedPage from "../components/ProtectedPage/protectedPage";
import Result from "../pages/Result/result";
import Quiz from "../pages/Quiz/quiz";
import History from "../pages/History/history";
import Profile from "../pages/Profile/profile";
import ProtectedTesterPage from "../components/ProtectedTesterPage/protectedTesterPage";
import ProtectedAdminPage from "../components/ProtectedAdminPage/protectedAdminPage";
import TopicsCRUD from "../pages/TopicsCRUD/topicsCRUD";
import UsersCRUD from "../pages/UsersCRUD/usersCRUD";
import { Navigate } from "react-router-dom";
import TopicsDetailCRUD from "../pages/TopicDetailCRUD/topicDetailCRUD";

const Routes = [
    {
        path: "/",
        element: <DefaultLayout />,
        children: [
            {
                index: true,
                element: <Topics />
            },
            {
                path: "login",
                element: <Login />
            },
            {
                path: "registered",
                element: <Registered />
            },
            {
                path: "/",
                element: <ProtectedPage />,
                children: [
                    {
                        path: "*",
                        element: <Navigate to={'/topics'} />
                    },
                    {
                        path: "topics",
                        element: <Topics />
                    },
                    {
                        path: "quiz/:topicName",
                        element: <Quiz />
                    },
                    {
                        path: "result/:resultId",
                        element: <Result />
                    },
                    {
                        path: "/",
                        element: <ProtectedTesterPage />,
                        children: [
                            {
                                path: "history",
                                element: <History />
                            },
                            {
                                path: "profile",
                                element: <Profile />
                            },
                            {
                                path: "/",
                                element: <ProtectedAdminPage />,
                                children: [
                                    {
                                        path: "topicscrud",
                                        element: <TopicsCRUD />
                                    },
                                    {
                                        path: "topicdetailcrud/:topicName",
                                        element: <TopicsDetailCRUD />
                                    },
                                    {
                                        path: "userscrud",
                                        element: <UsersCRUD />
                                    },
                                ]
                            },

                        ]
                    },

                ]

            },

        ]
    }
]

export default Routes