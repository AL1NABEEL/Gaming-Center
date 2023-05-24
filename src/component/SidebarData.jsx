import React from 'react'

import { DashboardOutlined, DiscountOutlined, EmojiEventsOutlined, EventSeatOutlined, NotificationsActiveOutlined, SupervisorAccountOutlined} from '@mui/icons-material';
export const SidebarData = [

    {
        icon : <DashboardOutlined/>,
        title : "Dashboard",
        path: "/",
    },
    {
        icon : <SupervisorAccountOutlined/>,
        title : "Employee's",
        path : "/employees",
        
    },
    {
        icon : <EmojiEventsOutlined/>,
        title : "Tournament's",
        path : "/tournaments"
    },
    {
        icon : <EventSeatOutlined/>,
        title : "Seat Reservations",
        path : "/reservations"
    },
    {
        icon : <DiscountOutlined/>,
        title : "Discounts & Prizes",
        path : "/discounts"
    },
    {
        icon : <NotificationsActiveOutlined/>,
        title : "Notification's",
        path : "/notifications"
    },
 
]
