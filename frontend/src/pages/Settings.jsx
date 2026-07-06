import { useEffect, useState } from "react";
import AppLayout from "../components/AppLayout";
import "../styles/Settings.css";

const DEFAULT_SETTINGS = {
  currency: "INR",
  defaultTransactionType: "Expense",
  compactMode: false,
  transactionAlerts: true,
  monthlySummary: true,
};

function Settings() {
  const [user] = useState(() => {
    try {
      const savedUser = localStorage.getItem("user");

      return savedUser
        ? JSON.parse(savedUser)
        : null;
    } catch (error) {
      console.error(
        "Failed to read user data:",
        error
      );

      return null;
    }
  });

  const [settings, setSettings] = useState(() => {
    try {
      const savedSettings =
        localStorage.getItem("finSightSettings");

      return savedSettings
        ? {
            ...DEFAULT_SETTINGS,
            ...JSON.parse(savedSettings),
          }
        : DEFAULT_SETTINGS;
    } catch (error) {
      console.error(
        "Failed to read settings:",
        error
      );

      return DEFAULT_SETTINGS;
    }
  });

  const [savedMessage, setSavedMessage] =
    useState("");

  useEffect(() => {
    if (!savedMessage) {
      return;
    }

    const timer = setTimeout(() => {
      setSavedMessage("");
    }, 2500);

    return () => clearTimeout(timer);
  }, [savedMessage]);

  function handleSelectChange(event) {
    const { name, value } = event.target;

    setSettings((previousSettings) => ({
      ...previousSettings,
      [name]: value,
    }));
  }

  function handleToggle(event) {
    const { name, checked } = event.target;

    setSettings((previousSettings) => ({
      ...previousSettings,
      [name]: checked,
    }));
  }

  function handleSave() {
    localStorage.setItem(
      "finSightSettings",
      JSON.stringify(settings)
    );

    setSavedMessage(
      "Settings saved successfully"
    );
  }

  function handleReset() {
    setSettings(DEFAULT_SETTINGS);

    localStorage.setItem(
      "finSightSettings",
      JSON.stringify(DEFAULT_SETTINGS)
    );

    setSavedMessage(
      "Settings reset to default"
    );
  }

  const userInitial =
    user?.name
      ?.charAt(0)
      .toUpperCase() || "U";

  return (
    <AppLayout title="Settings">
      <div
        className={`settings-page ${
          settings.compactMode
            ? "settings-compact"
            : ""
        }`}
      >

        <div className="settings-profile-card">

          <div className="settings-avatar">
            {userInitial}
          </div>

          <div className="settings-profile-info">
            <h2>
              {user?.name || "FinSight User"}
            </h2>

            <p>
              {user?.email ||
                "No email available"}
            </p>
          </div>

          <span className="settings-account-badge">
            Active Account
          </span>

        </div>

        <div className="settings-grid">

          <section className="settings-card">

            <div className="settings-card-header">
              <div>
                <h3>General Preferences</h3>

                <p>
                  Customize your FinSight experience
                </p>
              </div>
            </div>

            <div className="settings-form-list">

              <div className="settings-field">
                <div>
                  <label htmlFor="currency">
                    Currency
                  </label>

                  <p>
                    Choose your preferred display currency
                  </p>
                </div>

                <select
                  id="currency"
                  name="currency"
                  value={settings.currency}
                  onChange={handleSelectChange}
                >
                  <option value="INR">
                    INR - Indian Rupee
                  </option>

                  <option value="USD">
                    USD - US Dollar
                  </option>

                  <option value="EUR">
                    EUR - Euro
                  </option>

                  <option value="GBP">
                    GBP - British Pound
                  </option>
                </select>
              </div>

              <div className="settings-field">
                <div>
                  <label
                    htmlFor="defaultTransactionType"
                  >
                    Default Transaction Type
                  </label>

                  <p>
                    Preselect a type when adding transactions
                  </p>
                </div>

                <select
                  id="defaultTransactionType"
                  name="defaultTransactionType"
                  value={
                    settings.defaultTransactionType
                  }
                  onChange={handleSelectChange}
                >
                  <option value="Expense">
                    Expense
                  </option>

                  <option value="Income">
                    Income
                  </option>
                </select>
              </div>

            </div>

          </section>

          <section className="settings-card">

            <div className="settings-card-header">
              <div>
                <h3>Display Preferences</h3>

                <p>
                  Control how information appears
                </p>
              </div>
            </div>

            <div className="settings-toggle-list">

              <label className="settings-toggle-row">

                <div>
                  <strong>Compact Mode</strong>

                  <span>
                    Reduce spacing inside the settings page
                  </span>
                </div>

                <input
                  type="checkbox"
                  name="compactMode"
                  checked={settings.compactMode}
                  onChange={handleToggle}
                />

                <span className="toggle-slider" />

              </label>

            </div>

          </section>

          <section className="settings-card">

            <div className="settings-card-header">
              <div>
                <h3>Notifications</h3>

                <p>
                  Manage local FinSight preferences
                </p>
              </div>
            </div>

            <div className="settings-toggle-list">

              <label className="settings-toggle-row">

                <div>
                  <strong>
                    Transaction Alerts
                  </strong>

                  <span>
                    Keep transaction alert preference enabled
                  </span>
                </div>

                <input
                  type="checkbox"
                  name="transactionAlerts"
                  checked={
                    settings.transactionAlerts
                  }
                  onChange={handleToggle}
                />

                <span className="toggle-slider" />

              </label>

              <label className="settings-toggle-row">

                <div>
                  <strong>
                    Monthly Summary
                  </strong>

                  <span>
                    Keep monthly summary preference enabled
                  </span>
                </div>

                <input
                  type="checkbox"
                  name="monthlySummary"
                  checked={settings.monthlySummary}
                  onChange={handleToggle}
                />

                <span className="toggle-slider" />

              </label>

            </div>

          </section>

          <section className="settings-card">

            <div className="settings-card-header">
              <div>
                <h3>Account Information</h3>

                <p>
                  Current authenticated account
                </p>
              </div>
            </div>

            <div className="settings-account-list">

              <div className="settings-account-row">
                <span>Full Name</span>

                <strong>
                  {user?.name || "Not Available"}
                </strong>
              </div>

              <div className="settings-account-row">
                <span>Email Address</span>

                <strong>
                  {user?.email || "Not Available"}
                </strong>
              </div>

              <div className="settings-account-row">
                <span>Account Status</span>

                <strong className="settings-active-text">
                  Active
                </strong>
              </div>

            </div>

          </section>

        </div>

        <div className="settings-actions">

          <div className="settings-message">
            {savedMessage}
          </div>

          <div className="settings-buttons">

            <button
              type="button"
              className="settings-reset-btn"
              onClick={handleReset}
            >
              Reset Defaults
            </button>

            <button
              type="button"
              className="settings-save-btn"
              onClick={handleSave}
            >
              Save Settings
            </button>

          </div>

        </div>

      </div>
    </AppLayout>
  );
}

export default Settings;