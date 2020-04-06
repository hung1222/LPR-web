

const dashboardRoutes  = {
    path: "/",
    name: "DashboardLayout",
    header: "Main",
    children: [
        {
            path: "/",
            name: "Trang chủ",
            component: Home
        },
        {
            path: "/home",
            name: "Trang chủ",
            component: Home
        },
        {
            path: "/logout",
            name: "Logout",
            component: Logout
        }
    ]
};