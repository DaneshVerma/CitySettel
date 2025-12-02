import { ChevronLeft, Bell } from "lucide-react";
import { useState, useEffect } from "react";

const mockNotifications = [
  {
    id: 1,
    type: "booking",
    title: "Booking Confirmed",
    message: "Your booking for Student Starter Pack has been confirmed",
    time: "2 hours ago",
    read: false,
  },
  {
    id: 2,
    type: "offer",
    title: "New Combo Available",
    message: "Check out our new Professional Essentials combo with 20% off!",
    time: "5 hours ago",
    read: false,
  },
  {
    id: 3,
    type: "reminder",
    title: "Payment Due",
    message: "Your monthly payment is due in 3 days",
    time: "1 day ago",
    read: true,
  },
  {
    id: 4,
    type: "update",
    title: "Profile Updated",
    message: "Your profile information has been successfully updated",
    time: "2 days ago",
    read: true,
  },
  {
    id: 5,
    type: "message",
    title: "New Message",
    message: "You have a new message from Green Valley PG owner",
    time: "3 days ago",
    read: true,
  },
];

export function NotificationsScreen({ onBack }) {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [filter, setFilter] = useState("all");

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleMarkAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const filteredNotifications =
    filter === "unread" ? notifications.filter((n) => !n.read) : notifications;

  const getNotificationIcon = (type) => {
    const colors = {
      booking: "bg-[#2563EB]",
      offer: "bg-[#16A34A]",
      reminder: "bg-[#F59E0B]",
      update: "bg-[#8B5CF6]",
      message: "bg-[#EC4899]",
    };
    return colors[type] || "bg-[#6B7280]";
  };

  return (
    <div className='min-h-screen bg-[#F9FAFB] pb-20'>
      {/* Header */}
      <div className='bg-white px-6 pt-6 pb-4 shadow-sm sticky top-0 z-10'>
        <div className='flex items-center gap-4 mb-4'>
          <button
            onClick={onBack}
            className='w-10 h-10 rounded-full bg-[#F3F4F6] flex items-center justify-center hover:bg-[#E5E7EB]'
          >
            <ChevronLeft className='w-6 h-6 text-[#111827]' />
          </button>
          <div className='flex-1'>
            <h1 className='text-2xl text-[#111827]'>Notifications</h1>
            {unreadCount > 0 && (
              <p className='text-sm text-[#6B7280]'>
                {unreadCount} unread notification{unreadCount > 1 ? "s" : ""}
              </p>
            )}
          </div>
          {unreadCount > 0 && (
            <button
              onClick={handleMarkAllAsRead}
              className='text-sm text-[#2563EB] hover:text-[#1E40AF]'
            >
              Mark all read
            </button>
          )}
        </div>

        {/* Filter */}
        <div className='flex gap-2'>
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-full text-sm transition-colors ${
              filter === "all"
                ? "bg-[#2563EB] text-white"
                : "bg-[#F3F4F6] text-[#6B7280] hover:bg-[#E5E7EB]"
            }`}
          >
            All ({notifications.length})
          </button>
          <button
            onClick={() => setFilter("unread")}
            className={`px-4 py-2 rounded-full text-sm transition-colors ${
              filter === "unread"
                ? "bg-[#2563EB] text-white"
                : "bg-[#F3F4F6] text-[#6B7280] hover:bg-[#E5E7EB]"
            }`}
          >
            Unread ({unreadCount})
          </button>
        </div>
      </div>

      {/* Notifications List */}
      <div className='px-6 mt-6'>
        {filteredNotifications.length === 0 ? (
          <div className='bg-white rounded-xl p-8 text-center shadow-sm'>
            <div className='w-16 h-16 bg-[#F3F4F6] rounded-full flex items-center justify-center mx-auto mb-4'>
              <Bell className='w-8 h-8 text-[#6B7280]' />
            </div>
            <h3 className='text-lg text-[#111827] mb-2'>No notifications</h3>
            <p className='text-[#6B7280]'>
              You're all caught up! Check back later for updates.
            </p>
          </div>
        ) : (
          <div className='space-y-3'>
            {filteredNotifications.map((notification) => (
              <button
                key={notification.id}
                onClick={() => handleMarkAsRead(notification.id)}
                className={`w-full bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow text-left ${
                  !notification.read ? "border-l-4 border-[#2563EB]" : ""
                }`}
              >
                <div className='flex gap-3'>
                  <div
                    className={`w-10 h-10 ${getNotificationIcon(
                      notification.type
                    )} rounded-full flex items-center justify-center flex-shrink-0`}
                  >
                    <Bell className='w-5 h-5 text-white' />
                  </div>
                  <div className='flex-1 min-w-0'>
                    <div className='flex items-start justify-between mb-1'>
                      <h3
                        className={`${
                          !notification.read
                            ? "text-[#111827] font-semibold"
                            : "text-[#111827]"
                        }`}
                      >
                        {notification.title}
                      </h3>
                      {!notification.read && (
                        <span className='w-2 h-2 bg-[#2563EB] rounded-full flex-shrink-0 mt-2'></span>
                      )}
                    </div>
                    <p className='text-sm text-[#6B7280] mb-2'>
                      {notification.message}
                    </p>
                    <p className='text-xs text-[#9CA3AF]'>
                      {notification.time}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
