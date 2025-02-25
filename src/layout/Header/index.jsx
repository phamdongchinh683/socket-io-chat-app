import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { socket } from "../../commons/configSocket";
import Notification from "../../components/Notification";
import useToken from "../../jwt";
import routeLink from "../../mocks/test.json";

const Header = () => {
  const { getToken } = useToken();
  const [notifications, setNotifications] = useState(0);

  useEffect(() => {
    if (getToken) {
      socket.emit("messageNotification");
    }
    socket.on("onNotification", (data) => {
      if (data.status === 'success') {
        toast.success(data.data);
        setNotifications((prev) => prev + 1);
      }
    });
    return () => {
      socket.off("onNotification");
    };
  }, []);

  return (
    <header className="header">
      <div className="nav-links">
        {routeLink.map((router) => (
          <Link key={router.link} to={router.link}>
            {router.pageName}
          </Link>
        ))}
      </div>
      <div className="notification-container">
        <span className="notification-icon">🔔</span>
        {notifications > 0 && <span className="notification-count">{notifications}</span>}
      </div>
      <Notification />
    </header>
  );
};

export default Header;
