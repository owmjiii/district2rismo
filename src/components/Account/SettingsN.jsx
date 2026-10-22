import { useState } from 'react'

export const SettingsN = ({ onChangePassword }) => {
    const [darkMode, setDarkMode] = useState(true)

    return (
        <section className="profile-panelN container-fluid p-3 p-md-4 p-lg-5 text-white">
            <h1 className="h2 fw-bold settings-titleN mb-3">Settings</h1>

            <div className="mb-4">
                <h2 className="small settings-section-labelN mb-2">Security</h2>
                <button type="button" className="btn btn-warning rounded-pill text-nowrap settings-password-btnN" onClick={onChangePassword}>
                    Change Password
                </button>
            </div>

            <div>
                <h2 className="small settings-section-labelN mb-2">General</h2>
                <div className="d-flex align-items-center gap-5">
                    <label className="small mb-0" htmlFor="account-settings-dark-mode">Dark Mode</label>
                    <div className="form-check form-switch mb-0">
                        <input id="account-settings-dark-mode" className="form-check-input settings-switchN" type="checkbox" role="switch" checked={darkMode} onChange={(event) => setDarkMode(event.target.checked)} />
                    </div>
                </div>
            </div>
        </section>
    )
}