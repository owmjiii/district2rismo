const hostNotifications = [
    {
        id: 'host-notification-1',
        name: 'Ron Roberto',
        message: 'Ron requested tickets for your resort for Oct 27. Review the ticket request and confirm availability.',
        action: 'View Request',
        createdAt: '2026-10-21T09:00:00',
    },
    {
        id: 'host-notification-2',
        name: 'Gian Manalaysay',
        message: 'Your host has left you a review. Leave yours to complete the review process.',
        createdAt: '2026-10-21T08:00:00',
    },
    {
        id: 'host-notification-3',
        name: 'Neil Ryan',
        message: 'You have received a payment of ₱1,000 from Neil Ryan for 4 resort tickets on Oct 27.',
        action: 'View Payment Details',
        createdAt: '2026-10-18T09:00:00',
    },
]

const formatDate = (value) => new Intl.DateTimeFormat('en', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
}).format(new Date(value))

const formatTimeAgo = (value) => {
    const days = Math.floor((Date.now() - new Date(value).getTime()) / 86400000)
    if (days < 1) return 'Today'
    return `${days} day${days === 1 ? '' : 's'} ago`
}

export const HostNotificationN = () => {
    const groups = hostNotifications.reduce((result, notification) => {
        const date = formatDate(notification.createdAt)
        result[date] ??= []
        result[date].push(notification)
        return result
    }, {})

    return (
        <section className="notifications-panelN container-fluid p-3 p-md-4 p-lg-4 text-white">
            <h1 className="h2 fw-bold notifications-titleN mb-3">Notifications</h1>

            {Object.entries(groups).map(([date, notifications]) => (
                <section key={date} className="mb-3" aria-label={date}>
                    <h2 className="small text-secondary mb-1">{date}</h2>

                    <div className="d-flex flex-column gap-2">
                        {notifications.map((notification) => (
                            <article key={notification.id} className="notification-cardN d-flex align-items-start justify-content-between gap-3 p-3 rounded-3">
                                <div className="min-w-0">
                                    <h3 className="small fw-semibold mb-1">{notification.name}</h3>
                                    <p className="small mb-1">{notification.message}</p>
                                    {notification.action && (
                                        <button type="button" className="btn btn-link notification-actionN p-0 small">
                                            {notification.action}
                                        </button>
                                    )}
                                </div>

                                <div className="d-flex flex-column align-items-end flex-shrink-0">
                                    <span className="notification-unread-dotN rounded-circle mb-2" aria-label="Unread" />
                                    <span className="notification-timeN">{formatTimeAgo(notification.createdAt)}</span>
                                </div>
                            </article>
                        ))}
                    </div>
                </section>
            ))}
        </section>
    )
}