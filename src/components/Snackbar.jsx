import { useNotification } from '../context/NotificationContext'

export const Snackbar = () => {
    const { notification, setNotification } = useNotification()

    if (!notification) return null

    return (
        <div className="position-fixed bottom-0 end-0 p-3" style={{ zIndex: 1080 }}>
            <div className={`alert alert-${notification.type === 'success' ? 'success' : 'danger'} alert-dismissible fade show shadow-lg rounded-4 mb-0`} role="alert">
                <span className="fw-medium">{notification.message}</span>
                <button 
                    type="button" 
                    className="btn-close" 
                    aria-label="Close" 
                    onClick={() => setNotification(null)}
                />
            </div>
        </div>
    )
}