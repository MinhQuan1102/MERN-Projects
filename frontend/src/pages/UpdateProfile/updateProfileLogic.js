import axios from "axios";

export const handleChange = (e, setUserInfo) => {
  setUserInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
};

export const handleChooseImage = (e, setUserInfo) => {
  setUserInfo((prev) => ({ ...prev, avatar: e.target.files[0] }));
};

export const handleUpdateProfile = async (
  e,
  userInfo,
  setCurrentUser,
  token,
  toast
) => {
  e.preventDefault();
  if (userInfo.avatar) {
    const formData = new FormData();
    formData.append("file", userInfo.avatar);
    formData.append("upload_preset", "BazaarBay");
    formData.append("cloud_name", "dvvyj75uf");
    fetch("https://api.cloudinary.com/v1_1/dvvyj75uf/image/upload", {
      method: "post",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        const newAvatar = data.url.toString();
        return fetch(
          `https://e-commerce-production-43d5.up.railway.app/api/customer/account`,
          {
            method: "put",

            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              name: userInfo.name,
              address: userInfo.address,
              phone: userInfo.phone,
              avatar: newAvatar,
            }),
          }
        );
      });
    toast({
      title: "Update info successful",
      status: "success",
      duration: 3000,
      isClosable: true,
      position: "bottom",
    });
    const { data } = await axios.get(
      `https://e-commerce-production-43d5.up.railway.app/api/customer/account`,
      {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setCurrentUser(data.data);
  } else {
    try {
      await axios.put(
        `https://e-commerce-production-43d5.up.railway.app/api/customer/account`,
        {
          name: userInfo.name,
          address: userInfo.address,
          phone: userInfo.phone,
        },

        {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast({
        title: "Update info successful",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
      const { data } = await axios.get(
        `https://e-commerce-production-43d5.up.railway.app/api/customer/account`,
        {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCurrentUser(data.data);
    } catch (error) {
      toast({
        title: "An error occurred while trying to update profile",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
    }
  }
};
