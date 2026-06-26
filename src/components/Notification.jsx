import { useState, useEffect, createContext, useContext } from 'react';

const NotificationCtx = createContext(null);

export function useNotify() {
  return useContext(NotificationCtx);
}

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([]);

  const notify = (message, type = 'success') => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, message, type }]);
    setTimeout(() => setNotifications(prev => prev.filter(n => n.id !== id)), 3000);
  };

  return (
    <NotificationCtx.Provider value={notify}>
      {children}
      <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
        {notifications.map(n => (
          <div
            key={n.id}
            className={`px-4 py-3 rounded-lg shadow-lg text-sm font-medium transition-all ${
              n.type === 'success' ? 'bg-green-600 text-white' :
              n.type === 'error' ? 'bg-red-600 text-white' :
              n.type === 'warning' ? 'bg-yellow-500 text-white' :
              'bg-blue-600 text-white'
            }`}
          >
            {n.message}
          </div>
        ))}
      </div>
    </NotificationCtx.Provider>
  );
}

export default NotificationProvider;