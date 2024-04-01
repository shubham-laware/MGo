import "../components/Profile.css";

import { useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";

const Profile = () => {
  const [section, setSection] = useState("profile");
  const fullNameRef = useRef(null);
  // const lastNameRef = useRef(null);
  const emailRef = useRef(null);
  const addressRef = useRef(null);
  const officeAddressRef = useRef(null);
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

  

  ///pooja - FEtch API start
  const [userData, setuserData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://minitgo.com/api/fetch_login.php');
        const result = await response.json();
        setuserData(result);
        console.log(" profile page data", data)
        console.log("Full Name", data?.[0]?.full_name);
        console.log(firstNameRef);
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
  }, []);


  //Pooja - for update the data
    // Function to handle the API request
    const updateProfile = async () => {
      try {
        const response = await fetch("https://minitgo.com/api/update_user.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData[0]), // Assuming data contains the updated profile information
        });
        const result = await response.json();
        // Handle the response as needed
        console.log("Profile updated successfully:", result);
      } catch (error) {
        setError(error);
        console.error("Error updating profile:", error);
      }
    };


    function handleUpdateProfile() {
      updateProfile(); // Call the updateProfile function to make the API request
      console.log("user updated data", userData);
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
            className={`custom-sidebar-item fs-6 bg-light ${section === "notifications" && "active"
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
              <button className="custom-save-button bg-dark" onClick={handleUpdateProfile}>
                Update
              </button>
            </div>
            <div className="custom-profile-body">
              {/*Pooja - need to remove pic */}
              {/* <div className="custom-profile-picture">
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
              </div> */}

              <div className="custom-profile-details mt-2">
                <div className="row">
                  <div className="col-md-2"></div>
                  <div className="col-md-8">

                    <label htmlFor="full_name" className="mt-2">Full Name</label>
                    <input
                      type="text"
                      id="full_name"
                      className="mt-1"
                      placeholder="Enter your full name"
                      value={userData && userData[0] && userData[0].full_name ? userData[0].full_name : ""}
                      ref={fullNameRef}
                      onChange={(e) => {
                        const newValue = e.target.value;
                        setuserData((prevState) => {
                          const newData = prevState ? [...prevState] : [];
                          if (newData.length > 0) {
                            newData[0].full_name = newValue;
                          }
                          return newData;
                        });
                      }}
                    />


                    <label htmlFor="email mt-1" className="mt-2">Email</label>
                    <input
                      type="email"
                      id='email'
                      className="mt-1"
                      value={userData && userData[0] && userData[0].email ? userData[0].email : ""}
                      ref={emailRef}
                      onChange={(e) => {
                        const newValue = e.target.value;
                        setuserData((prevState) => {
                          const newData = prevState ? [...prevState] : [];
                          if (newData.length > 0) {
                            newData[0].email = newValue;
                          }
                          return newData;
                        });
                        
                      }}

                    />
                    <label htmlFor="address" className="mt-2">Address</label>
                    <input
                      type="text"
                      id="address"
                      className="mt-1"
                      placeholder="Enter your address"
                      value={userData && userData[0] && userData[0].Address ? userData[0].Address : ""}
                      ref={addressRef}
                      onChange={(e) => {
                        const newValue = e.target.value;
                        setuserData((prevState) => {
                          const newData = prevState ? [...prevState] : [];
                          if (newData.length > 0) {
                            newData[0].Address = newValue;
                          }
                          return newData;
                        });
                      }}
                    />
                    <label htmlFor="address" className="mt-2">Office Address</label>
                    <input
                      type="text"
                      id="address"
                      className="mt-1"
                      placeholder="Office address"
                      value={userData && userData[0] && userData[0].office_address ? userData[0].office_address : ""}
                      ref={officeAddressRef}
                      onChange={(e) => {
                        const newValue = e.target.value;
                        setuserData((prevState) => {
                          const newData = prevState ? [...prevState] : [];
                          if (newData.length > 0) {
                            newData[0].office_address = newValue;
                          }
                          return newData;
                        });
                      }}
                    />
                   <div className="text-center">
                   <button
                      className="custom-update-password bg-dark"
                      onClick={() => setShowPasswordFields(!showPasswordFields)}
                    >
                      Reset Password
                    </button>
                   </div>
                    {/* Pooja -  replace with email and button */}
                    {showPasswordFields && (
                      <div className="custom-password-fields">
                        <label htmlFor="email">Email</label>
                        <input
                          type="email"
                          id="email"
                          placeholder="Enter your email"
                        />
                        <button
                          className="custom-update-password bg-dark"

                        >
                          Send link
                        </button>

                      </div>
                    )}
                  </div>
                </div>
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
