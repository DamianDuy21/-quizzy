import DefaultLayout from "../layouts/DefaultLayout/defaultLayout";
import Home from "../pages/Home/home";
import Login from "../pages/Login/login";
import Registered from "../pages/Regitered/registered";
import Topics from "../pages/Topics/topics";
import ProtectedPage from "../components/ProtectedPage/protectedPage";
import Result from "../pages/Result/result";
import Quiz from "../pages/Quiz/quiz";
import History from "../pages/History/history";

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
                        path: "topics",
                        element: <Topics />
                    },
                    {
                        path: "quiz/:topicName",
                        element: <Quiz />
                    },
                    {
                        path: "history",
                        element: <History />
                    },
                    {
                        path: "result/:resultId",
                        element: <Result />
                    },
                ]

            },

        ]
    }
]

export default Routes