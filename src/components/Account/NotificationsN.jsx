
// temporary lang to paki delete pag may backend na 
export const temporaryNotifications = [
    {
        id: 'temp-1',
        title: 'Galilee Wonderland Resort',
        message: 'How was your stay? Leave a review to share your experience.',
        createdAt: '2026-10-21T09:00:00',
        isRead: false,
        actionLabel: 'Review Galilee Wonderland Resort now',
    },
    {
        id: 'temp-2',
        title: 'Galilee Wonderland Resort',
        message: 'Your trip to our resort is coming up in 2 days. See you there!',
        createdAt: '2026-10-18T09:00:00',
        isRead: false,
    },
    {
        id: 'temp-3',
        title: 'Galilee Wonderland Resort',
        message: 'Your payment of ₱2,740 for your 2Rismo reservation was successful.',
        createdAt: '2026-10-16T09:00:00',
        isRead: true,
    },
]


const formatDate = (value) => {
    const date = new Date(value)
    if (Number.isNaN(date.getTime())) return 'Date unavailable'

    return new Intl.DateTimeFormat('en', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    }).format(date)
}

const formatTimeAgo = (value) => {
    const date = new Date(value)
    if (Number.isNaN(date.getTime())) return ''

    const minutes = Math.floor((Date.now() - date.getTime()) / 60000)
    if (minutes < 1) return 'Just now'
    if (minutes < 60) return `${minutes} minute${minutes === 1 ? '' : 's'} ago`

    const hours = Math.floor(minutes / 60)
    if (hours < 24) return `${hours} hour${hours === 1 ? '' : 's'} ago`

    const days = Math.floor(hours / 24)
    return `${days} day${days === 1 ? '' : 's'} ago`
}

export const NotificationsN = ({ notifications = temporaryNotifications, loading = false, error = '', onOpenNotification }) => {
    const groups = notifications.reduce((result, notification) => {
        const label = formatDate(notification.createdAt)
        result[label] ??= []
        result[label].push(notification)
        return result
    }, {})

    return (
        <section className="notifications-panelN container-fluid p-3 p-md-4 p-lg-5 text-white">
            <h1 className="h2 fw-bold notifications-titleN mb-4">Notifications</h1>

            {loading && <p className="text-secondary" role="status">Loading notifications…</p>}
            {!loading && error && <div className="alert alert-danger" role="alert">{error}</div>}
            {!loading && !error && notifications.length === 0 && <p className="text-secondary">You don’t have any notifications yet.</p>}

            {!loading && !error && Object.entries(groups).map(([date, dateNotifications]) => (
                <section key={date} className="mb-3" aria-label={date}>
                    <h2 className="small text-secondary mb-2">{date}</h2>
                    <div className="d-flex flex-column gap-3">
                        {dateNotifications.map((notification) => (
                            <button key={notification.id} type="button" className={`notification-cardN btn text-start w-100 d-flex align-items-start justify-content-between gap-3 p-3 rounded-3 ${notification.isRead ? '' : 'unread'}`} onClick={() => onOpenNotification?.(notification)}>
                                <span className="min-w-0">
                                    <span className="d-block fw-semibold">{notification.title}</span>
                                    <span className="d-block small">{notification.message}</span>
                                    {notification.actionLabel && <span className="d-block small notification-actionN mt-2">{notification.actionLabel}</span>}
                                </span>
                                <span className="d-flex flex-column align-items-end flex-shrink-0">
                                    {!notification.isRead && <span className="notification-unread-dotN rounded-circle mb-2" aria-label="Unread" />}
                                    <span className="notification-timeN">{formatTimeAgo(notification.createdAt)}</span>
                                </span>
                            </button>
                        ))}
                    </div>
                </section>
            ))}
        </section>
    )
}