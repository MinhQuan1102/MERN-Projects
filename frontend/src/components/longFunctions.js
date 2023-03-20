import axios from "axios";

export const handleRegister = async (e, credentials, role, config, toast, history) => {
  e.preventDefault();
  if (
    !credentials.name ||
    !credentials.email ||
    !credentials.password ||
    !credentials.confirmPassword
  ) {
    return toast({
      title: "Please enter all the fields!",
      status: "error",
      duration: 3000,
      isClosable: true,
      position: "bottom",
    });
  }
  if (credentials.password !== credentials.confirmPassword) {
    return toast({
      title: "Passwords do not match!",
      status: "error",
      duration: 3000,
      isClosable: true,
      position: "bottom",
    });
  }
  try {
    await axios.post(
      "https://e-commerce-production-43d5.up.railway.app/api/auth/register",
      {
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
        role: role,
      },
      config
    );
    history.push("/login")
  } catch (error) {
    return toast({
      title: "An error occured while trying to register",
      status: "error",
      duration: 3000,
      isClosable: true,
      position: "bottom",
    });
  }
};
