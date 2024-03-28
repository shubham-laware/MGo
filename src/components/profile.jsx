import "../components/Profile.css";

import { useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";

const Profile = () => {
  const [section, setSection] = useState("profile");
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const emailRef = useRef(null);
  const addressRef = useRef(null);
  const oldPasswordRef = useRef(null);
  const newPasswordRef = useRef(null);
  const [profilePic, setProfilePic] = useState(null);

  const [showPasswordFields, setShowPasswordFields] = useState(false);

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
  });

  useEffect(() => {
    if (acceptedFiles.length > 0) {
      setProfilePic(URL.createObjectURL(acceptedFiles[0]));
    }
  }, [acceptedFiles]);

  function handleSave() {
    // console.log(`Last Name: ${lastNameRef.current.value}`);
    // console.log(`Email: ${emailRef.current.value}`);
    // console.log(`Address: ${addressRef.current.value}`);
    // console.log(`Old Password: ${oldPasswordRef.current.value}`);
    // console.log(`New Password: ${newPasswordRef.current.value}`);

    // console.log(`Profile Pic: ${profilePic}`);
  }

  return (
    <>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <div className="custom-container" >
      <div className="custom-sidebar">
        <div
          className={`custom-sidebar-item fs-6 bg-light ${section === "profile" && "active"}`}
          onClick={() => setSection("profile")}
          data-section="profile"
        >
          Profile Settings
        </div>
        <div
          className={`custom-sidebar-item fs-6 bg-light ${
            section === "notifications" && "active"
          }`}
          onClick={() => setSection("notifications")}
          data-section="notifications"
        >
          Notifications & Alerts
        </div>
        <div
          className={`custom-sidebar-item fs-6 bg-light ${section === "2fa" && "active"}`}
          onClick={() => setSection("2fa")}
          data-section="2fa"
        >
          Two-Factor Authentication
        </div>
        <div
          className={`custom-sidebar-item fs-6 bg-light ${section === "orders" && "active"}`}
          onClick={() => setSection("orders")}
          data-section="orders"
        >
          Your Orders
        </div>
      </div>

      {section === "profile" && (
        <div className="custom-content">
          <div className="custom-header">
            <h1>Profile Settings</h1>
            <button className="custom-save-button bg-dark" onClick={handleSave}>
              Update
            </button>
          </div>
          <div className="custom-profile-body">
            <div className="custom-profile-picture">
              {acceptedFiles?.length === 1 ? (
                <img
                  src={
                    acceptedFiles?.length === 1
                      ? URL.createObjectURL(acceptedFiles[0])
                      : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNecYl9YXMoBpmcLr0YVeuWdowILghYUzJ0Tu4qaY9aTA3XcrZ4hKrYSTiH-E7CftMRrY&usqp=CAU"
                  }
                  alt={acceptedFiles[0].path}
                  className="border rounded-3 p-2 md:w-[230px] w-[150px]"
                />
              ) : (
                <img
                  src={
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNecYl9YXMoBpmcLr0YVeuWdowILghYUzJ0Tu4qaY9aTA3XcrZ4hKrYSTiH-E7CftMRrY&usqp=CAU"
                  }
                  alt="Profile pic not found"
                  className="border rounded-3 p-2 md:w-[230px] w-[150px]"
                />
              )}
              <div {...getRootProps({ className: "dropzone" })}>
                <input {...getInputProps()} />
                <p className="custom-change-picture">Change Profile Picture</p>
              </div>
            </div>
            <div className="custom-profile-details">
              <label htmlFor="first-name">First Name</label>
              <input
                type="text"
                id="first-name"
                placeholder="Enter your first name"
              />
              <label htmlFor="last-name">Last Name</label>
              <input
                type="text"
                id="last-name"
                placeholder="Enter your last name"
              />
              <label htmlFor="email">Email</label>
              <input type="email" id="email" placeholder="name@example.com" />
              <label htmlFor="address">Address</label>
              <input
                type="text"
                id="address"
                placeholder="Enter your address"
              />
                <label htmlFor="address">Office Address</label>
              <input
                type="text"
                id="address"
                placeholder="Office address"
              />
              <button
                className="custom-update-password bg-dark"
                onClick={() => setShowPasswordFields(!showPasswordFields)}
              >
                Reset Password
              </button>
              {showPasswordFields && (
                <div className="custom-password-fields">
                  <label htmlFor="old-password">Old Password</label>
                  <input
                    type="password"
                    id="old-password"
                    placeholder="Enter your old password"
                  />
                  <label htmlFor="new-password">New Password</label>
                  <input
                    type="password"
                    id="new-password"
                    placeholder="Enter your new password"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {section === "notifications" && (
        <div className="custom-content">
          <div className="custom-header">
            <h1>Notifications Section</h1>
          </div>
        </div>
      )}
      {section === "2fa" && (
        <div className="custom-content">
          <div className="custom-header">
            <h1>Two-Factor Authentication Section</h1>
          </div>
        </div>
      )}
      {section === "orders" && (
        <div className="custom-content">
          <div className="custom-header">
            <h1>Your Orders Section</h1>
          </div>
        </div>
      )}
    </div>
    </>
  );
};

export default Profile;
